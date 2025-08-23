<?php
namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormSubmission extends Model
{
    use SoftDeletes;

    protected $table = 'form_submissions';

    protected $fillable = [
        'form_id',
        'data',
        'version',
        'ipv4',
        'created_at',
    ];

    public $timestamps = false;

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }
}