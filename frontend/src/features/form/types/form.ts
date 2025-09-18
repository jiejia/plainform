import { Field } from "./field";

export type Form = {
    id?: number;
    uuid?: string;
    title: string;
    description: string;
    enabled: boolean;
    numbering_style: number;
    admin_id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    version?: number;
    fields?: Field[];
}