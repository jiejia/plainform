<?php
return [

    // 允许跨域的路径
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // 允许的源（前端域名和端口）
    'allowed_origins' => [
        'http://localhost:3000',        // 你的 Next.js dev 服务器
        'http://127.0.0.1:3000',
    ],

    // 如果想偷懒，开发环境直接用 *
    // 'allowed_origins' => ['*'],

    // 允许的请求头——一定要把 Authorization 带上
    'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization'],

    // 允许的请求方法
    'allowed_methods' => ['*'],        // 或 ['POST','GET','PUT','DELETE','OPTIONS']

    // 需要带 cookie 的关键开关
    'supports_credentials' => true,
];