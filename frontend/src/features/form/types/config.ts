

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
    options?: {
        default_options: {
            val: string;
            selected: boolean;
        }[];
        multiple: boolean;
        hide_multiple: boolean;
        api_url: string;
    };
    [propName: string]: unknown;
}