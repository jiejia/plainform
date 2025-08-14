import Link from "next/link";
import { Github } from "lucide-react";

export default function Copyright() {
    const startYear = 2025;
    const currentYear = new Date().getFullYear();
    const yearDisplay = currentYear > startYear ? `${startYear} - ${currentYear}` : startYear.toString();

    return (
        <p className="text-xs text-center mt-4 text-slate-400 w-full">© {yearDisplay} Powered By PlainForm <Link
            href={"https://github.com/jiejia/plainform"}><Github size={15} className="inline"/></Link>
        </p>
    )
}