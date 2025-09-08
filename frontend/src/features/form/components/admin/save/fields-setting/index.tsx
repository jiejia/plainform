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

export default function Index({
    fields,
    setFields,
    currentField,
    setCurrentField
}: {
    fields: Field[],
    setFields: (fields: Field[]) => void,
    currentField: Field | null,
    setCurrentField: (field: Field) => void
}) {

    console.log("currentField", currentField);
    return (
        <div className="h-full grid grid-cols-1 gap-4 content-start">
            {
                currentField && (
                    <>
                        <Title fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <Description fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <Regrex fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <DatetimeFormat fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <Required fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <Length fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <Cols fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <Rows fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <DefaultValue fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />    
                        <Options fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                        <SwitchDefaultValue fields={fields} setFields={setFields} currentField={currentField} setCurrentField={setCurrentField} />
                    </>
                )
            }

        </div>
    )
}