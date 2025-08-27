<?php 
namespace App\Features\Form\Controllers\Front;

use App\Features\Form\Services\IndexService;
use App\Features\Form\Validators\IndexValidator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * IndexController 
 * 
 * @package App\Features\Form\Controllers\Front
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
     * detail
     * 
     * @param Request $request
     * @param string $uuid
     * @return JsonResponse
     */
    public function detail(Request $request, string $uuid) : JsonResponse
    {
        $data = $this->service->frontDetail($uuid);

        return json($data);
    }

    /**
     * submit
     * 
     * @param Request $request
     * @param string $uuid
     * @return JsonResponse
     */
    public function submit(Request $request, string $uuid) : JsonResponse
    {
        $this->validator->scene('submit')->validate($request->all());

        $data = $request->input('data');
        $version = $request->input('version', 1);
        $ipv4 = $request->ip();

        $this->service->submit($uuid, $data, $version, $ipv4);

        return json();
    }
}
