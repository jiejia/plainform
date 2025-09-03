'use client'

import { Avatar, Button } from "@heroui/react";
import { Admin } from "@/features/core/types/app";
import FormModal from "@/features/core/components/admin/form-modal";
import { useEffect, useRef, useState } from "react";
import { uploadAvatar } from "@/features/setting/utils/setting-util";
import { msg } from "@/features/core/utils/ui";
import { updateAvatar } from "@/features/setting/actions/setting-action";


export default function EditAvatar({ admin }: { admin: Admin }) {
    const [isPending, setIsPending] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string>(admin.avatar as string);

    // 当 admin.avatar 更新时，同步到本地状态
    useEffect(() => {
        setSelectedImage(admin.avatar ?? '');
    }, [admin.avatar]);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        console.log(file)

        if (file) {
            const formData = new FormData();
            formData.append('avatar', file);
            const res = await uploadAvatar(formData);
            if (res.code === 0) {
                setSelectedImage(res.data.avatar_url);
            } else {
                msg("上传失败", res.msg, 'warning');
            }
        }
    };

    const handleSave = async () => {
        setIsPending(true);
        console.log('admin.avatar', admin.avatar)
        console.log('selectedImage', selectedImage)
        const res = await updateAvatar(selectedImage);
        if (res === true) {
            msg("更新成功", res.msg, 'success');
            window.location.reload();
        } else {
            msg("更新失败", res.msg, 'warning');
        }

        setIsPending(false);
    }

    return (
        <FormModal title="编辑头像" button={
            <Button isIconOnly radius="full" variant="light">
                <Avatar
                    className="transition-transform"
                    src={admin.avatar || ''}
                    name={admin.avatar ? undefined : admin.username?.charAt(0).toUpperCase()}
                    size="md"
                    isBordered
                    title={admin.username}
                />
            </Button>
        }
            footer={
                <Button
                    type="submit"
                    color="primary"
                    variant="solid"
                    isLoading={isPending}
                    onPress={handleSave}
                >
                    {isPending ? "更新中..." : "保存"}
                </Button>
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