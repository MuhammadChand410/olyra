"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { DashboardIconn, HealthIconn, ChatbotIconn, ActionIconn, QuestionnairesIconn, ProfileIconn, EnterpriseIconn } from "@/assets/icon";

const PAGE_ONE = [
    { id: 1, icon: DashboardIconn, text: 'Home', path: '/' },
    { id: 2, icon: HealthIconn, text: 'Insights', path: '/health' },
    { id: 3, icon: ChatbotIconn, text: 'Chat', path: '/chatbot' },
    { id: 4, icon: ActionIconn, text: 'Action Plan', path: '/action' },
];

const PAGE_TWO = [
    { id: 5, icon: ProfileIconn, text: 'Profile', path: '/profile' },
    { id: 6, icon: EnterpriseIconn, text: 'Enterprise', path: '/enterprise' },
    { id: 7, icon: QuestionnairesIconn, text: 'Questionnaires', path: '/question' },
];

export default function BottomNav() {
    const pathname = usePathname();
    const [page, setPage] = useState(0);

    const links = page === 0 ? PAGE_ONE : PAGE_TWO;

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E9EAEB] z-50">
            <div className="container">
                <ul className="flex items-center justify-between">
                    {links.map(link => {
                        const isActive = pathname === link.path;
                        return (
                            <li key={link.id}>
                                <Link href={link.path} className="flex flex-col items-center gap-1 p-3">
                                    <link.icon isActive={isActive} />
                                    <span className={`text-xs font-normal ${isActive ? 'text-[#BE735B]' : 'text-[#9DB2CE]'}`}>
                                        {link.text}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}

                    <li>
                        <button
                            onClick={() => setPage(p => p === 0 ? 1 : 0)}
                            className="flex flex-col items-center gap-1 p-3 cursor-pointer"
                        >
                            {page === 0 ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#9DB2CE">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                    <span className="text-[10px] font-normal text-[#9DB2CE]">More</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#BE735B">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    <span className="text-[10px] font-normal text-[#BE735B]">Back</span>
                                </>
                            )}
                        </button>
                    </li>
                </ul>

                <div className="flex justify-center gap-1 pb-1">
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${page === 0 ? 'bg-[#BE735B]' : 'bg-gray-300'}`} />
                    <span className={`w-1.5 h-1.5 rounded-full transition-all ${page === 1 ? 'bg-[#BE735B]' : 'bg-gray-300'}`} />
                </div>
            </div>
        </nav>
    );
}
