<?php
namespace App\Features\Auth\Controllers\Admin;

use Illuminate\Http\Request;
use App\Features\Auth\Services\AdminAuthService;

class IndexController
{
    public function __construct(
        protected AdminAuthService $adminAuthService
    ) {}


    public function login(Request $request)
    {

    }
}
