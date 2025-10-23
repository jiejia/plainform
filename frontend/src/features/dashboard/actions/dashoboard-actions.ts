'use server'

import api from "@/features/core/library/api";
import { Result } from "@/features/core/types/result";
import { Statistic } from "@/features/dashboard/types/statistic";

/**
 * getStatistic
 * @param periodType 
 */
export async function getStatistic(periodType: string = 'today'): Promise<Result<Statistic>> {
    try {
        const res: any = await api.post('api/admin/dashboard/statistic', {
            json: {
                period_type: periodType
            }
        }).json();
        return res;
    } catch (error: any) {
        console.log("dashboard-actions getStatistic error: ", error);
        return {
            code: 9999,
            data: null as unknown as Statistic,
            msg: 'core.server_error'
        }
    }
}