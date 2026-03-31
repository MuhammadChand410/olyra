"use client"
import Note from "@/components/common/note";
import { useState, useRef } from "react";
import type React from "react";
import BiomarkerChart from "./echart";

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
    Optimal: { bg: "bg-[#1CA34E]", text: "text-[#FFF]" },
    Normal: { bg: "bg-[#D39D00]", text: "text-[#FFF]" },
    High: { bg: "bg-[#D12A2A]", text: "text-[#FFF]" },
    Low: { bg: "bg-[#FEE2E2]", text: "text-[#991B1B]" },
};

const CARDS = [
    { id: 1, title: "White Blood Cells (WBC)", status: "Optimal", value: "5.2", unit: "k/uL", category: "Blood health", desc: "White blood cells are part of the immune system and help fight infections.", normal: "4.5 – 11.0 k/uL", trend: [90, 75, 60, 55, 65, 50, 45], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 2, title: "LDL Cholesterol", status: "Normal", value: "142", unit: "mg/dL", category: "Heart", desc: "LDL cholesterol is known as 'bad' cholesterol. High levels can increase risk of heart disease.", normal: "< 100 mg/dL optimal", trend: [85, 70, 60, 65, 58, 62, 55], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 3, title: "Platelet Count (PLT)", status: "High", value: "285", unit: "k/uL", category: "Blood health", desc: "Platelets help your blood clot. High or low counts can indicate various conditions.", normal: "150 – 400 k/uL", trend: [95, 88, 75, 80, 70, 65, 50], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 4, title: "White Blood Cells (WBC)", status: "Optimal", value: "5.2", unit: "k/uL", category: "Inflammation", desc: "White blood cells are part of the immune system and help fight infections.", normal: "4.5 – 11.0 k/uL", trend: [90, 75, 60, 55, 65, 50, 45], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 5, title: "LDL Cholesterol", status: "Normal", value: "142", unit: "mg/dL", category: "Heart", desc: "LDL cholesterol is known as 'bad' cholesterol. High levels can increase risk of heart disease.", normal: "< 100 mg/dL optimal", trend: [85, 70, 60, 65, 58, 62, 55], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 6, title: "Platelet Count (PLT)", status: "High", value: "285", unit: "k/uL", category: "Cancer Screening", desc: "Platelets help your blood clot. High or low counts can indicate various conditions.", normal: "150 – 400 k/uL", trend: [95, 88, 75, 80, 70, 65, 50], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 7, title: "White Blood Cells (WBC)", status: "Optimal", value: "5.2", unit: "k/uL", category: "Blood health", desc: "White blood cells are part of the immune system and help fight infections.", normal: "4.5 – 11.0 k/uL", trend: [90, 75, 60, 55, 65, 50, 45], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 8, title: "LDL Cholesterol", status: "Normal", value: "142", unit: "mg/dL", category: "Hormonal Health", desc: "LDL cholesterol is known as 'bad' cholesterol. High levels can increase risk of heart disease.", normal: "< 100 mg/dL optimal", trend: [85, 70, 60, 65, 58, 62, 55], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 9, title: "Platelet Count (PLT)", status: "High", value: "285", unit: "k/uL", category: "Kidney Health", desc: "Platelets help your blood clot. High or low counts can indicate various conditions.", normal: "150 – 400 k/uL", trend: [95, 88, 75, 80, 70, 65, 50], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
];

const STATUS_FILTERS = ["All", "Optimal", "Normal", "Out of Range", "Missing"];
const CATEGORIES = ["All Categories", "Inflammation", "Blood health", "Cancer Screening", "Heart", "Hormonal Health", "Kidney Health", "Liver Health", "Nutrients"];

type Card = typeof CARDS[0];

const DEFAULT_RANGES = {
    min: 37,
    optimalMin: 37,
    optimalMax: 55,
    normalMin: 55,
    normalMax: 80,
    max: 110,
};

function MiniChart({ trend, status, dates }: { trend: number[]; status: string; dates: string[] }) {
    const echartsStatus = status.toLowerCase() as "optimal" | "normal" | "high" | "missing";
    const chartData = trend.map((value, i) => ({ date: dates[i] ?? "", value }));
    return (
        <BiomarkerChart
            unit=""
            status={echartsStatus}
            data={chartData}
            ranges={DEFAULT_RANGES}
        />
    );
}

function CardPopup({ card, onClose }: { card: Card; onClose: () => void }) {
    const s = STATUS_COLORS[card.status] ?? STATUS_COLORS.Normal;
    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-white rounded-lg border border-[#E9EAEB] p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-[#181D27]">{card.title}</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{card.status}</span>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl cursor-pointer">&times;</button>
                </div>
                <div className="flex items-end gap-1 mb-1">
                    <span className="text-4xl font-serif font-light text-[#181D27]">{card.value}</span>
                    <span className="text-sm text-[#535862] mb-1">{card.unit}</span>
                </div>
                <p className="text-xs text-[#535862] mb-4">Normal range: <span className="font-medium text-[#181D27]">{card.normal}</span></p>
                <div className="mb-4">
                    <MiniChart trend={card.trend} status={card.status} dates={card.dates} />
                </div>
                <div className="bg-[#F9F9F9] rounded-lg p-3 mb-4">
                    <p className="text-xs text-[#535862] leading-relaxed">{card.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#535862]">Category:</span>
                    <span className="text-xs font-medium text-[#181D27]">{card.category}</span>
                </div>
            </div>
        </div>
    );
}

function HealthCard({ card, onClick }: { card: Card; onClick: () => void }) {
    const s = STATUS_COLORS[card.status] ?? STATUS_COLORS.Normal;
    return (
        <div onClick={onClick} className="bg-white rounded-lg border border-[#E9EAEB] p-4 cursor-pointer hover:shadow-md transition">
            <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[#181D27]">{card.title}</span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${s.bg} ${s.text}`}>{card.status}</span>
            </div>
            <div className="flex items-end gap-1 mb-2">
                <span className="text-3xl font-serif font-light text-[#181D27]">{card.value}</span>
                <span className="text-xs text-[#535862] mb-1">{card.unit}</span>
            </div>
            <MiniChart trend={card.trend} status={card.status} dates={card.dates} />
        </div>
    );
}

export default function HealthView() {
    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Card | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    };

    const filtered = CARDS.filter(c => {
        const matchStatus = statusFilter === "All" ||
            (statusFilter === "Out of Range" ? (c.status === "High" || c.status === "Low") : c.status === statusFilter);
        const matchCat = categoryFilter === "All Categories" || c.category === categoryFilter;
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchCat && matchSearch;
    });

    return (
        <section className="py-6">
            <div className="container">
                <h1 className="font-serif font-normal text-3xl text-[#181D27] mb-1">Health Insights</h1>
                <p className="text-xs text-[#535862] mb-5">View your lab results by category and level of attention needed.</p>

                <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                    <div className="flex items-center gap-2 bg-[#F3F4EC] p-1 rounded-xl flex-wrap">
                        {STATUS_FILTERS.map(f => (
                            <button
                                key={f}
                                onClick={() => setStatusFilter(f)}
                                className={`px-3 py-2.5 rounded-lg text-sm font-normal transition cursor-pointer ${statusFilter === f ? "bg-[#4F512D] text-white border-[#4F512D]" : "text-[#252613]"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 px-3 py-2.5 w-80 border border-[#E9EAEB] rounded-md bg-white">

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M14.0001 14L11.1335 11.1333M12.6667 7.33333C12.6667 10.2789 10.2789 12.6667 7.33333 12.6667C4.38781 12.6667 2 10.2789 2 7.33333C2 4.38781 4.38781 2 7.33333 2C10.2789 2 12.6667 4.38781 12.6667 7.33333Z" stroke="#71717A" stroke-width="1.33" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="text-sm font-normal text-[#71717A] outline-none"
                        />
                    </div>
                </div>
                <div className="border mb-6 border-[#E9EAEB] shadow-sm p-4 bg-[#F5F5F5] rounded-xl">

                    <div className="flex items-center gap-2 mb-6">
                        <button onClick={() => scroll("left")} className="flex-shrink-0 cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M17.5614 21.7794C17.8077 22.0212 18.2034 22.0176 18.4453 21.7713C18.6871 21.525 18.6835 21.1293 18.4373 20.8875L17.9993 21.3334L17.5614 21.7794ZM18.4373 11.1127C18.6835 10.8708 18.6871 10.4751 18.4453 10.2288C18.2034 9.98255 17.8077 9.97896 17.5614 10.2208L17.9993 10.6667L18.4373 11.1127ZM29.3327 16.0001H28.7077C28.7077 23.0187 23.018 28.7084 15.9993 28.7084V29.3334V29.9584C23.7083 29.9584 29.9577 23.7091 29.9577 16.0001H29.3327ZM15.9993 29.3334V28.7084C8.98073 28.7084 3.29102 23.0187 3.29102 16.0001H2.66602H2.04102C2.04102 23.7091 8.29037 29.9584 15.9993 29.9584V29.3334ZM2.66602 16.0001H3.29102C3.29102 8.98146 8.98073 3.29175 15.9993 3.29175V2.66675V2.04175C8.29037 2.04175 2.04102 8.29111 2.04102 16.0001H2.66602ZM15.9993 2.66675V3.29175C23.018 3.29175 28.7077 8.98146 28.7077 16.0001H29.3327H29.9577C29.9577 8.29111 23.7083 2.04175 15.9993 2.04175V2.66675ZM17.9993 21.3334C18.4373 20.8875 18.4373 20.8875 18.4373 20.8875C18.4373 20.8875 18.4373 20.8875 18.4372 20.8875C18.4372 20.8874 18.437 20.8873 18.4368 20.8871C18.4365 20.8867 18.4358 20.8861 18.435 20.8852C18.4333 20.8836 18.4306 20.8809 18.4271 20.8774C18.4199 20.8704 18.4092 20.8597 18.395 20.8456C18.3666 20.8174 18.3246 20.7755 18.271 20.7215C18.1637 20.6134 18.0098 20.457 17.825 20.2646C17.4548 19.8794 16.9628 19.353 16.4723 18.7852C15.9796 18.2148 15.4991 17.6149 15.1453 17.081C14.9683 16.8138 14.8314 16.5757 14.7407 16.3752C14.6451 16.1637 14.6243 16.0445 14.6243 16.0001H13.9993H13.3743C13.3743 16.3069 13.4786 16.6179 13.6017 16.8902C13.7298 17.1735 13.9054 17.4729 14.1034 17.7715C14.4996 18.3694 15.0191 19.0151 15.5264 19.6023C16.0359 20.1921 16.5439 20.7356 16.9237 21.1308C17.1139 21.3287 17.2725 21.49 17.384 21.6023C17.4397 21.6584 17.4837 21.7023 17.5139 21.7323C17.529 21.7473 17.5407 21.7589 17.5487 21.7668C17.5527 21.7707 17.5558 21.7738 17.5579 21.7759C17.559 21.7769 17.5598 21.7777 17.5604 21.7783C17.5607 21.7786 17.5609 21.7788 17.5611 21.779C17.5612 21.7791 17.5613 21.7792 17.5613 21.7792C17.5614 21.7793 17.5614 21.7794 17.9993 21.3334ZM13.9993 16.0001H14.6243C14.6243 15.9556 14.6451 15.8364 14.7407 15.6249C14.8314 15.4244 14.9683 15.1863 15.1453 14.9191C15.4991 14.3853 15.9796 13.7854 16.4723 13.215C16.9628 12.6471 17.4548 12.1207 17.825 11.7355C18.0098 11.5432 18.1637 11.3867 18.271 11.2787C18.3246 11.2246 18.3666 11.1827 18.395 11.1545C18.4092 11.1404 18.4199 11.1298 18.4271 11.1227C18.4306 11.1192 18.4333 11.1166 18.435 11.1149C18.4358 11.1141 18.4365 11.1135 18.4368 11.1131C18.437 11.1129 18.4372 11.1128 18.4372 11.1127C18.4373 11.1127 18.4373 11.1127 18.4373 11.1127C18.4373 11.1127 18.4373 11.1127 17.9993 10.6667C17.5614 10.2208 17.5614 10.2209 17.5613 10.2209C17.5613 10.221 17.5612 10.2211 17.5611 10.2211C17.5609 10.2213 17.5607 10.2215 17.5604 10.2218C17.5598 10.2224 17.559 10.2232 17.5579 10.2243C17.5558 10.2264 17.5527 10.2294 17.5487 10.2334C17.5407 10.2413 17.529 10.2529 17.5139 10.2679C17.4837 10.2979 17.4397 10.3418 17.384 10.3979C17.2725 10.5101 17.1139 10.6715 16.9237 10.8694C16.5439 11.2646 16.0359 11.808 15.5264 12.3979C15.0191 12.9851 14.4996 13.6307 14.1034 14.2286C13.9054 14.5273 13.7298 14.8266 13.6017 15.1099C13.4786 15.3822 13.3743 15.6932 13.3743 16.0001H13.9993Z" fill="#4F512D" />
                            </svg>
                              </button>
                        <div ref={scrollRef} className="flex items-center gap-1 flex-1 overflow-hidden" style={{ overflowX: "auto", scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`flex-shrink-0 px-3 py-2 text-sm  font-medium transition cursor-pointer
                                           ${categoryFilter === cat
                                    ? "underline text-[#4F512D] decoration-2 underline-offset-8"
                                    : "text-[#252613]"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                        </div>
                        <button onClick={() => scroll("right")} className="flex-shrink-0 cursor-pointer">
                             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M14.4373 10.2208C14.191 9.97896 13.7953 9.98255 13.5534 10.2288C13.3116 10.4751 13.3152 10.8708 13.5614 11.1127L13.9993 10.6667L14.4373 10.2208ZM13.5614 20.8875C13.3152 21.1293 13.3116 21.525 13.5534 21.7713C13.7953 22.0176 14.191 22.0212 14.4373 21.7794L13.9993 21.3334L13.5614 20.8875ZM29.3327 16.0001H28.7077C28.7077 23.0187 23.018 28.7084 15.9993 28.7084V29.3334V29.9584C23.7083 29.9584 29.9577 23.7091 29.9577 16.0001H29.3327ZM15.9993 29.3334V28.7084C8.98073 28.7084 3.29102 23.0187 3.29102 16.0001H2.66602H2.04102C2.04102 23.7091 8.29037 29.9584 15.9993 29.9584V29.3334ZM2.66602 16.0001H3.29102C3.29102 8.98146 8.98073 3.29175 15.9993 3.29175V2.66675V2.04175C8.29037 2.04175 2.04102 8.29111 2.04102 16.0001H2.66602ZM15.9993 2.66675V3.29175C23.018 3.29175 28.7077 8.98146 28.7077 16.0001H29.3327H29.9577C29.9577 8.29111 23.7083 2.04175 15.9993 2.04175V2.66675ZM13.9993 10.6667C13.5614 11.1127 13.5614 11.1127 13.5614 11.1127C13.5614 11.1127 13.5614 11.1127 13.5615 11.1127C13.5615 11.1128 13.5617 11.1129 13.5619 11.1131C13.5622 11.1135 13.5629 11.1141 13.5637 11.1149C13.5654 11.1166 13.5681 11.1192 13.5716 11.1227C13.5788 11.1298 13.5895 11.1404 13.6037 11.1545C13.6321 11.1827 13.6741 11.2246 13.7277 11.2787C13.835 11.3867 13.9889 11.5432 14.1737 11.7355C14.5439 12.1207 15.0359 12.6471 15.5264 13.215C16.0191 13.7854 16.4996 14.3853 16.8534 14.9191C17.0304 15.1863 17.1673 15.4244 17.258 15.6249C17.3536 15.8364 17.3743 15.9556 17.3743 16.0001H17.9993H18.6243C18.6243 15.6932 18.5201 15.3822 18.397 15.1099C18.2689 14.8266 18.0933 14.5273 17.8953 14.2286C17.4991 13.6307 16.9796 12.9851 16.4723 12.3979C15.9628 11.808 15.4548 11.2646 15.075 10.8694C14.8848 10.6715 14.7262 10.5101 14.6147 10.3979C14.559 10.3418 14.515 10.2979 14.4848 10.2679C14.4697 10.2529 14.458 10.2413 14.45 10.2334C14.446 10.2294 14.4429 10.2264 14.4408 10.2243C14.4397 10.2232 14.4389 10.2224 14.4383 10.2218C14.438 10.2215 14.4378 10.2213 14.4376 10.2211C14.4375 10.2211 14.4374 10.221 14.4374 10.2209C14.4373 10.2209 14.4373 10.2208 13.9993 10.6667ZM17.9993 16.0001H17.3743C17.3743 16.0445 17.3536 16.1637 17.258 16.3752C17.1673 16.5757 17.0304 16.8138 16.8534 17.081C16.4996 17.6149 16.0191 18.2148 15.5264 18.7852C15.0359 19.353 14.5439 19.8794 14.1737 20.2646C13.9889 20.457 13.835 20.6134 13.7277 20.7215C13.6741 20.7755 13.6321 20.8174 13.6037 20.8456C13.5895 20.8597 13.5788 20.8704 13.5716 20.8774C13.5681 20.8809 13.5654 20.8836 13.5637 20.8852C13.5629 20.8861 13.5622 20.8867 13.5619 20.8871C13.5617 20.8873 13.5615 20.8874 13.5615 20.8875C13.5614 20.8875 13.5614 20.8875 13.5614 20.8875C13.5614 20.8875 13.5614 20.8875 13.9993 21.3334C14.4373 21.7794 14.4373 21.7793 14.4374 21.7792C14.4374 21.7792 14.4375 21.7791 14.4376 21.779C14.4378 21.7788 14.438 21.7786 14.4383 21.7783C14.4389 21.7777 14.4397 21.7769 14.4408 21.7759C14.4429 21.7738 14.446 21.7707 14.45 21.7668C14.458 21.7589 14.4697 21.7473 14.4848 21.7323C14.515 21.7023 14.559 21.6584 14.6147 21.6023C14.7262 21.49 14.8848 21.3287 15.075 21.1308C15.4548 20.7356 15.9628 20.1921 16.4723 19.6023C16.9796 19.0151 17.4991 18.3694 17.8953 17.7715C18.0933 17.4729 18.2689 17.1735 18.397 16.8902C18.5201 16.6179 18.6243 16.3069 18.6243 16.0001H17.9993Z" fill="#4F512D" />
                            </svg>
                        </button>
                    </div>

                    {/* Cards grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {filtered.map(card => (
                            <HealthCard key={card.id} card={card} onClick={() => setSelected(card)} />
                        ))}
                        {filtered.length === 0 && (
                            <p className="col-span-3 text-center text-sm text-[#535862] py-12">No results found.</p>
                        )}
                    </div>
                </div>
                    <Note/>
            </div>

            {selected && <CardPopup card={selected} onClose={() => setSelected(null)} />}
        </section>
    );
}
