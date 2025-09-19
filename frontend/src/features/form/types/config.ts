

export type config = {
    title: string;
    description: string;
    required?: boolean;
    regex: {
        hidden: boolean;
        value: string;
        warning_message: string;
    };
    placeholder?: string;
    default_value: {
        type: string;
        value: any;
        hidden: boolean;
    };
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