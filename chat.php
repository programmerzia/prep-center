<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['ok' => true]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'POST only']);
    exit;
}

$configPath = is_file(__DIR__ . '/config.php') ? __DIR__ . '/config.php' : '';
$config = $configPath !== '' ? require $configPath : [];
if (!is_array($config)) {
    $config = [];
}

$geminiKeys = collectGeminiKeys($config);
$groqKey = trim((string) ($config['groq_key'] ?? ''));
$models = $config['gemini_models'] ?? [
    'gemini-3.5-flash-lite',
    'gemini-3.1-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
];
$groqModel = (string) ($config['groq_model'] ?? 'llama-3.3-70b-versatile');

if ($geminiKeys === [] && $groqKey === '') {
    http_response_code(503);
    echo json_encode(['error' => 'Server has no API key. Copy config.example.php to config.php and add Gemini key(s).']);
    exit;
}

$raw = file_get_contents('php://input') ?: '';
if (strlen($raw) > 120000) {
    http_response_code(413);
    echo json_encode(['error' => 'Payload too large']);
    exit;
}

$body = json_decode($raw, true);
if (!is_array($body) || !isset($body['system'], $body['messages']) || !is_array($body['messages'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Expected system and messages']);
    exit;
}

$system = trim((string) $body['system']);
$messages = array_slice($body['messages'], -24);
if ($system === '' || $messages === []) {
    http_response_code(400);
    echo json_encode(['error' => 'Empty conversation']);
    exit;
}

foreach ($messages as $i => $msg) {
    $role = $msg['role'] ?? '';
    $content = trim((string) ($msg['content'] ?? ''));
    if (!in_array($role, ['user', 'assistant'], true) || $content === '' || strlen($content) > 8000) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid message']);
        exit;
    }
    $messages[$i] = ['role' => $role, 'content' => $content];
}

if ($geminiKeys !== []) {
    $startIdx = readKeyIndex(count($geminiKeys));
    $gemini = askGeminiRotating($geminiKeys, $startIdx, $models, $system, $messages);
    if ($gemini['text'] !== '') {
        writeKeyIndex($gemini['index']);
        $out = ['text' => $gemini['text'], 'provider' => 'gemini'];
        if ($gemini['rotated']) {
            $out['rotated'] = true;
        }
        echo json_encode($out);
        exit;
    }
    if ($groqKey === '') {
        http_response_code($gemini['status'] >= 400 ? $gemini['status'] : 502);
        echo json_encode(['error' => $gemini['error']]);
        exit;
    }
}

$groq = askGroq($groqKey, $groqModel, $system, $messages);
if ($groq['text'] !== '') {
    echo json_encode(['text' => $groq['text'], 'provider' => 'groq']);
    exit;
}

http_response_code($groq['status'] >= 400 ? $groq['status'] : 502);
echo json_encode(['error' => $groq['error']]);

function collectGeminiKeys(array $config): array
{
    $keys = [];
    if (!empty($config['gemini_keys']) && is_array($config['gemini_keys'])) {
        foreach ($config['gemini_keys'] as $k) {
            $k = trim((string) $k);
            if ($k !== '' && !in_array($k, $keys, true)) {
                $keys[] = $k;
            }
        }
    }
    $single = trim((string) ($config['gemini_key'] ?? ''));
    if ($single !== '' && !in_array($single, $keys, true)) {
        $keys[] = $single;
    }

    return $keys;
}

function keyIndexPath(): string
{
    return __DIR__ . '/.gemini-key-idx';
}

function readKeyIndex(int $count): int
{
    if ($count <= 0) {
        return 0;
    }
    $path = keyIndexPath();
    if (!is_file($path)) {
        return 0;
    }
    $idx = (int) trim((string) file_get_contents($path));

    return (($idx % $count) + $count) % $count;
}

function writeKeyIndex(int $index): void
{
    @file_put_contents(keyIndexPath(), (string) $index);
}

function askGeminiRotating(array $keys, int $startIdx, array $models, string $system, array $messages): array
{
    $n = count($keys);
    $last = ['text' => '', 'error' => 'All Gemini keys exhausted.', 'status' => 429, 'index' => $startIdx, 'rotated' => false];
    $triedRotate = false;

    for ($i = 0; $i < $n; $i++) {
        $idx = ($startIdx + $i) % $n;
        $result = askGemini($keys[$idx], $models, $system, $messages);
        if ($result['text'] !== '') {
            return ['text' => $result['text'], 'error' => '', 'status' => 200, 'index' => $idx, 'rotated' => $triedRotate];
        }
        if (!empty($result['rotate'])) {
            $triedRotate = true;
            continue;
        }
        $last = ['text' => '', 'error' => $result['error'], 'status' => $result['status'], 'index' => $idx, 'rotated' => $triedRotate];
        if (!in_array($result['status'], [401, 403], true)) {
            return $last;
        }
    }

    $last['error'] = $triedRotate
        ? 'All Gemini keys hit the free limit. Wait and try again, or add another key.'
        : $last['error'];

    return $last;
}

function askGemini(string $key, array $models, string $system, array $messages): array
{
    $contents = [];
    foreach ($messages as $msg) {
        $contents[] = [
            'role' => $msg['role'] === 'assistant' ? 'model' : 'user',
            'parts' => [['text' => $msg['content']]],
        ];
    }

    $payload = json_encode([
        'system_instruction' => ['parts' => [['text' => $system]]],
        'contents' => $contents,
        'generationConfig' => [
            'maxOutputTokens' => 1024,
            'temperature' => 0.7,
        ],
    ], JSON_UNESCAPED_UNICODE);

    $last = ['text' => '', 'error' => 'Gemini did not respond', 'status' => 502, 'rotate' => false];
    $sawRateLimit = false;

    foreach ($models as $model) {
        $url = 'https://generativelanguage.googleapis.com/v1beta/models/'
            . rawurlencode((string) $model)
            . ':generateContent?key=' . rawurlencode($key);

        $result = httpJson('POST', $url, $payload, ['Content-Type: application/json']);
        $text = geminiText($result['json']);
        if ($text !== '') {
            return ['text' => $text, 'error' => '', 'status' => 200, 'rotate' => false];
        }

        $err = geminiError($result);
        $last = ['text' => '', 'error' => $err, 'status' => $result['status'], 'rotate' => false];
        if ($result['status'] === 429) {
            $sawRateLimit = true;
            continue;
        }
        if (in_array($result['status'], [401, 403], true)) {
            $last['rotate'] = true;
            return $last;
        }
    }

    if ($sawRateLimit) {
        $last['rotate'] = true;
        $last['status'] = 429;
        $last['error'] = 'Free quota hit on this key — trying next key.';
    }

    return $last;
}

function askGroq(string $key, string $model, string $system, array $messages): array
{
    $openAi = [['role' => 'system', 'content' => $system]];
    foreach ($messages as $msg) {
        $openAi[] = $msg;
    }

    $payload = json_encode([
        'model' => $model,
        'max_tokens' => 1024,
        'temperature' => 0.7,
        'messages' => $openAi,
    ], JSON_UNESCAPED_UNICODE);

    $result = httpJson('POST', 'https://api.groq.com/openai/v1/chat/completions', $payload, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $key,
    ]);

    $text = trim((string) ($result['json']['choices'][0]['message']['content'] ?? ''));
    if ($text !== '') {
        return ['text' => $text, 'error' => '', 'status' => 200];
    }

    $err = (string) ($result['json']['error']['message'] ?? '');
    if ($err === '') {
        $err = $result['status'] === 429
            ? 'Free quota hit. Wait a minute and try again.'
            : 'Backup model did not respond.';
    }

    return ['text' => '', 'error' => $err, 'status' => $result['status']];
}

function geminiText(array $json): string
{
    $parts = $json['candidates'][0]['content']['parts'] ?? [];
    $chunks = [];
    foreach ($parts as $part) {
        if (!empty($part['text'])) {
            $chunks[] = $part['text'];
        }
    }

    return trim(implode("\n", $chunks));
}

function geminiError(array $result): string
{
    $msg = (string) ($result['json']['error']['message'] ?? '');
    if ($result['status'] === 429) {
        return 'Free quota hit. Wait a minute or try again later today.';
    }
    if (in_array($result['status'], [401, 403], true)) {
        return 'Gemini key rejected. Check config.php.';
    }
    if ($msg !== '') {
        return $msg;
    }

    return 'Gemini HTTP ' . $result['status'];
}

function httpJson(string $method, string $url, string $body, array $headers): array
{
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_POSTFIELDS => $body,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => 45,
    ]);
    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlErr = curl_error($ch);
    curl_close($ch);

    if ($raw === false) {
        return ['status' => 502, 'json' => ['error' => ['message' => $curlErr ?: 'Upstream request failed']]];
    }

    $json = json_decode($raw, true);
    if (!is_array($json)) {
        $json = [];
    }

    return ['status' => $status > 0 ? $status : 502, 'json' => $json];
}
