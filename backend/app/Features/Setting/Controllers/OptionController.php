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
        $data = $this->service->get($request->input('group', null), $request->input('name', null));
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
        $data = $this->service->set($request->input('update_group'), $request->input('update_name'), $request->input('update_data'));
        return json($data);
    }
}