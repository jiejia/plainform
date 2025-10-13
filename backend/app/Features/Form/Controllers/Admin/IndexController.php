<?php 
namespace App\Features\Form\Controllers\Admin;

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

        $admin = $request->user();
        $title = $request->input('title');
        $description = $request->input('description');
        $enabled = $request->input('enabled');
        $numberingStyle = $request->input('numbering_style');
        $fields = $request->input('fields');

        $data = $this->service->create($admin, $title, $description, $enabled, $numberingStyle, $fields);
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

        $admin = $request->user();
        $title = $request->input('title');
        $description = $request->input('description');
        $enabled = $request->input('enabled');
        $numberingStyle = $request->input('numbering_style');
        $fields = $request->input('fields');

        $data = $this->service->update($admin, $id, $title, $description, $enabled, $numberingStyle, $fields);
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
        $orderType = $request->input('order_type');
        $admin = $request->user();

        $data = $this->service->list($admin, $keyword, $createdAtStart, $createdAtEnd, $submissionsCountStart, $submissionsCountEnd, $status, $orderBy, $orderType);
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
        $admin = $request->user();
        $data = $this->service->detail($admin, $id);
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

        $admin = $request->user();
        $ids = $request->input('ids', []);

        $this->service->delete($admin, $ids);
        return json();
    }

    /**
     * batchUpdateEnabled
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function batchUpdateEnabled(Request $request) : JsonResponse
    {
        $this->validator->scene('batch_update_enabled')->validate($request->all());

        $admin = $request->user();
        $items = $request->input('items', []);

        $this->service->batchUpdateEnabled($admin, $items);
        return json();
    }

    /**
     * controls
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function controls(Request $request) : JsonResponse
    {
        $data = $this->service->controls();
        return json($data);
    }

    /**
     * statistics
     * 
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function statistics(Request $request, int $id) : JsonResponse
    {
        $this->validator->scene('statistics')->validate($request->all());

        $version = $request->input('version', null);
        $periodType = $request->input('period_type');

        $data = $this->service->statistics($id, $version, $periodType);
        return json($data);
    }
}