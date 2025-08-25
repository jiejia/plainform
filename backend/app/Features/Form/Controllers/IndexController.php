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

    /**
     * list
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function list(Request $request) : JsonResponse
    {
        $this->validator->scene('list')->validate($request->all());

        $keyword = $request->input('keyword');
        $createdAtStart = $request->input('created_at_start');
        $createdAtEnd = $request->input('created_at_end');
        $submissionsCountStart = $request->input('submissions_count_start');
        $submissionsCountEnd = $request->input('submissions_count_end');
        $status = $request->input('status');
        $orderBy = $request->input('order_by');
        $admin = $request->user();

        $data = $this->service->list($admin, $keyword, $createdAtStart, $createdAtEnd, $submissionsCountStart, $submissionsCountEnd, $status, $orderBy);
        return json($data);
    }

    /**
     * detail
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function detail(Request $request, int $id) : JsonResponse
    {
        $data = $this->service->detail($request->user(), $id);
        return json($data);
    }

    /**
     * delete
     *  
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request) : JsonResponse
    {   
        $this->validator->scene('delete')->validate($request->all());
        $this->service->delete($request->user(), $request->input('ids', []));
        return json();
    }
}