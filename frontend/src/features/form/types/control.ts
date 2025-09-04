export type Control = {
    id: number;
    type: string;
    name: string;
    config: config;
    icon: string;
    group: string;
}

type config = {
    title: string;
    description: string;
    required: boolean;
    regex: string;
    placeholder: string;
    [propName: string]: unknown;
}