<?php
namespace App\Features\Core\Services;

use App\Features\Core\Exceptions\BusinessException;
use App\Features\Core\Mails\VerifyCode;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use App\Features\Core\Constants\Code;

/**
 * MailCodeService
 */
class MailCodeService
{
    public const EXPIRE_TIME = 60;

    public string $scene = 'default';

    /**
     * generateCode
     * 
     * @return int
     */
    public function generateCode()
    {
        return random_int(100000, 999999);
    }

    /**
     * setScene
     * 
     * @param string $scene
     * @return self
     */
    public function scene(string $scene): self
    {
        $this->scene = $scene;
        return $this;
    }

    /**
     * limitUnExpired
     * 
     * @param string $email
     * @return bool
     */
    public function limitUnExpired(string $email)
    {
        $cacheKey = $this->getCacheKey($email, $this->scene);
        
        // check cache is expired
        $value = Cache::get($cacheKey);
        if ($value) {
            return false;
        }

        return true;
    }

    /**
     * sendCode
     * 
     * @param string $email
     * @return void
     */
    public function sendCode(string $email)
    {
        // check limit
        if (!$this->limitUnExpired($email)) {
            throw new BusinessException(Code::EMAIL_VERIFY_CODE_ERROR->message(), Code::EMAIL_VERIFY_CODE_ERROR->value);
        }

        $code = $this->generateCode();

        Mail::to($email)->send(new VerifyCode($code, $this->scene));

        $this->setCache($email, $this->scene, $code);
    }

    /**
     * setCache
     * 
     * @param string $email     
     * @param int $code
     * @return void
     */
    public function setCache(string $email, string $scene, int $code)
    {
        Cache::put($this->getCacheKey($email, $this->scene), $code, self::EXPIRE_TIME);
    }

    /**
     * clearCache
     * 
     * @param string $email
     * @return void
     */
    public function clearCache(string $email)
    {
        Cache::forget($this->getCacheKey($email, $this->scene));
    }

    /**
     * verifyCode
     * 
     * @param string $email
     * @param int $code
     * @return bool
     */
    public function verifyCode(string $email, int $code)
    {
        $cacheCode = Cache::get($this->getCacheKey($email, $this->scene));
        if ($cacheCode !== $code) {
            return false;
        }

        return true;
    }

    /**
     * getCacheKey
     * 
     * @param string $email
     * @param string $scene
     * @return string
     */
    public function getCacheKey(string $email, string $scene)
    {
        return 'email_verify_code:' . $email . ':' . $scene;
    }
}