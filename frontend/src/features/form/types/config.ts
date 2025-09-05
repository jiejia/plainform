export type config = {
    title: string;
    description: string;
    required: boolean;
    regex: string;
    placeholder: string;
    [propName: string]: unknown;
}