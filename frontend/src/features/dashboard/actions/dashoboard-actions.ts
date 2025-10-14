'use server'

import api from "@/features/core/library/api";

/**
 * getStatistic
 * @param periodType 
 */
export async function getStatistic(periodType: string = 'today') {
    const res:any = await api.post('api/admin/dashboard/statistic', {
        json: {
            period_type: periodType
        }
    }).json();

    return res;
}