export type SearchParams = {
    page: number;
    limit: number;
    keyword: string;
    createdAtStart: string;
    createdAtEnd: string;
    submissionsCountStart: number | null;
    submissionsCountEnd: number | null;
    status: number[];
    orderBy: string;
    orderType: string;
}