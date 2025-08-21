<?php
namespace App\Features\Admin\Controllers\Admin;

use Illuminate\Http\Request;
use App\Features\Admin\Services\ProfileService;
use App\Features\Admin\Validators\ProfileValidator;

/**
 * ProfileController
 */
class ProfileController
{
    /**
     * __construct
     * 
     * @param ProfileService $profileService
     * @param ProfileValidator $profileValidator
     */
    public function __construct(
        protected ProfileService $profileService,
        protected ProfileValidator $profileValidator
    ) {}

    /**
     * me
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request): \Illuminate\Http\JsonResponse
    {
        return json($request->user()->toArray());
    }
}
