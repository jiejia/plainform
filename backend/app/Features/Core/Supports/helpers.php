<?php

use Illuminate\Http\JsonResponse;

/**
 * load feature route files
 *
 * @param string $routeFileName
 * @return void
 */
function loadFeatureRoutes(string $routeFileName = 'route.php'): void
{
    $featuresPath = app_path('Features');

    if (!is_dir($featuresPath)) {
        return;
    }

    $featureDirectories = glob($featuresPath . '/*', GLOB_ONLYDIR);

    foreach ($featureDirectories as $featureDir) {
        $routeFile = $featureDir . '/Routes/' . $routeFileName;

        if (file_exists($routeFile)) {
            require $routeFile;
        }
    }
}

/**
 * json response
 *
 * @param array $data
 * @param int $code
 * @param string $message
 * @param int $status
 * @return JsonResponse
 */
function json(array $data = [], int $code = 0, string $message = 'success', int $status = 200): JsonResponse
{
    return response()->json([
        'code' => $code,
        'msg' => $message,
        'data' => $data
    ], $status);
}
