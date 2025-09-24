import { SearchParams } from "@/features/form/types/submission/search-params";

export const initialSearchParams: SearchParams = {
    page: 1,
    limit: 10,
    keyword: '',
    createdAtStart: '',
    createdAtEnd: '',
    version: 0,
    ip: '',
    dynamicFields: [],
    orderBy: 'id',
    orderType: 'desc',
}