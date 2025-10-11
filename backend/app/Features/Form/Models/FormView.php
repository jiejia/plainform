<?php

namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Casts\Attribute;

/**
 * FormView
 * 
 * @property int $id
 * @property int $form_id
 * @property array $data
 * @property int $version
 * @property int|null $ipv4
 * @property string $created_at
 * @property string|null $deleted_at
 * @package App\Features\Form\Models
 */
class FormView extends Model
{
    protected $table = 'form_views';

    protected $fillable = [
        'form_id',
        'form_version',
        'visitor_id',
        'ipv4',
        'ipv6',
        'region',
        'user_agent',
        'created_at',
    ];

    protected $casts = [
        'form_version' => 'integer',
        'ipv4' => 'integer',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'created_at' => 'datetime:Y-m-d H:i:s',
    ];

    public $timestamps = false;

    /**
     * form
     * 
     * @return BelongsTo
     */
    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * ipv4
     * 
     * @return Attribute
     */
    protected function ipv4(): Attribute
    {
        return Attribute::make(
            get: fn(?int $value) => $value ? long2ip($value) : null,
            set: fn(?string $value) => $value ? ip2long($value) : null,
        );
    }
}
