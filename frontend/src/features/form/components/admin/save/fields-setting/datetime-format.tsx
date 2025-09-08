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
        
        setCurrentField(updatedCurrentField);
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
                        label="Date Format" 
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
                        <SelectItem key={"Y-m-d H:i:s"}>{currentDatetime("Y-m-d H:i:s")}</SelectItem>
                        <SelectItem key={"Y-m-d H:i"}>{currentDatetime("Y-m-d H:i")}</SelectItem>
                        <SelectItem key={"Y/m/d H:i:s"}>{currentDatetime("Y/m/d H:i:s")}</SelectItem>
                        <SelectItem key={"Y/m/d H:i"}>{currentDatetime("Y/m/d H:i")}</SelectItem>
                        <SelectItem key={"m/d/Y H:i:s"}>{currentDatetime("m/d/Y H:i:s")}</SelectItem>
                        <SelectItem key={"m/d/Y H:i"}>{currentDatetime("m/d/Y H:i")}</SelectItem>
                        <SelectItem key={"d/m/Y H:i:s"}>{currentDatetime("d/m/Y H:i:s")}</SelectItem>
                        <SelectItem key={"d/m/Y H:i"}>{currentDatetime("d/m/Y H:i")}</SelectItem>
                        
                        {/* Date Only Formats */}
                        <SelectItem key={"Y-m-d"}>{currentDatetime("Y-m-d")}</SelectItem>
                        <SelectItem key={"Y/m/d"}>{currentDatetime("Y/m/d")}</SelectItem>
                        <SelectItem key={"m/d/Y"}>{currentDatetime("m/d/Y")}</SelectItem>
                        <SelectItem key={"d/m/Y"}>{currentDatetime("d/m/Y")}</SelectItem>
                        <SelectItem key={"m-d-Y"}>{currentDatetime("m-d-Y")}</SelectItem>
                        <SelectItem key={"d-m-Y"}>{currentDatetime("d-m-Y")}</SelectItem>
                        
                        {/* Time Only Formats */}
                        <SelectItem key={"H:i:s"}>{currentDatetime("H:i:s")}</SelectItem>
                        <SelectItem key={"H:i"}>{currentDatetime("H:i")}</SelectItem>
                        
                        {/* Year/Month Only */}
                        <SelectItem key={"Y-m"}>{currentDatetime("Y-m")}</SelectItem>
                        <SelectItem key={"Y/m"}>{currentDatetime("Y/m")}</SelectItem>
                        <SelectItem key={"m/Y"}>{currentDatetime("m/Y")}</SelectItem>
                        
                        {/* Single Components */}
                        <SelectItem key={"Y"}>{currentDatetime("Y")}</SelectItem>
                        <SelectItem key={"m"}>{currentDatetime("m")}</SelectItem>
                        <SelectItem key={"d"}>{currentDatetime("d")}</SelectItem>
                    </Select>
                )
            }
        </>
    )
}