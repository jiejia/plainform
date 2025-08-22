<?php

namespace App\Features\Core\Exceptions;

use Exception;
use Throwable;
use App\Features\Core\Constants\Code;

class BusinessException extends Exception
{
    protected array $data;

    public function __construct(string $message = "", int $code = Code::BUSINESS_LOGIC_ERROR->value, array $data = [], ?Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
        $this->data = $data;
    }

    public function getData(): array    
    {
        return $this->data;
    }
}