<?php
namespace App\Features\Form\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * FormSubmission
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

    protected $casts = [
        'data' => 'array',
        'version' => 'integer',
        'ipv4' => 'integer',
        'created_at' => 'datetime:Y-m-d H:i:s',
        'deleted_at' => 'datetime:Y-m-d H:i:s',
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
}