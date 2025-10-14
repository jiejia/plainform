export type Figures = {
    form_number: {
        value: number;
        growth_rate: number;
    };
    submission_number: {
        value: number;
        growth_rate: number;
    };
    view_number: {
        value: number;
        growth_rate: number;
    };
    active_form_number: {
        value: number;
        growth_rate: number;
    };
    independent_ip_number: {
        value: number;
        growth_rate: number;
    };
    average_finishing_rate: {
        value: number;
        growth_rate: number;
    };
};

export type FormTrend = {
    point: string;
    created: number;
    active: number;
    submissions: number;
};

export type SubmissionOverview = {
    point: string;
    total: number;
    unique: number;
};

export type ActiveForms = {
    no: number;
    form_id: number;
    title: string;
    submissions: number;
    views: number;
    rate: number;
    trend: number;
};

export type RecentActivities = {
    id: number;
    form_title: string;
    visitor_region: string;
    time: string;
    status: string;
};

export type Statistic = {
    figures: Figures;
    form_trends: FormTrend[];
    submission_overview: SubmissionOverview[];
    active_forms: ActiveForms[];
    recent_activities: RecentActivities[];
}