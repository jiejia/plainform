<?php
namespace App\Features\Form\Controllers\Admin;

use App\Features\Form\Services\SubmissionService;
use App\Features\Form\Validators\SubmissionValidator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * SubmissionController
 * 
 * @package App\Features\Form\Controllers\Admin
 */
class SubmissionController
{
    /**
     * __construct
     * 
     * @param SubmissionService $service
     * @param SubmissionValidator $validator
     */
    public function __construct(
        private SubmissionService $service,
        private SubmissionValidator $validator
    ) {}

    /**
     * list
     * 
     * @param Request $request
     * @param int $formId
     * @return JsonResponse
     */
    public function list(Request $request, int $formId): JsonResponse
    {
        $this->validator->scene('list')->validate($request->all());

        $version = $request->input('version');
        $createdAtStart = $request->input('created_at_start');
        $createdAtEnd = $request->input('created_at_end');
        $ip = $request->input('ip');
        $dynamicFields = $request->input('dynamic_fields', []);
        $page = $request->input('page', 1);
        $perPage = $request->input('per_page', 15);
        $orderBy = $request->input('order_by');
        $orderType = $request->input('order_type');

        $data = $this->service->list($formId, $version, $createdAtStart, $createdAtEnd, $ip, $dynamicFields, $page, $perPage, $orderBy, $orderType);
        return json($data);
    }

    /**
     * detail
     * 
     * @param Request $request
     * @param int $formId
     * @param int $id
     * @return JsonResponse
     */
    public function detail(Request $request, int $formId, int $id): JsonResponse
    {
        $data = $this->service->detail($formId, $id);

        return json($data);
    }

    /**
     * delete
     * 
     * @param Request $request
     * @param int $formId
     * @return JsonResponse
     */
    public function delete(Request $request, int $formId): JsonResponse
    {
        $this->validator->scene('delete')->validate($request->all());

        $ids = $request->input('ids', []);

        $this->service->delete($formId, $ids);
        return json();
    }

    /**
     * versions
     * 
     * @param Request $request
     * @param int $formId
     * @return JsonResponse
     */
    public function versions(Request $request, int $formId): JsonResponse
    {
        $data = $this->service->getVersions($formId);
        return json($data);
    }

    /**
     * fields
     * 
     * @param Request $request
     * @param int $formId
     * @return JsonResponse
     */
    public function fields(Request $request, int $formId): JsonResponse
    {
        $this->validator->scene('fields')->validate($request->all());

        $version = $request->input('version');

        $data = $this->service->getFields($formId, $version);
        return json($data);
    }
}
