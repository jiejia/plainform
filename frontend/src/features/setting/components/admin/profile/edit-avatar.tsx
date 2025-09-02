'use client'

import { Avatar, Button } from "@heroui/react";
import { Admin } from "@/features/core/types/app";
import FormModal from "@/features/core/components/admin/form-modal";
import { useRef, useState } from "react";
import { uploadAvatar } from "@/features/setting/actions/setting-action";
import { msg } from "@/features/core/utils/ui";


export default function EditAvatar({ admin }: { admin: Admin }) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (file) {
            const res = await uploadAvatar(file);
            if (res.code === 0) {
                setSelectedImage(res.data.avatar_url);
            } else {
                msg("上传失败", res.msg, 'warning');
            }
        }
    };

    return (
        <FormModal title="编辑头像" button={
            <Avatar
                as="button"
                className="transition-transform"
                src={admin.avatar || ''}
                name={admin.avatar ? undefined : admin.username?.charAt(0).toUpperCase()}
                size="md"
                isBordered
                title={admin.username}
            />
        }
            footer={
                <Button type="submit" color="primary" variant="solid">保存</Button>
            }
        >
            <div className="flex flex-col items-center space-y-4">
                <Avatar
                    as="button"
                    className="transition-transform hover:scale-105 cursor-pointer w-16 h-16"
                    src={selectedImage || admin.avatar || ''}
                    name={admin.avatar || selectedImage ? undefined : admin.username?.charAt(0).toUpperCase()}
                    isBordered
                    onClick={handleAvatarClick}
                />
                <p className="text-sm text-gray-500">点击头像选择新图片</p>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </FormModal>
    );
}