

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
    multiple?: boolean;
    options?: {
        default_options: {
            val: string;
            selected: boolean;
        }[];
        multiple: boolean;
        api_url: string;
    };
    [propName: string]: unknown;
}