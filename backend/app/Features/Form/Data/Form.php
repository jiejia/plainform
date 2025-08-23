<?php
namespace App\Features\Form\Data;

use Spatie\LaravelData\Data;

class Form extends Data
{
    public function __construct(
        public string $uuid,
        public string $title,
        public string $description,
        public int $enabled,
        public int $numbering_style,
        public array $fields
    ) {}
}