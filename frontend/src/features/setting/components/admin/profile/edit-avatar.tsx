'use client'

import { Avatar, Button } from "@heroui/react";
import { Admin } from "@/features/core/types/app";
import FormModal from "@/features/core/components/admin/form-modal";
import { useEffect, useRef, useState } from "react";
import { uploadAvatar } from "@/features/setting/utils/setting-util";
import { msg } from "@/features/core/utils/ui";
import { updateAvatar } from "@/features/setting/actions/setting-action";
import { useTranslations } from 'next-intl';


export default function EditAvatar({ admin }: { admin: Admin }) {
    const [isPending, setIsPending] = useState(false);
    const t = useTranslations('setting');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<string>(admin.avatar as string);

    // update selected image when admin.avatar changes
    useEffect(() => {
        setSelectedImage(admin.avatar as string);
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
                msg(t('upload_failed'), t(res), 'warning');
            }
        }
    };

    const handleSave = async () => {
        setIsPending(true);
        
        const res = await updateAvatar(selectedImage);
        if (res === true) {
            msg(t('update_success'), t(res), 'success');
            window.location.reload();
        } else {
            msg(t('update_failed'), t(res), 'warning');
        }

        setIsPending(false);
    }

    return (
        <FormModal title={t('edit_avatar')} button={
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
                    {isPending ? t('updating') : t('save')}
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
                <p className="text-sm text-gray-500">{t('click_avatar_to_select_new_image')}</p>
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