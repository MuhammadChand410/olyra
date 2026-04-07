"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SidebarLogo } from "@/assets/image";
import Image from "next/image";
import { loginUser } from "@/components/api/services/auth";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!form.email || !form.password) {
            setError('Please fill in all fields.');
            return;
        }
        setLoading(true);
        try {
            const data = await loginUser(form.email, form.password);
            const token = data.token || data.access || data.access_token;
            const userData = data.user || { email: form.email };
            localStorage.setItem('token', token);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('auth', JSON.stringify({ email: form.email, loggedIn: true }));
            router.push('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || err.response?.data?.message || 'Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] max-w-[700px] flex items-center justify-center px-4">
            <div className="bg-white rounded-xl border border-[#E9EAEB] p-8 w-full max-w-md shadow-sm">
                <div className="flex justify-center mb-6">
                    <Image src={SidebarLogo} alt="logo" width={160} height={36} />
                </div>
                <h1 className="font-serif font-normal text-2xl text-[#181D27] mb-1 text-center">Welcome back</h1>
                <p className="text-sm text-[#535862] text-center mb-6">Sign in to your account</p>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg mb-4">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-[#18181B] mb-1 block">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            placeholder="Enter your email"
                            className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-lg text-sm text-[#18181B] outline-none focus:border-[#BE735B] transition"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-[#18181B] mb-1 block">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                placeholder="Enter your password"
                                className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-lg text-sm text-[#18181B] outline-none focus:border-[#BE735B] transition pr-10"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#535862] cursor-pointer">
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-[#BE735B] text-white text-sm font-medium rounded-lg hover:bg-[#A86550] transition disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                    >
                        {loading && (
                            <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                        )}
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-sm text-center text-[#535862] mt-6">
                    Don't have an account?{' '}
                    <Link href="/signup" className="text-[#BE735B] font-medium hover:underline">Sign Up</Link>
                </p>
            </div>
        </div>
    );
}
