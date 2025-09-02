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
     * Upload avatar file
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploadAvatar(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('upload_avatar')->validate($request->all());

        $avatarFile = $request->file('avatar');

        $avatarUrl = $this->service->uploadAvatar($avatarFile);

        return json(['avatar_url' => $avatarUrl]);
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

        $admin = $request->user();
        $avatar = $request->input('avatar_url');

        $user = $this->service->updateAvatar($admin, $avatar);

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

        $admin = $request->user();
        $email = $request->input('email');

        $this->service->sendEmailResetCode($admin, $email);

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

        $admin = $request->user();
        $email = $request->input('email');
        $code = $request->input('code');

        $this->service->updateEmail($admin, $email, $code);
        
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

        $admin = $request->user();
        $oldPassword = $request->input('old_password');
        $password = $request->input('password');

        $this->service->updatePassword($admin, $oldPassword, $password);
        
        return json();
    }
}