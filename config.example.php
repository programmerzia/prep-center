<?php

/**
 * Copy to config.php on the host (same folder as index.html).
 * Get a free key: https://aistudio.google.com/apikey
 *
 * Gemini Flash-Lite free tier is enough for personal mocks
 * (~a few dozen short chats/day). Groq is an optional backup.
 */
return [
    'gemini_key' => '',
    'gemini_models' => [
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite',
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash',
    ],
    'groq_key' => '',
    'groq_model' => 'llama-3.3-70b-versatile',
];
