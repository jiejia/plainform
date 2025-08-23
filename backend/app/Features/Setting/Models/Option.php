<?php
namespace App\Features\Setting\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Option model
 * 
 * @property int $id
 * @property string $name
 * @property array $data
 * @property string $group
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 */
class Option extends Model
{
    protected $table = 'options';

    protected $fillable = [
        'name',
        'data',
        'group',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'data' => 'array',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
    ];
    
    public $timestamps = false;

    public function scopeGroup($query, string $group)
    {
        return $query->where('group', $group);
    }
}