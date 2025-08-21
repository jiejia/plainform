<?php

namespace App\Features\Core\Exceptions;

use Exception;
use Throwable;

class BusinessException extends Exception
{
    protected mixed $data;

    public function __construct(string $message = "Business Logic Error", mixed $data = [], int $code = 500, ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->data = $data;
    }

    public function getData(): mixed        
    {
        return $this->data;
    }
}