<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');


// load routes without middleware
loadFeatureRoutes();

// load routes with admin middleware
Route::prefix('admin')->middleware('auth:admin_api')->group(function () {
    loadFeatureRoutes('admin.php');
});

// load routes with user middleware
Route::prefix('user')->middleware('auth:api')->group(function () {
    loadFeatureRoutes('user.php');
});


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
