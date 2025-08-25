<?php
namespace App\Features\Setting\Controllers;

use App\Features\Setting\Services\OptionService;
use App\Features\Setting\Validators\OptionValidator;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * Option controller
 */
class OptionController extends Controller
{
    public function __construct(
        protected OptionService $service,
        protected OptionValidator $validator
    ) {}

    /**
     * get
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function get(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('get')->validate($request->all());

        $group = $request->input('group', null);
        $name = $request->input('name', null);

        $data = $this->service->get($group, $name);
        return json($data);
    }


    /**
     * set
     * 
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function set(Request $request): \Illuminate\Http\JsonResponse
    {
        $this->validator->scene('set')->validate($request->all());

        $updateGroup = $request->input('update_group');
        $updateName = $request->input('update_name');
        $updateData = $request->input('update_data');

        $data = $this->service->set($updateGroup, $updateName, $updateData);
        return json($data);
    }
}