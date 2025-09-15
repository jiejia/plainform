'use client'

import React from "react";
import OptionsControl from "./options";
import { Field } from "@/features/form/types/field";
import Title from "./title";
import Description from "./description";
import Regrex from "./regrex";
import DatetimeFormat from "./datetime-format";
import Required from "./required";
import Length from "./length";
import DefaultValue from "./default-value";
import Options from "./options";
import SwitchDefaultValue from "./switch-default-value";
import Cols from "./cols";
import Rows from "./rows";
import { FieldError } from "@/features/form/types/save/field-error";

export default function Index({
    fields,
    setFields,
    errors,
    setFieldErrors
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    errors: FieldError,
    setFieldErrors: (errors: FieldError) => void
}) {

    const currentField = fields.find((field: Field) => field.active);

    return (
        <div className="h-full grid grid-cols-1 gap-4 content-start">
            {
                currentField && (
                    <>
                        <Title fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <Description fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <Regrex fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <DatetimeFormat fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <Required fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <Length fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <Cols fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <Rows fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <DefaultValue fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />    
                        <Options fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                        <SwitchDefaultValue fields={fields} setFields={setFields} currentField={currentField} errors={errors} setFieldErrors={setFieldErrors} />
                    </>
                )
            }

        </div>
    )
}