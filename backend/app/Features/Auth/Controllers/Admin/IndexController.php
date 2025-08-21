<?php
namespace App\Features\Auth\Controllers\Admin;

use Illuminate\Http\Request;
use App\Features\Auth\Services\AdminAuthService;
use App\Features\Auth\Validators\AdminAuthValidator;

/**
 * IndexController
 */
class IndexController
{
    /**
     * __construct
     * 
     * @param AdminAuthService $adminAuthService
     * @param AdminAuthValidator $adminAuthValidator
     */
    public function __construct(
        protected AdminAuthService $adminAuthService,
        protected AdminAuthValidator $adminAuthValidator
    ) {}

    /**
     * login
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->adminAuthValidator->scene('login')->validate($request->all());
        $token = $this->adminAuthService->login($request->input('email'), $request->input('password'));
        return json(['token' => $token]);
    }

    /**
     * logout
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->user()->currentAccessToken()->delete();
        return json();
    }
}
