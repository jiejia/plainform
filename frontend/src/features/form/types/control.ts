import { config } from "./config";


export type Control = {
    id: number;
    type: string;
    name: string;
    config: config;
    icon: string;
    group: string;
}
