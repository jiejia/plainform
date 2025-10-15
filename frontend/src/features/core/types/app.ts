export type Admin = {
    username: string;
    avatar: string | null;
    email: string;
}

export type Setting = {
    name: string;
    data: any;
    group: string;
}