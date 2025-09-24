import { PaginationParams } from "@/features/core/types/pagination-params";

export const initialPagination: PaginationParams<any> = {
    current_page: 1,
    data: [],
    first_page_url: '',
    last_page: 1,
    last_page_url: '',
    from: 1,
    links: [],
    next_page_url: '',
    path: '',
    per_page: 10,
    prev_page_url: '',
    to: 1,
    total: 1,
}