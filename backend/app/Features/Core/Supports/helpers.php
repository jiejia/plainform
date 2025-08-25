<?php

use App\Features\Core\Constants\Code;
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
function json(array $data = [], int $code = Code::SUCCESS->value, string $message = 'success', int $status = 200): JsonResponse
{
    $json = [
        'code' => $code,
        'msg' => $message,
        'data' => $data,
    ];

    if (config('app.debug') && $code !== Code::SUCCESS->value) {
        $trace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 10);
        $stackTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 10);
        $file = $trace[0]['file'];
        $line = $trace[0]['line'];
        $json['trace'] = $trace;
        $json['stack_trace'] = $stackTrace;
        $json['file'] = $file;
        $json['line'] = $line;
    }

    return response()->json($json, $status);
}

/**
 * get page limit
 * 
 * @return int
 */
function getPageLimit(): int
{
    return request()->input('page_limit', 10);
}
