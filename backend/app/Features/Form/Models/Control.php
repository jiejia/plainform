<?php

namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Form Control Model
 * 
 * @property int $id
 * @property string $type
 * @property string $name
 * @property array $config_fields
 * @property string $icon
 * @property bool $required
 * @property string $regex
 * @property string $placeholder
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 */
class Control extends Model
{
    protected $table = 'controls';

    protected $casts = [
        'config_fields' => 'array',
        'required' => 'boolean',
        'regex' => 'string',
        'placeholder' => 'string', 
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = ['type', 'name', 'config_fields', 'icon', 'required', 'regex', 'placeholder'];
}