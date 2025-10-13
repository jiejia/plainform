export type Figures = {
    total_submission_number: {
        value: number;
        growth_rate: number;
    };
    average_submission_number: {
        value: number;
        growth_rate: number;
    };
    average_finishing_rate: {
        value: number;
        growth_rate: number;
    };
    independent_ip_number: {
        value: number;
        growth_rate: number;
    };
};

export type Trend = {
    point: string;
    views_count: number;
    submissions_count: number;
};


export type Statistic = {
    figures: Figures;
    trends: Trend[];
}