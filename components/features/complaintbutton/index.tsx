"use client";

import { BackArrowIcon, InfoIcon, SandDataIcon, SecurityCheckIcon } from "@/assets/icon";
import Note from "@/components/common/note";
import Link from "next/link";
import { useState } from "react";

export default function ComplaintButtonView() {
    const [form, setForm] = useState({
        title: "",
        category: "",
        description: "",
        includeEmail: true,
    });

    const categories = ["Harassment", "Discrimination", "Workload", "Safety"];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
        alert("Complaint Submitted ✅");
    };

    return (
        <section className="p-6">
            <div className="container">
                <div className="mb-6">
                    <div className="flex items-center gap-2.5 mb-1">
                        <Link href="/enterprise" className="text-[#535862] -ml-9 hover:text-[#181D27]">
                            <BackArrowIcon />
                        </Link>
                        <h1 className="font-serif font-normal text-4xl text-[#181D27]"> Anonymous complaints</h1>
                    </div>
                    <p className="text-sm text-[#535862] font-normal mb-6">Offer a trusted space where employees can share concerns securely and without retaliation. </p>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-[#F5F5F5] rounded-xl p-4 space-y-6"
                    >

                        <div className="bg-white border border-[#E9EAEB] shadow rounded-lg p-6">
                            <div className="w-fit p-2 rounded-[80px] bg-[#E5E7D4] mb-2">
                                <SecurityCheckIcon />
                            </div>
                            <p className="font-medium text-xl text-[#0F172B] mb-2.5">
                                100% private submissions
                            </p>
                            <p className="text-xl tracking-[-1.8px] text-[#626366] font-normal">
                                Only authorized HR & Compliance team will review these entries.
                                We don’t log personal data in this demo.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-lg border-[#E9EAEB] shadow-md border space-y-6">
                            <div>
                                <label className="text-sm text-[#18181B] font-medium">
                                    Title or subject
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g Workplace stress in warehouse"
                                    value={form.title}
                                    onChange={(e) =>
                                        setForm({ ...form, title: e.target.value })
                                    }
                                    className="w-full mt-2 px-3 py-2.5 text-sm text-[#71717A] font-normal border border-[#E4E4E7] rounded-md focus:ring-2 focus:ring-orange-300 outline-none"
                                />
                                <p className="text-xs text-[#71717A] font-normal mt-2">
                                    Summarize the situation in a few words so we can triage faster.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm text-[#18181B] font-medium">
                                    Topic category (optional)
                                </label>

                                <div className="flex flex-wrap gap-2 mt-2">
                                    {categories.map((cat) => (
                                        <button
                                            type="button"
                                            key={cat}
                                            onClick={() =>
                                                setForm({ ...form, category: cat })
                                            }
                                            className={`px-3 py-2.5 cursor-pointer border border-[#E4E4E7] rounded-md text-[#71717A] font-medium text-sm transition 
                                                            ${form.category === cat
                                                    ? "bg-[#BE735B] text-white border-[#BE735B]"
                                                    : "hover:bg-gray-100"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                <p className="text-xs text-[#71717A] font-normal mt-2">
                                    Select a category that best describes your complaint.
                                </p>
                            </div>

                            <div>
                                <label className="text-sm text-[#18181B] font-medium">
                                    Describe the situation
                                </label>
                                <textarea
                                    placeholder="Describe..."
                                    value={form.description}
                                    onChange={(e) =>
                                        setForm({ ...form, description: e.target.value })
                                    }
                                    className="w-full mt-1.5 text-sm text-[#71717A] font-normal px-3 py-2 border border-[#E4E4E7] rounded-md h-20 resize-none focus:ring-2 focus:ring-orange-300 outline-none"
                                />
                                <p className="text-xs text-[#71717A] font-normal mt-2">
                                    Skip names or identifying details if you prefer to stay anonymous
                                </p>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={form.includeEmail}
                                    onChange={(e) =>
                                        setForm({ ...form, includeEmail: e.target.checked })
                                    }
                                    className="accent-[#BE735B]"
                                />
                                <span className="text-sm text-[#18181B] font-medium">
                                    Check to include your email for follow-up
                                </span>
                            </div>

                            <div className="bg-[#F8EEE9] border border-[#E5E7D4] rounded-xl p-3 flex items-center gap-2.5">
                                <InfoIcon />
                                <p className="text-sm font-normal text-[#313219]">
                                    This questionnaire is a tool for identifying psychosocial
                                </p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-[#BE735B] cursor-pointer hover:bg-[#BE735B] text-white text-sm font-medium px-4 py-2.5 rounded-md flex items-center gap-2"
                                >
                                    Send Complaint
                                    <SandDataIcon />
                                </button>
                            </div>
                        </div>

                    </form>
                </div>
                <Note />
            </div>
        </section>
    );
}