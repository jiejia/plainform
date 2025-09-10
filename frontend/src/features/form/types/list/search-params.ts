export type SearchParams = {
    page: number;
    limit: number;
    keyword: string;
    createdAtStart: string;
    createdAtEnd: string;
    submissionsCountStart: number;
    submissionsCountEnd: number;
    status: number[];
    orderBy: string;
    orderType: string;
}