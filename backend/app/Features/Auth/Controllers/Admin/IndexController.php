<?php
namespace App\Features\Auth\Controllers\Admin;

use Illuminate\Http\Request;
use App\Features\Auth\Services\AdminAuthService;
use App\Features\Auth\Validators\AdminAuthValidator;

class IndexController
{
    public function __construct(
        protected AdminAuthService $adminAuthService,
        protected AdminAuthValidator $adminAuthValidator
    ) {}

    /**
     * login
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $this->adminAuthValidator->scene('login')->validate($request->all());
        $token = $this->adminAuthService->login($request->input('email'), $request->input('password'));
        return json(['token' => $token]);
    }
}
