import { DynamicField } from "./dynamic-field";

export type SearchParams = {
    page: number;
    limit: number;
    keyword: string;
    version: number;
    createdAtStart: string;
    createdAtEnd: string;
    ip: string;
    dynamicFields: DynamicField[];
    orderBy: string;
    orderType: string;
}

