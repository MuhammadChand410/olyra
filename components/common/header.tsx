"use client";
import { FrameIcon, SubscribeIcon } from "@/assets/icon";
import { avatar, SidebarLogo } from "@/assets/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardIcon, HealthIcon, ActionIcon, ChatbotIcon, ProfileIcon, EnterpriseIcon, QuestionnairesIcon } from "@/assets/icon";
import Image from "next/image";

const SIDEBAR_LINKS = [
    { id: 1, icon: DashboardIcon, text: 'Dashboard', path: '/' },
    { id: 2, icon: HealthIcon, text: 'Health Insights', path: '/health' },
    { id: 3, icon: ActionIcon, text: 'Action Plan', path: '/action' },
    { id: 4, icon: ChatbotIcon, text: 'Chatbot', path: '/chatbot' },
    { id: 5, icon: ProfileIcon, text: 'Profile', path: '/profile' },
    { id: 6, icon: EnterpriseIcon, text: 'Enterprise', path: '/enterprise' },
    { id: 7, icon: QuestionnairesIcon, text: 'Questionnaires', path: '/question' },
];

export default function Header() {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="bg-white border-b border-[#E9EAEB] py-4 sticky top-0 z-40">
            <div className="container">
                <nav className="flex items-center justify-between">

                    <div className="lg:hidden">
                        <Image src={SidebarLogo} alt="sidebar-logo" className="w-full" />
                    </div>

                    <ul className="flex items-center gap-3 ml-auto">
                        <li className="relative">
                            <button onClick={() => setServicesOpen(!servicesOpen)} className="bg-[#F5F5F5] cursor-pointer rounded-[80px] p-2">
                                <FrameIcon />
                            </button>
                            {servicesOpen && (
                                <div className="absolute top-full mt-2 bg-white shadow-lg rounded py-2 w-48 z-10">
                                    <Link href="/services/web" className="block px-4 py-2 hover:bg-gray-100">Web Development</Link>
                                    <Link href="/services/mobile" className="block px-4 py-2 hover:bg-gray-100">Mobile Apps</Link>
                                    <Link href="/services/design" className="block px-4 py-2 hover:bg-gray-100">Design</Link>
                                </div>
                            )}
                        </li>
                        <li className="relative">
                            <button onClick={() => setProfileOpen(!profileOpen)} className="bg-[#F5F5F5] cursor-pointer rounded-[80px] p-2.5">
                                <SubscribeIcon />
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded py-2 w-48 z-10">
                                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">My Profile</Link>
                                    <Link href="/settings" className="block px-4 py-2 hover:bg-gray-100">Settings</Link>
                                    <hr className="my-2" />
                                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">Logout</button>
                                </div>
                            )}
                        </li>
                        <div className="cursor-pointer">
                            <img src={avatar.src} alt="avatar" width={40} height={40} className="rounded-full" />
                        </div>
                    </ul>
                </nav>
            </div>
        </header>
    );
}