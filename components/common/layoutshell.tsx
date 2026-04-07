"use client"
import { usePathname } from "next/navigation";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import Sidebar from "@/components/common/sidebar";
import BottomNav from "@/components/common/bottomnav";
import AuthGuard from "@/components/common/authguard";
import { AuthProvider } from "@/components/context/AuthContext";

const AUTH_PAGES = ["/login", "/signup"];

export default function LayoutShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthPage = AUTH_PAGES.includes(pathname);

    if (isAuthPage) {
        return (
            <AuthProvider>
                <AuthGuard>
                    <main className="min-h-[80vh] my-8 max-w-[700px] w-full flex justify-center">{children}</main>
                </AuthGuard>
            </AuthProvider>
        );
    }

    return (
        <AuthProvider>
            <AuthGuard>
                <div className="hidden lg:block flex-shrink-0">
                    <Sidebar />
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                    <Header />
                    <main className="flex-1 overflow-auto bg-gray-50 pb-16 lg:pb-0">
                        {children}
                    </main>
                    <div className="hidden lg:block">
                        <Footer />
                    </div>
                </div>
                <BottomNav />
            </AuthGuard>
        </AuthProvider>
    );
}
