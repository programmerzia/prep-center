<?php

/**
 * Copy to config.php on the host (same folder as index.html).
 * Get free keys: https://aistudio.google.com/apikey
 *
 * Use gemini_keys for rotation — when one account hits the free limit,
 * chat.php tries the next key automatically.
 */
return [
    // Single key (still works):
    // 'gemini_key' => 'AIza...',

    // Multiple keys — one per Google account (recommended):
    'gemini_keys' => [
        'AIza...account-one',
        'AIza...account-two',
        'AIza...account-three',
    ],

    'gemini_models' => [
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite',
        'gemini-2.5-flash-lite',
        'gemini-2.5-flash',
    ],
    'groq_key' => '',
    'groq_model' => 'llama-3.3-70b-versatile',
];
