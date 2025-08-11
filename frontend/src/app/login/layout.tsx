import Copyright from "@/features/core/components/admin/copyright";
import { Shell } from "lucide-react";


export default function LoginLayout({children,}: { children: React.ReactNode }) {
    return (
        <div className="p-4">
            <div className="mt-20 mx-auto max-w-96">
                <h1 className="text-center hover:text-slate-500">
                    <Shell size={32} className="w-8 h-8 inline text-primary-600"/>
                    <span className="text-2xl font-semibold pl-1 text-primary-600 inline-block align-middle">PlainForm</span>
                </h1>
                {children}
                <Copyright/>
            </div>
        </div>
    );
}
