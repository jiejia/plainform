<?php
namespace App\Features\Setting\Services;

use App\Features\Setting\Constants\Code;
use App\Features\Setting\Models\Option;
use App\Features\Core\Exceptions\BusinessException;

class OptionService
{
    /**
     * get
     * 
     * @param string|null $group
     * @param string|null $name
     * @return array
     */
    public function get(?string $group = null, ?string $name = null): array
    {
        $query = Option::query()->select('name', 'data', 'group');
        
        if ($group) {
            $query->where('group', $group);
        }
        if ($name) {
            $query->where('name', $name);
        }

        // transform the data to array
        $options = $query->get()->toArray();
        $data = [];
        foreach ($options as $option) {
            $data[$option['group']][$option['name']] = $option['data']['value'];
        }

        return $data;
    }

    /**
     * set
     * 
     * @param string $group
     * @param string $name
     * @param mixed $data
     * @return array
     */
    public function set(string $group, string $name, mixed $data): array
    {
        $option = Option::where('group', $group)->where('name', $name)->first();
        if ($option) {
            $option->data = ['value' => $data];
            $option->save();
        } else {
            throw new BusinessException(Code::OPTION_NOT_FOUND->value, Code::OPTION_NOT_FOUND->message());
        }

        return $this->get($group, $name);
    }

}