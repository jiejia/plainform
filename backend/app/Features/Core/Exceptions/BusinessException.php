<?php

namespace App\Features\Core\Exceptions;

use Exception;
use Throwable;
use App\Features\Core\Constants\ErrorCode;

class BusinessException extends Exception
{
    protected mixed $data;

    public function __construct(string $message = "", int $code = ErrorCode::BUSINESS_LOGIC_ERROR->value, mixed $data = null, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->data = $data;
    }

    public function getData(): mixed    
    {
        return $this->data;
    }
}