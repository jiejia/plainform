import Link from "next/link";
import { Github } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function Copyright() {

    const t = useTranslations();
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const yearDisplay = currentYear > startYear ? `${startYear} - ${currentYear}` : startYear.toString();

    return (
        <p className="text-xs text-center mt-4 w-full">© {yearDisplay} {t('core.powered_by', { app_name: "PlainForm" })} <Link
            href={"https://github.com/jiejia/plainform"}><Github size={15} className="inline"/></Link>
        </p>
    )
}