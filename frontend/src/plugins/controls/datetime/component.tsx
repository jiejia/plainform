'use client'

import { Field } from "@/features/form/types/field";
import { DateInput } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";


export default function DatetimeComponent({ field }: { field: Field }) {
    return (
        <DateInput
            className="max-w-sm"
            label={field.title}
            placeholderValue={new CalendarDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())}
            value={field.config.default_value ? new CalendarDate(new Date(field.config.default_value as string).getFullYear(), new Date(field.config.default_value as string).getMonth(), new Date(field.config.default_value as string).getDate()) : undefined}
            onChange={(date) => {
                field.config.default_value = date?.toString();
            }}
        />
    )
}