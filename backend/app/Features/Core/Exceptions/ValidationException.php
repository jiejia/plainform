<?php

namespace App\Features\Core\Exceptions;

use Exception;
use Throwable;
use App\Features\Core\Constants\ErrorCode;

class ValidationException extends Exception
{
    protected array $errors;

    public function __construct(string $message = "Validation Failed", array $errors = [], int $code = ErrorCode::BUSINESS_LOGIC_ERROR->value, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->errors = $errors;
    }

    public function getErrors(): array
    {
        return $this->errors;
    }
}