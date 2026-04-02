"use client"
import { ArrowIcon } from "@/assets/icon";
import Button from "@/components/common/button";
import Disclaimer from "@/components/common/disclaimer";
import TitlePara from "@/components/common/titlteparacomponent";
import { useState } from "react";
const ACTION_PLAN = [
    { id: 1, title: 'Increase Soluble Fiber Intake', status: 'Diet', whydescription: 'Soluble fiber helps reduce LDL (“bad”) cholesterol by binding bile acids and lowering cholesterol absorption. It also improves blood sugar control by slowing carbohydrate absorption, which can support lower HbA1c levels. Increased fiber intake promotes gut health, reduces inflammation, and supports long-term cardiometabolic health.', whodescription: 'Suggested when LDL cholesterol, total cholesterol, or HbA1c levels are elevated, indicating increased cardiovascular or metabolic risk.', whatdescription: 'This action focuses on increasing daily intake of soluble fiber from foods such as oats, legumes, fruits, and psyllium husk. Soluble fiber forms a gel-like substance in the gut that slows digestion and helps regulate cholesterol and glucose absorption. The goal is to add 10–15g of soluble fiber daily, contributing to a total fiber intake of 35–40g per day.', description: 'Add 10-15g daily soluble fiber from oats, legumes, and psyllium to help reduce LDL naturally. Target total fiber intake of 35-40g per day.', },
    { id: 2, title: 'Omega-3 Supplementation', status: 'Supplements', whydescription: 'Omega-3 fatty acids help lower triglyceride levels, reduce systemic inflammation, and support vascular health. They may also improve insulin sensitivity and reduce inflammatory markers such as hs-CRP. Omega-3s play a protective role in reducing cardiovascular disease risk.', whodescription: 'Suggested when triglycerides, inflammatory markers, or cardiovascular risk indicators are elevated.', whatdescription: 'This action recommends supplementing with omega-3 fatty acids, specifically EPA and DHA, from high-quality fish oil or algae-based supplements. A daily intake of 2–3g EPA/DHA is commonly used to support heart and metabolic health.', description: 'Consider 2-3g combined EPA/DHA daily from high-quality fish oil or algae-based to support cardiovascular health and reduce triglycerides.', },
    { id: 3, title: 'Moderate Aerobic Exercise', status: 'Exercise', whydescription: 'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whodescription: 'Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whatdescription: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', description: 'Engage in 150 minutes weekly of moderate-intensity aerobic activity. Walking, cycling  can improve and support healthy glucose metabolism.', },
    { id: 4, title: 'Consider Berberine or Metformin Discussion', status: 'Medication', whydescription: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whodescription: 'Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whatdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', description: 'Given prediabetic HbA1C, discuss with your berberine (1500mg daily) metformin may be appropriate for glucose management.', },
    { id: 5, title: 'Reduce Refined Carbohydrate Intake', status: 'Supplements', whydescription: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whodescription: 'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whatdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', description: 'Limit processed grains and added sugars. Focus on whole foods with index to stabilize blood glucose and improve HbA1C levels.', },
]
export default function ActionView() {
    const [selectedAction, setSelectedAction] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState("All");
    const STATUS_FILTERS = ["All", "Diet", "Supplements", "Exercise", "Medication"];

    const filtered = ACTION_PLAN.filter(c =>
        statusFilter === "All" || c.status === statusFilter
    );

    return (
        <section className="py-6">
            <div className="container">
                <div className="flex w-fit mb-6 items-center gap-2 bg-[#F3F4EC] p-1 rounded-xl flex-wrap">
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
                <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                    <div className="flex items-center justify-between gap-6 mb-4">
                        <TitlePara title="Action Plan" description="Evidence-based recommendations derived from your biomarker results and health profile." />
                    </div>
                    <div className="grid gap-4">
                        {filtered.map(item =>
                            <div onClick={() => setSelectedAction(item.id)} className="p-3 rounded-lg bg-white border border-[#E9EAEB] cursor-pointer hover:shadow-lg transition" key={item.id}>
                                <div className="pb-2.5 border-b border-[#E9EAEB] flex items-start md:items-center justify-between">
                                    <h4 className="text-lg font-normal text-[#0F172B] font-serif">{item.title}</h4>
                                    <span className="px-2.5 py-0.5 bg-[#ADB37D] rounded-full text-xs font-semibold text-white">{item.status}</span>
                                </div>
                                <p className="text-sm font-normal text-[#5F5F69] mt-2.5">{item.description}</p>
                            </div>
                        )}
                    </div>
                </div>
                <Disclaimer/>

                {selectedAction && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedAction(null)}>
                        <div className="bg-white rounded-lg border border-[#E4E4E7] overflow-y-auto max-h-[50vh] md:max-h-[90vh] max-w-187 w-full mx-4" onClick={(e) => e.stopPropagation()}>
                            {ACTION_PLAN.filter(item => item.id === selectedAction).map(item => (
                                <div key={item.id}>
                                    <div className="flex sticky top-0 bg-white p-6 items-start justify-between">
                                        <div className="flex md:flex-row flex-col items-start md:items-center gap-2 md:gap-6">
                                            <h2 className="text-xl text-[#1E1E23] font-normal font-serif">{item.title}</h2>
                                            <span className="px-2.5 py-0.5 bg-[#ADB37D] rounded-full text-xs font-semibold text-white">{item.status}</span>
                                        </div>
                                        <button onClick={() => setSelectedAction(null)} className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer">&times;</button>
                                    </div>
                                    <div className="border-t p-6 border-[#E3E3E3] pt-4">
                                        <div className="mb-6">
                                            <h3 className="text-sm font-semibold text-[#1E1E23] mb-2">What it is?</h3>
                                            <p className="text-sm font-normal text-[#5F5F69] leading-6">{item.whatdescription}</p>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className="text-sm font-semibold text-[#1E1E23] mb-2">Why is it helpful?</h3>
                                            <p className="text-sm font-normal text-[#5F5F69] leading-6">{item.whydescription}</p>
                                        </div>
                                        <div className="">
                                            <h3 className="text-sm font-semibold text-[#1E1E23] mb-2">Why I got this suggestion?</h3>
                                            <p className="text-sm font-normal text-[#5F5F69] leading-6">{item.whodescription}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}