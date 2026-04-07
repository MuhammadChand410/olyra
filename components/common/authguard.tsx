"use client"
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    // useEffect(() => {
    //     const auth = localStorage.getItem('auth');
    //     const isLoggedIn = auth ? JSON.parse(auth).loggedIn : false;
    //     const isAuthPage = pathname === '/login' || pathname === '/signup';

    //     if (!isLoggedIn && !isAuthPage) {
    //         router.replace('/login');
    //     }
    //     if (isLoggedIn && isAuthPage) {
    //         router.replace('/');
    //     }
    // }, [pathname, router]);

    // All routes are public — no auth redirect
    useEffect(() => {}, [pathname, router]);

    return <>{children}</>;
}
