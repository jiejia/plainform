<?php
namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    public function fields(): HasMany
    {
        return $this->hasMany(FormField::class);
    }
}