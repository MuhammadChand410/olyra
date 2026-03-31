"use client";
import { SidebarLogo } from "@/assets/image";
import Link from "next/link";
import Image from "next/image";
import { ActionIcon, ChatbotIcon, DashboardIcon, EnterpriseIcon, HealthIcon, ProfileIcon, QuestionnairesIcon } from "@/assets/icon";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const SIDEBAR_LINKS = [
        {
            id: 1,
            icon: DashboardIcon,
            text: 'Dashboard',
            path: '/'
        },
        {
            id: 2,
            icon: HealthIcon,
            text: 'Health Insights',
            path: '/health'
        },
        {
            id: 3,
            icon: ActionIcon,
            text: 'Action Plan',
            path: '/action'
        },
        {
            id: 4,
            icon: ChatbotIcon,
            text: 'Chatbot',
            path: '/chatbot'
        },
        {
            id: 5,
            icon: ProfileIcon,
            text: 'Profile',
            path: '/profile'
        },
        {
            id: 6,
            icon: EnterpriseIcon,
            text: 'Enterprise',
            path: '/enterprise'
        },
        {
            id: 7,
            icon: QuestionnairesIcon,
            text: 'Questionnaires',
            path: '/question'
        },
    ]
    return (
        <aside className="w-64 bg-white border-r border-gray-200 text-white min-h-screen flex flex-col top-0 sticky">
            <div className="p-6">
                <Image src={SidebarLogo} alt="sidebar-logo" className="w-full" />
            </div>
            <nav className="flex-1 px-4">
                <h2 className="text-sm text-[#535862] font-normal font-Instrument Serif mb-4">Main Navigation</h2>
                <ul className="space-y-2">
                    {SIDEBAR_LINKS.map(card =>
                        <li className="" key={card.id}>
                            <Link href={card.path} className={`flex items-center text-base text-[#535862] font-normal rounded-xl gap-3 px-3 py-2.5 transition ${pathname === card.path ? 'bg-[#BE735B] text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
                                <div>
                                    <card.icon isActive={pathname === card.path} />
                                </div>
                                {card.text}
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </aside>
    )
}