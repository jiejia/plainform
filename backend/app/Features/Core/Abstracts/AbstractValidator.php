<?php
namespace App\Features\Core\Abstracts;

use App\Features\Core\Exceptions\ValidationException;
use Illuminate\Support\Facades\Validator;

/**
 * abstract validator
 */
abstract class AbstractValidator
{
    protected array $rules = [

    ];

    protected array $messages = [

    ];

    protected array $scenes = [

    ];

    protected array $sceneRules = [

    ];

    /**
     * set validate scene
     *
     * @param $scene
     * @return static
     */
    public function scene($scene): static
    {
        $rules = [];
        if (isset($this->scenes[$scene])) {
            foreach ($this->scenes[$scene] as $value) {
                $rules[$value] = $this->rules[$value];
            }
        }
        $this->sceneRules = $rules;
        return $this;
    }

    /**
     * validate
     *
     * @param $data
     * @return void
     * @throws ValidateException
     */
    public function validate($data): void
    {
        $rules = !empty($this->sceneRules) ? $this->sceneRules : $this->rules;
        $validator = Validator::make($data, $rules, $this->messages);

        if ($validator->fails()) {
            throw new ValidationException(
                'Validation Failed',
                $validator->errors()->toArray()
            );
        }
    }
}
