import { config } from "./config";


export type Field = {
    id?: number;
    uuid: string;
    title: string;
    description?: string;
    regex?: string;
    required: boolean;
    config: config;
    form_id?: number;
    control_id: number;
    control_type: string;
    control_name: string;
    sort: number;
    active?: boolean;
}