<?php 
namespace App\Features\Dashboard\Controllers\Admin;

use App\Features\Dashboard\Services\IndexService;
use App\Features\Dashboard\Validators\IndexValidator;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

/**
 * IndexController 
 * 
 * @package App\Features\Dashboard\Controllers\Admin
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
     * statistic
     * 
     * @param Request $request
     * @return JsonResponse
     */
    public function statistic(Request $request) : JsonResponse
    {
        $this->validator->scene('statistic')->validate($request->all());

        $periodType = $request->input('period_type');

        $data = $this->service->statistic($periodType);
        return json($data);
    }
}

