'use client'

import { Select, SelectItem } from "@heroui/react";
import { Field } from "@/features/form/types/field";
import { FieldError } from "@/features/form/types/save/field-error";

export default function DatetimeFormat({
    fields,
    setFields,
    currentField,
    errors,
    setFieldErrors
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field,
    errors: FieldError,
    setFieldErrors: (errors: FieldError) => void
}) {

    const handleDatetimeFormatChange = (e: any) => {
        const datetimeFormat = e.target.value;
        
        // 更新当前字段的 config.datetime_format
        const updatedCurrentField = { 
            ...currentField, 
            config: { ...currentField.config, datetime_format: datetimeFormat } 
        };
        
        // 更新字段列表中对应字段的 config.datetime_format
        const updatedFields = fields.map(field => 
            field.uuid === currentField.uuid 
                ? { ...field, config: { ...field.config, datetime_format: datetimeFormat } }
                : field
        );
        
        setFields(updatedFields);
    }

    // get current datetime
    const currentDatetime = function (dateFormat: string) {
        const now = new Date();
        
        // format map
        const formatMap: { [key: string]: string | number } = {
            'Y': now.getFullYear(),
            'm': String(now.getMonth() + 1).padStart(2, '0'),
            'd': String(now.getDate()).padStart(2, '0'),
            'H': String(now.getHours()).padStart(2, '0'),
            'i': String(now.getMinutes()).padStart(2, '0'),
            's': String(now.getSeconds()).padStart(2, '0')
        };
        
        // replace format characters
        return dateFormat.replace(/[YmdHis]/g, (match) => {
            return String(formatMap[match] || match);
        });
    }


    
    return (
        <>
            {
                currentField.config.datetime_format !== undefined && (
                    <Select 
                        label="精确到" 
                        placeholder="Please select" 
                        className="max-w-full" 
                        selectedKeys={[(currentField.config.datetime_format as string)]} 
                        onChange={handleDatetimeFormatChange} 
                        labelPlacement="outside" 
                        classNames={{
                            label: "text-foreground font-semibold",
                        }}
                    >
                        {/* Full Date & Time Formats */}
                        <SelectItem key={"day"}>{"日"}</SelectItem>
                        <SelectItem key={"hour"}>{"小时"}</SelectItem>
                        <SelectItem key={"minute"}>{"分钟"}</SelectItem>
                        <SelectItem key={"second"}>{"秒"}</SelectItem>
                    </Select>
                )
            }
        </>
    )
}