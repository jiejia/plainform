'use client'

import { Field } from "@/features/form/types/field";
import {DatePicker} from "@heroui/react";
import { CalendarDate } from "@internationalized/date";


export default function DatetimeComponent({ field, value, setValue }: { field: Field, value: any, setValue: (value: any) => void }) {
    return (
        <DatePicker
            className="max-w-full"
            // label={field.title}
            value={value ? new CalendarDate(new Date(value as string).getFullYear(), new Date(value as string).getMonth(), new Date(value as string).getDate()) : undefined}
            onChange={(date) => {
                setValue(date?.toString());
            }}
            size="sm"
        />
    )
}