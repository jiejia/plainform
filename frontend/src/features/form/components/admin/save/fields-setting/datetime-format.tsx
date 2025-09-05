'use client'

import { Select, SelectItem } from "@heroui/react";
import { Field } from "@/features/form/types/field";

export default function DatetimeFormat({
    fields,
    setFields,
    currentField,
    setCurrentField
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field,
    setCurrentField: (field: Field) => void
}) {

    const handleDatetimeFormatChange = (e: any) => {
        const datetimeFormat = e.target.value;
        setFields(fields.map(field => field.uuid === currentField.uuid ? { ...field, datetime_format: datetimeFormat } : field));
        setCurrentField({ ...currentField, config: { ...currentField.config, datetime_format: datetimeFormat } });
    }
    return (
        <>
            {
                currentField.config.datetime_format !== undefined && (
                    <Select label="Date Format" placeholder="" className="max-w-full" selectedKeys={[0]} onChange={handleDatetimeFormatChange}>
                        <SelectItem key={0}>None</SelectItem>
                        <SelectItem key={1}>Arabic numerals</SelectItem>
                    </Select>
                )
            }
        </>
    )
}