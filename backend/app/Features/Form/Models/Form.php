<?php
namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

/**
 * Form
 * 
 * @property string $uuid
 * @property string $title
 * @property string $description
 * @property int $enabled
 * @property int $numbering_style
 * @property int $admin_id
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 */
class Form extends Model
{
    use SoftDeletes;

    protected $table = 'forms';

    protected $fillable = [
        'uuid',
        'title',
        'description',
        'enabled',
        'numbering_style',
        'admin_id',
    ];

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s',
        'updated_at' => 'datetime:Y-m-d H:i:s',
        'deleted_at' => 'datetime:Y-m-d H:i:s', 
    ];

    // create uuid
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $model->uuid = Str::uuid();
        });
    }

    /**
     * fields
     * 
     * @return HasMany
     */
    public function fields(): HasMany
    {
        return $this->hasMany(FormField::class);
    }

    /**
     * submissions
     * 
     * @return HasMany
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(FormSubmission::class);
    }
}