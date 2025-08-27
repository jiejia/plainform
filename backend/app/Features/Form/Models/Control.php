<?php

namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Form Control Model
 * 
 * @property int $id
 * @property string $type
 * @property string $name
 * @property array $config
 * @property string $icon
 * @property string $group
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Control extends Model
{
    protected $table = 'controls';

    protected $casts = [
        'config' => 'array',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];

    protected $fillable = ['type', 'name', 'config', 'icon', 'group'];
}