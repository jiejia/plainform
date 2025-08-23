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
     * @param ProfileService $serice
     * @param ProfileValidator $validator
     */
    public function __construct(
        protected ProfileService $service,
        protected ProfileValidator $validator
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

    /**
     * Update avatar
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateAvatar(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('update_avatar')->validate($request->all());

        $user = $this->service->updateAvatar($request->user(), $request->file('avatar'));

        return json($user);
    }

    /**
     * sendEmailResetCode
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendEmailResetCode(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('send_email_reset_code')->validate($request->all());
        $this->service->sendEmailResetCode($request->user(), $request->input('email'));
        return json();
    }

    /**
     * resetEmail
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateEmail(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('update_email')->validate($request->all());
        $this->service->updateEmail($request->user(), $request->input('email'), $request->input('code'));
        return json();
    }

    /**
     * updatePassword
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePassword(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('update_password')->validate($request->all());
        $this->service->updatePassword($request->user(), $request->input('old_password'), $request->input('password'));
        return json();
    }
}