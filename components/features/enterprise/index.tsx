
import { ComplaintIcon, FileIcon, RightIcon, RightUpIcon } from "@/assets/icon";
import Note from "@/components/common/note";
import Link from "next/link";

export default function EnterpriseView() {
    return (
        <section className="py-6">
            <div className="container">
                <div className="mb-6">
                    <h1 className="text-4xl text-[#181D27] font-normal font-serif mb-1">Enterprise hub</h1>
                    <p className="text-sm font-normal text-[#535862]">Centralize NOM-035 and trusted channels in one modern location.</p>
                </div>
                <div className="p-4 mb-6 border border-[#E9EAEB] bg-[#F5F5F5] rounded-xl grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div className="bg-white p-6 border border-[#E9EAEB] rounded-xl">
                        <div className="flex items-start justify-between gap-6 border-b border-[#E3E3E3] pb-6">
                            <div>
                                <div className="p-2 rounded-[80px] bg-[#E5E7D4] w-fit mb-3">
                                    <FileIcon />
                                </div>
                                <h2 className="text-xl font-medium text-[#1E1E23] mb-3">NOM-035</h2>
                                <p className="text-sm font-normal text-[#5F5F69]">Perform the official psychosocial risk assessment with a modern experience.</p>
                            </div>
                            <div className="flex shrink-0">
                                <RightUpIcon />
                            </div>
                        </div>
                        <Link href="/button" className="flex mt-6 w-fit items-center gap-2 px-2 hover:bg-orange-50 font-medium py-2 text-sm border cursor-pointer border-[#BE735B] text-[#BE735B] rounded-md transition">
                            Go to the questionare
                            <RightIcon />
                        </Link>
                    </div>
                    <div className="bg-white p-6 border border-[#E9EAEB] rounded-xl">
                        <div className="flex items-start justify-between gap-6 border-b border-[#E3E3E3] pb-6">
                            <div>
                                <div className="p-2 rounded-[80px] bg-[#E5E7D4] w-fit mb-3">
                                    <ComplaintIcon />
                                </div>
                                <h2 className="text-xl font-medium text-[#1E1E23] mb-3">Anonymous complaints</h2>
                                <p className="text-sm font-normal text-[#5F5F69]">It offers a safe channel for the team to share concerns
                                    without retaliation.</p>
                            </div>
                            <div className="flex shrink-0">
                                <RightUpIcon />
                            </div>
                        </div>
                        <Link href="/complaintbutton"  className="flex mt-6 w-fit items-center gap-2 px-2 hover:bg-orange-50 font-medium py-2 text-sm border cursor-pointer border-[#BE735B] text-[#BE735B] rounded-md transition">
                            Open complaint mailbox
                            <RightIcon />
                        </Link>
                    </div>
                </div>
                <Note/>
            </div>
        </section>
    )
} 