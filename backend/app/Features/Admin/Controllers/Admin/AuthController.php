<?php
namespace App\Features\Admin\Controllers\Admin;

use Illuminate\Http\Request;
use App\Features\Admin\Services\AuthService;
use App\Features\Admin\Validators\AuthValidator;

/**
 * AuthController
 */
class AuthController
{
    /**
     * __construct
     * 
     * @param AuthService $authService
     * @param AuthValidator $authValidator
     */
    public function __construct(
        protected AuthService $authService,
        protected AuthValidator $authValidator
    ) {}

    /**
     * login
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->authValidator->scene('login')->validate($request->all());
        $token = $this->authService->login($request->input('email'), $request->input('password'));
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
