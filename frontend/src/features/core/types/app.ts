export type Admin = {
    username: string;
    avatar: string | null;
    email: string;
}

export type Setting = {
    general: {
        default_language: string;
    };
    appearances: {
        theme: string;
    };
}