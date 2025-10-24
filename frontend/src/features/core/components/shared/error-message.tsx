'use client'

import React from "react";

export default function ErrorMessage({ error }: { error: string }) {
    return (
        <span className="text-danger-500 text-xs bg-content3 px-2 py-1 rounded-md whitespace-nowrap shrink-0">
            {error}
        </span>
    )
}