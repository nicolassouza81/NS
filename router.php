<?php
/**
 * router.php — Servidor de Desenvolvimento Local (PHP Built-in Server)
 * Desativa cache completamente no ambiente local para refletir edições imediatamente.
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$file = __DIR__ . $uri;

// Cabeçalhos para desativar cache no navegador durante o desenvolvimento
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");
header("Expires: 0");

// Raiz ou diretório com index.html
if ($uri === '/' || (is_dir($file) && file_exists($file . '/index.html'))) {
    header("Content-Type: text/html; charset=utf-8");
    readfile(is_dir($file) ? $file . '/index.html' : __DIR__ . '/index.html');
    exit;
}

// URLs sem barra final que correspondem a um diretório com index.html
if (!is_dir($file) && is_dir($file . '/') && file_exists($file . '/index.html')) {
    header("Location: " . $uri . "/", true, 301);
    exit;
}

// Arquivo HTML sem extensão
if (!file_exists($file) && file_exists($file . '.html')) {
    header("Content-Type: text/html; charset=utf-8");
    readfile($file . '.html');
    exit;
}

// Arquivo estático existente
if (file_exists($file) && !is_dir($file)) {
    $mimes = [
        'css'   => 'text/css; charset=utf-8',
        'js'    => 'application/javascript; charset=utf-8',
        'json'  => 'application/json; charset=utf-8',
        'html'  => 'text/html; charset=utf-8',
        'webp'  => 'image/webp',
        'png'   => 'image/png',
        'jpg'   => 'image/jpeg',
        'jpeg'  => 'image/jpeg',
        'gif'   => 'image/gif',
        'svg'   => 'image/svg+xml',
        'ico'   => 'image/x-icon',
        'woff2' => 'font/woff2',
        'woff'  => 'font/woff',
        'ttf'   => 'font/ttf'
    ];
    $ext = strtolower(pathinfo($file, PATHINFO_EXTENSION));
    if (isset($mimes[$ext])) {
        header("Content-Type: " . $mimes[$ext]);
    }
    readfile($file);
    exit;
}

// Página 404
http_response_code(404);
header("Content-Type: text/html; charset=utf-8");
if (file_exists(__DIR__ . '/404.html')) {
    readfile(__DIR__ . '/404.html');
} else {
    echo "404 Not Found";
}
exit;
