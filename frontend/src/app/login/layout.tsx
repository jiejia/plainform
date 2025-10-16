import Copyright from "@/features/core/components/admin/copyright";
import { Shell } from "lucide-react";
import ThemeToggle from "@/features/core/components/shared/theme-toggle";

export default function LoginLayout({children,}: { children: React.ReactNode }) {
    return (
        <div className="p-4 relative">
            <ThemeToggle/>
            <div className="mt-20 mx-auto max-w-96">
                <h1 className="text-center">
                    <Shell size={32} className="w-8 h-8 inline text-primary"/>
                    <span className="text-2xl font-semibold pl-1 inline-block align-middle text-primary">PlainForm</span>
                </h1>
                {children}
                <Copyright/>
            </div>
        </div>
    );
}
