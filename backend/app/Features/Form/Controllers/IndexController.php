<?php 
namespace App\Features\Form\Controllers;

use App\Features\Form\Data\Form;
use App\Features\Form\Services\IndexService;
use App\Features\Form\Validators\IndexValidator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * IndexController 
 * 
 * @package App\Features\Form\Controllers
 */
class IndexController
{
    /**
     * __construct
     * 
     * @param IndexService $service
     * @param IndexValidator $validator
     */
    public function __construct(
        private IndexService $service,
        private IndexValidator $validator
    ) {}

    /**
     * create
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request) : JsonResponse
    {
        $this->validator->scene('create')->validate($request->all());
        $data = $this->service->create($request->user(), Form::from($request->all()));
        return json($data);
    }

    /**
     * update
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function update(Request $request, int $id) : JsonResponse
    {
        $this->validator->scene('update')->validate($request->all());
        $data = $this->service->update($request->user(), $id, Form::from($request->all()));
        return json($data);
    }
}