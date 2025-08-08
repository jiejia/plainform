import Link from "next/link";
import { Github } from "lucide-react";

export default function Copyright() {
    return (
        <p className="text-xs text-center mt-4 text-slate-400">© 2024 Powered By PlainForm <Link
            href={"https://github.com/jiejia/plainform"}><Github size={15} className="inline"/></Link>
        </p>
    )
}
