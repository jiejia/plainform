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

export type Statistic = {
    figures: Figures;
}