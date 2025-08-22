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
     * @param AuthService $service
     * @param AuthValidator $validator
     */
    public function __construct(
        protected AuthService $service,
        protected AuthValidator $validator
    ) {}

    /**
     * login
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('login')->validate($request->all());
        $token = $this->service->login($request->input('email'), $request->input('password'));
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

    /**
     * sendForgetPasswordEmail
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendForgetPasswordEmail(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('send_forget_password_email')->validate($request->all());
        $this->service->sendForgetPasswordEmail($request->input('email'));
        return json();
    }

    /**
     * resetPassword
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function resetPassword(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('reset_password')->validate($request->all());
        $this->service->resetPassword($request->input('email'), $request->input('password'), $request->input('reset_password_token'));
        return json();
    }
}
