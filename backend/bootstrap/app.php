<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Features\Core\Exceptions\ValidationException;
use App\Features\Core\Exceptions\BusinessException;
use Illuminate\Auth\AuthenticationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        //
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        // handle ValidationException
        $exceptions->render(function (ValidationException $e, $request) {
            if ($request->expectsJson()) {
                return json($e->getErrors(), $e->getCode(), array_values($e->getErrors())[0] ?? $e->getMessage());
            }
        });

        // handle BusinessException
        $exceptions->render(function (BusinessException $e, $request) {
            if ($request->expectsJson()) {
                return json($e->getData(), $e->getCode(), $e->getMessage());
            }
        });

        // handle AuthenticationException
        $exceptions->render(function (AuthenticationException $e, $request) {
            if ($request->expectsJson()) {
                return json([], 401, 'Unauthorized', 401);
            }
        });
    })->create();
