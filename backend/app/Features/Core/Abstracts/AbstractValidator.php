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

    protected function messages()
    {
        return [];
    }

    protected function rules()
    {
        return [];
    }

    protected function scenes()
    {
        return [];
    }

    public function __construct()
    {
        $this->messages = $this->messages();
        $this->rules = $this->rules();
        $this->scenes = $this->scenes();
    }

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
            $errors = [];
            foreach ($validator->errors()->keys() as $field) {
                $errors[$field] = $validator->errors()->first($field);
            }
            
            throw new ValidationException(
                'Validation Failed',
                $errors
            );
        }
    }
}
