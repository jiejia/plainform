import { SearchParams } from "../types/list/search-params";

export const initialSearchParams: SearchParams = {
    page: 1,
    limit: 10,
    keyword: '',
    createdAtStart: '',
    createdAtEnd: '',
    submissionsCountStart: null,
    submissionsCountEnd: null,
    status: [],
    orderBy: 'id',
    orderType: 'desc',
}