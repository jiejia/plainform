<?php
namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany; 

class FormField extends Model
{
    use SoftDeletes;

    protected $table = 'form_fields';

    protected $fillable = [
        'uuid',
        'title',
        'description',
        'regex',
        'required',
        'config',
        'form_id',
        'control_id',
        'control_type',
        'control_name',
        'sort',
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}