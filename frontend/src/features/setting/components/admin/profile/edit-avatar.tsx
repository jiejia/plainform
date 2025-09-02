'use client'

import { Avatar } from "@heroui/react";
import { Admin } from "@/features/core/types/app";

export default function EditAvatar({ admin }: { admin: Admin }) {
    return (
        <Avatar
            as="button"
            className="transition-transform"
            src={admin.avatar || ''}
            name={admin.avatar ? undefined : admin.username?.charAt(0).toUpperCase()}
            size="md"
            isBordered
            title={admin.username}
        />
    );
}