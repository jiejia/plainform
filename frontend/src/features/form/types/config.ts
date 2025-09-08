

export type config = {
    title: string;
    description: string;
    required: boolean;
    regex: string;
    regex_warning_message?: string;
    placeholder: string;
    length?: number[];
    rows?: number;
    cols?: number;
    [propName: string]: unknown;
}