"use client"

import { ArrowIcon, BloodIcon, ChatIcon, CopyIcon, GlucoseIcon, HeartIcon, ShareIcon, UploadIcon, WeightIcon, WhattsappIcon, WriterIcon } from "@/assets/icon";
import { DidImage } from "@/assets/image";
import Button from "@/components/common/button";
import TitlePara from "@/components/common/titlteparacomponent";
import { useState, useRef } from "react";
import type React from "react";
import Note from "@/components/common/note";
import BiomarkerChart from "../health/echart";
import Image from "next/image";

const CARDS = [
    { id: 1, title: "White Blood Cells (WBC)", status: "Optimal", value: "5.2", unit: "k/uL", category: "Blood health", desc: "White blood cells are part of the immune system and help fight infections.", normal: "4.5 – 11.0 k/uL", trend: [90, 75, 60, 55, 65, 50, 45], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 2, title: "LDL Cholesterol", status: "Normal", value: "142", unit: "mg/dL", category: "Heart", desc: "LDL cholesterol is known as 'bad' cholesterol. High levels can increase risk of heart disease.", normal: "< 100 mg/dL optimal", trend: [85, 70, 60, 65, 58, 62, 55], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
    { id: 3, title: "Platelet Count (PLT)", status: "High", value: "285", unit: "k/uL", category: "Blood health", desc: "Platelets help your blood clot. High or low counts can indicate various conditions.", normal: "150 – 400 k/uL", trend: [95, 88, 75, 80, 70, 65, 50], dates: ["Nov 2025", "Nov 2025", "Dec 2025", "Dec 2025", "Jan 2026", "Jan 2026", "Jan 2026"] },
   ];
export default function DashboardView() {
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
    const [selectedAction, setSelectedAction] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const didScrollRef = useRef<HTMLDivElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadedFile(file);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
        console.log('Uploaded:', { name: file.name, size: `${(file.size / 1024).toFixed(2)} KB` });
        if (fileInputRef.current) fileInputRef.current.value = '';
    };


    const handleShare = async () => {
        const shareData = {
            title: 'My Biological Age',
            text: 'My biological age is 49 - 3.1 years younger than my chronological age!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                alert('Shared to clipboard!');
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    const handleCopy = async () => {
        const copyText = 'My biological age is 49 - 3.1 years younger than my chronological age!';
        try {
            await navigator.clipboard.writeText(copyText);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.log('Error copying:', err);
        }
    };
    const [shareSuccess, setShareSuccess] = useState(false);

    const handleSharee = async () => {
        const shareData = {
            title: 'My Biological Age',
            text: 'My biological age is 49 - 3.1 years younger than my chronological age!',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                setShareSuccess(true);
                setTimeout(() => setShareSuccess(false), 2000);
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    const data = [
        { name: "Nov", value: 11, color: "#E8CFCF" },
        { name: "", value: 10, color: "#E8CFCF" },
        { name: "", value: 6, color: "#EADDBA" },
        { name: "Dec", value: 8, color: "#E8CFCF" },
        { name: "", value: 6, color: "#EADDBA" },
        { name: "", value: 8, color: "#E8CFCF" },
        { name: "Jan", value: 3, color: "#CFE4D6" },
    ];
    const progressData = [
        { id: 1, text: 'Optimal', value: 18, color: 'Optimal' },
        { id: 2, text: 'Out of Range', value: 5, color: 'Low' },
        { id: 3, text: 'Normal', value: 12, color: 'Normal' },
        { id: 4, text: 'Missing', value: 3, color: '' },
    ];

    const NOTES = [
        { id: 1, title: 'Lipid Panel Interpretation', description: 'Your LDL cholesterol reading of 142 mg/dL falls into the borderline high category. While not critically elevated, this level is associated with increased cardiovascular risk. Dietary modifications emphasizing soluble fiber, omega-3 fatty acids, and reduced saturated fat intake may help lower LDL levels naturally. Consider a follow-up lipid panel in 3 months to assess response to lifestyle interventions.' },
        { id: 2, title: 'Glucose Metabolism', description: 'Your HbA1C of 5.8% indicates prediabetes range. This is an important early indicator that requires attention to prevent progression to type 2 diabetes. Focus on low glycemic index foods, regular physical activity, and stress management. Fasting glucose and insulin resistance markers (HOMA-IR) would provide additional metabolic clarity.' },
    ]

    const FUNCATIONAL_MARKER = [
        {
            id: 1,
            icon: WeightIcon,
            text: 'Weight',
            span: '52',
            spann: 'K/uL',
            description: 'Within healthy range for height',
            normalRange: '70',
            title: 'Enter Your Weight',
            detailedInfo: 'Weight should be Kg'
        },
        {
            id: 2,
            icon: HeartIcon,
            text: 'Heart Rate',
            span: '68',
            spann: 'bpm',
            description: 'Resting Heart Rate',
            normalRange: '72',
            title: 'Resting Heart Rate',
            detailedInfo: 'bpm'
        },
        {
            id: 3,
            icon: GlucoseIcon,
            text: 'Glucose Level',
            span: '96',
            spann: 'mg/dl',
            description: 'Slightly elevated',
            normalRange: '95',
            title: 'Fasting blood glucose',
            detailedInfo: 'mg/dL'
        },
        {
            id: 4,
            icon: BloodIcon,
            text: 'Blood Pressure',
            span: '118',
            spann: '/76',
            description: 'Blood Pressure',
            normalRange: '120',
            title: 'Systolic (Top Number)',
            detailedInfo: 'mmHg'
        },
        {
            id: 5,
            icon: GlucoseIcon,
            text: 'Cholesterol',
            span: '185',
            spann: 'mg/dl',
            description: 'Optimal range',
            normalRange: '80',
            title: 'Diastolic (Bottom Number)',
            detailedInfo: 'mmHg'
        },
        {
            id: 6,
            icon: WeightIcon,
            text: 'BMI',
            span: '22.4',
            spann: '',
            description: 'Normal weight category',
            normalRange: '90',
            title: 'BMI Normal Weight',
            detailedInfo: 'BMI'
        },
    ]

    const ACTION_PLAN = [
        { id: 1, title: 'Increase Soluble Fiber Intake', span: 'Diet', whydescription: 'Soluble fiber helps reduce LDL (“bad”) cholesterol by binding bile acids and lowering cholesterol absorption. It also improves blood sugar control by slowing carbohydrate absorption, which can support lower HbA1c levels. Increased fiber intake promotes gut health, reduces inflammation, and supports long-term cardiometabolic health.', whodescription: 'Suggested when LDL cholesterol, total cholesterol, or HbA1c levels are elevated, indicating increased cardiovascular or metabolic risk.', whatdescription: 'This action focuses on increasing daily intake of soluble fiber from foods such as oats, legumes, fruits, and psyllium husk. Soluble fiber forms a gel-like substance in the gut that slows digestion and helps regulate cholesterol and glucose absorption. The goal is to add 10–15g of soluble fiber daily, contributing to a total fiber intake of 35–40g per day.', description: 'Add 10-15g daily soluble fiber from oats, legumes, and psyllium to help reduce LDL naturally. Target total fiber intake of 35-40g per day.', },
        { id: 2, title: 'Omega-3 Supplementation', span: 'Supplements', whydescription: 'Omega-3 fatty acids help lower triglyceride levels, reduce systemic inflammation, and support vascular health. They may also improve insulin sensitivity and reduce inflammatory markers such as hs-CRP. Omega-3s play a protective role in reducing cardiovascular disease risk.', whodescription: 'Suggested when triglycerides, inflammatory markers, or cardiovascular risk indicators are elevated.', whatdescription: 'This action recommends supplementing with omega-3 fatty acids, specifically EPA and DHA, from high-quality fish oil or algae-based supplements. A daily intake of 2–3g EPA/DHA is commonly used to support heart and metabolic health.', description: 'Consider 2-3g combined EPA/DHA daily from high-quality fish oil or algae-based to support cardiovascular health and reduce triglycerides.', },
        { id: 3, title: 'Moderate Aerobic Exercise', span: 'Exercise', whydescription: 'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whodescription: 'Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whatdescription: 'Corem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', description: 'Engage in 150 minutes weekly of moderate-intensity aerobic activity. Walking, cycling  can improve and support healthy glucose metabolism.', },
        { id: 4, title: 'Consider Berberine or Metformin Discussion', span: 'Medication', whydescription: 'Yorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whodescription: 'Horem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whatdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', description: 'Given prediabetic HbA1C, discuss with your berberine (1500mg daily) metformin may be appropriate for glucose management.', },
        { id: 5, title: 'Reduce Refined Carbohydrate Intake', span: 'Supplements', whydescription: 'Qorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whodescription: 'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', whatdescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur tempus urna at turpis condimentum lobortis.', description: 'Limit processed grains and added sugars. Focus on whole foods with index to stabilize blood glucose and improve HbA1C levels.', },
    ]

    const IMAGE = [
        { id: 1, image: DidImage, },
        { id: 2, image: DidImage, },
        { id: 3, image: DidImage, },
        { id: 4, image: DidImage, },
        { id: 5, image: DidImage, },
        { id: 6, image: DidImage, },
    ]

    const [statusFilter, setStatusFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Card | null>(null);

    const filtered = CARDS.filter(c => {
        const matchStatus = statusFilter === "All" ||
            (statusFilter === "Out of Range" ? (c.status === "High" || c.status === "Low") : c.status === statusFilter);
        const matchCat = categoryFilter === "All Categories" || c.category === categoryFilter;
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
        return matchStatus && matchCat && matchSearch;
    });

    const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
        Optimal: { bg: "bg-[#1CA34E]", text: "text-[#FFF]" },
        Normal: { bg: "bg-[#D39D00]", text: "text-[#FFF]" },
        High: { bg: "bg-[#D12A2A]", text: "text-[#FFF]" },
        Low: { bg: "bg-[#FEE2E2]", text: "text-[#991B1B]" },
    };

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

    return (
        <section className="py-6">
            <div className="container">
                <div>
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-1 justify-between mb-8">
                            <div>
                                <h1 className="font-serif font-normal text-4xl text-[#181D27] mb-1">Welcome, Diego</h1>
                                <p className="text-sm font-manrope font-normal text-[#535862]">Your health. Your data. Your life.</p>
                            </div>
                            <Button icon={<UploadIcon />} onClick={() => fileInputRef.current?.click()} className="bg-[#BE735B] md:w-fit w-full justify-center hover:bg-[#A86550] px-4 py-2.5" text="Upload Lab Results" />
                            <input ref={fileInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleUpload} />
                            {uploadSuccess && uploadedFile && (
                                <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-sm font-medium">{uploadedFile.name} uploaded!</span>
                                </div>
                            )}
                        </div>

                        <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                            <div className="mb-4">
                                <TitlePara title="Health Overview" description="An overall summary derived from your recent biomarkers and health indicators." />
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 grid-cols-1">
                                <div onClick={() => setSelectedCard(1)} className="p-6 rounded-lg bg-white border border-[#E9EAEB] cursor-pointer hover:shadow-lg transition">
                                    <h3 className="font-serif font-normal text-[#252613] text-6xl mb-3">57</h3>
                                    <p className="text-[#1E1E23] text-lg font-medium mb-2">Health score</p>
                                    <p className="text-sm font-normal text-[#5F5F69]">Based on your recent biomarkers & health data</p>
                                    <div className="flex items-center gap-2 mt-8">

                                        <div className="flex-1 h-3 rounded-l-full bg-gradient-to-r from-[#D26464] to-[#E5E7EB]"></div>

                                        <div className="w-[2px] h-6 bg-[#1E1E23]"></div>

                                        <div className="flex-1 h-3 rounded-r-full bg-gradient-to-r from-[#E5E7EB] to-[#86BF9B]"></div>

                                    </div>

                                    <div className="flex justify-between mt-3 text-gray-500 text-sm">
                                        <span className="text-xs text-[#8C8C96] font-normal">Low</span>
                                        <span className="text-xs text-[#8C8C96] font-normal">Optimal</span>
                                    </div>
                                </div>
                                <div onClick={() => setSelectedCard(2)} className="p-6 rounded-lg bg-white border border-[#E9EAEB] cursor-pointer hover:shadow-lg transition">
                                    <div className="flex items-center justify-between gap-6">
                                        <h3 className="font-serif font-normal text-[#252613] text-6xl mb-3">49</h3>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleShare();
                                            }}
                                            className="p-3 bg-[#4F512D] rounded-md cursor-pointer hover:bg-[#3F4125] transition"
                                        >
                                            <ShareIcon />
                                            {shareSuccess && (
                                                <span className="absolute -top-8 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    Copied!
                                                </span>
                                            )}
                                        </button>
                                    </div>
                                    <p className="text-[#1E1E23] text-lg font-medium mb-2">Biological Age</p>
                                    <p className="text-sm font-normal text-[#5F5F69]">3.1 years younger than your chronological age</p>
                                    <div className="flex items-center gap-2 mt-8">

                                        <div className="flex w-21 h-3 rounded-l-full bg-gradient-to-r from-[#86BF9B] to-[#E5E7EB]"></div>

                                        <div className="w-[2px] h-6 bg-[#1E1E23]"></div>

                                        <div className="flex-1 w-48 h-3 rounded-r-full bg-gradient-to-r from-[#E5E7EB] to-[#D26464]"></div>

                                    </div>

                                    <div className="flex justify-between mt-3 text-gray-500 text-sm">
                                        <span className="text-xs text-[#8C8C96] font-normal">Younger</span>
                                        <span className="text-xs text-[#8C8C96] font-normal">Older</span>
                                    </div>
                                </div>
                                <div onClick={() => setSelectedCard(3)} className="p-6 rounded-lg bg-white border border-[#E9EAEB] cursor-pointer hover:shadow-lg transition">
                                    <h2 className="text-lg font-normal text-[#1E1E23]">
                                        Health Snapshot
                                    </h2>
                                    <p className="text-sm text-[#5F5F69] font-normal mt-1">
                                        Biomarker status overview
                                    </p>
                                    <div className="flex h-10 rounded-xl overflow-hidden mt-6">
                                        <div className="bg-[#1CA34E] w-[50%]"></div>
                                        <div className="bg-[#D39D00] w-[30%]"></div>
                                        <div className="bg-[#D12A2A] w-[10%]"></div>
                                        <div className="bg-[#777B8B] w-[10%]"></div>
                                    </div>

                                    <div className="border-t border-[#E3E3E3] my-6"></div>

                                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                                        {progressData.map(item =>
                                            <div className="flex items-center justify-between" key={item.id}>
                                                <div className="flex items-center gap-2">
                                                    <span className={`${item.color === 'Optimal' ? 'bg-[#1CA34E]' : item.color === 'Low' ? 'bg-[#D12A2A]' : item.color === 'Normal' ? 'bg-[#D39D00]' : 'bg-[#777B8B]'} w-3 h-3 rounded-sm`}></span>
                                                    <span className="text-sm text-[#5F5F69] font-normal">{item.text}</span>
                                                </div>
                                                <span className="text-base text-[#1E1E23] font-medium">{item.value}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedCard && (
                            <div className="fixed inset-0 bg-black/50 flex items-center px-4 justify-center z-50" onClick={() => setSelectedCard(null)}>
                                <div className="bg-white rounded-lg border border-[#E4E4E7] p-6 max-w-187 w-full" onClick={(e) => e.stopPropagation()}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h2 className="text-xl text-[#1E1E23] font-normal font-serif mb-1.5">{selectedCard === 1 ? 'Health Score' : selectedCard === 2 ? 'Biological Age' : 'Health Snapshot'}</h2>
                                            <p className="text-sm text-[#5F5F69] font-normal">{selectedCard === 1 ? 'Based on your recent biomarkers & health data' : selectedCard === 2 ? 'This provides an indicator of how your body is aging.' : 'Biomarker status Overview'}</p>
                                        </div>
                                        <button onClick={() => setSelectedCard(null)} className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer">&times;</button>
                                    </div>
                                    <div className="">
                                        {selectedCard === 1 && (
                                            <div>
                                                <h3 className="font-serif font-normal text-[#252613] text-6xl mb-3">57</h3>
                                                <p className="text-[#1E1E23] text-lg font-medium mb-2">Health score</p>
                                                <div className="flex items-center gap-2 mt-8">

                                                    <div className="flex-1 h-3 rounded-l-full bg-gradient-to-r from-[#D26464] to-[#E5E7EB]"></div>

                                                    <div className="w-[2px] h-6 bg-[#1E1E23]"></div>

                                                    <div className="flex-1 h-3 rounded-r-full bg-gradient-to-r from-[#E5E7EB] to-[#86BF9B]"></div>

                                                </div>

                                                <div className="flex justify-between mt-3 text-gray-500 text-sm border-b border-[#E3E3E3] pb-6">
                                                    <span className="text-xs text-[#8C8C96] font-normal">Low</span>
                                                    <span className="text-xs text-[#8C8C96] font-normal">Optimal</span>
                                                </div>
                                                <p className="mt-6 text-sm font-normal text-[#5F5F69]">Your Health Score is calculated based on your biomarkers. The more biomarkers you get tested, and the more are in optimal ranges, the higher your score will be. Keep tracking your health to improve your score!</p>
                                            </div>
                                        )}
                                        {selectedCard === 2 && (
                                            <div>
                                                <h3 className="font-serif font-normal text-[#252613] text-6xl mb-3">49</h3>
                                                <p className="text-[#1E1E23] text-lg font-medium mb-2">Biological Age</p>

                                                <div className="flex items-center gap-2 mt-6">

                                                    <div className="flex w-21 h-3 rounded-l-full bg-gradient-to-r from-[#86BF9B] to-[#E5E7EB]"></div>

                                                    <div className="w-[2px] h-6 bg-[#1E1E23]"></div>

                                                    <div className="flex-1 w-48 h-3 rounded-r-full bg-gradient-to-r from-[#E5E7EB] to-[#D26464]"></div>

                                                </div>
                                                <div className="flex justify-between mt-3 text-gray-500 text-sm border-b border-[#E3E3E3] pb-6">
                                                    <span className="text-xs text-[#8C8C96] font-normal">Low</span>
                                                    <span className="text-xs text-[#8C8C96] font-normal">Optimal</span>
                                                </div>
                                                <p className="mt-6 text-sm font-normal text-[#5F5F69] mb-6">Your Biological Age is estimated using an algorithm that predicts biological age based on circulating blood biomarkers. This provides an indicator of how your body is aging compared to your calendar age.</p>
                                                <p className="border border-[#E5E7EB] rounded-xl p-3 text-sm font-normal text-[#5f5f69]/80 mb-6">Bortz, Jordan, Andrea Guariglia, Lucija Klaric, David Tang, Peter Ward, Michael Geer, Marc Chadeau-Hyam, Dragana Vuckovic, and Peter K. Joshi. "Biological age estimation using circulating blood biomarkers." Communications Biology 6, no. 1 (2023): 1089.</p>
                                                <div className="flex items-center gap-2 justify-end relative">
                                                    <Button onClick={handleSharee} text="Share" icon={<ShareIcon />} className="bg-[#BE735B] hover:bg-[#A86550] px-3 py-2.5" />
                                                    <Button onClick={handleCopy} text="" icon={<CopyIcon />} className=" bg-white !border !border-[#A86550] px-3 py-2.5" />
                                                    {copySuccess && (
                                                        <span className="absolute -top-8 right-0 bg-green-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                                            Copied!
                                                        </span>
                                                    )}
                                                </div>

                                            </div>
                                        )}
                                        {selectedCard === 3 && (
                                            <div>
                                                <div className="w-full h-5 flex rounded-full overflow-hidden mb-4">
                                                    <div className="bg-[#1CA34E] w-[35%]"></div>
                                                    <div className="bg-[#D39D00] w-[25%]"></div>
                                                    <div className="bg-[#D12A2A] w-[20%]"></div>
                                                    <div className="bg-[#777B8B] w-[20%]"></div>
                                                </div>

                                                <div className="flex items-center justify-between gap-8 mb-6">
                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center text-sm font-normal text-[#5F5F69] gap-2">
                                                            <span className="w-3 h-3 bg-[#1CA34E]  rounded-sm"></span>
                                                            Optimal
                                                        </div>
                                                        <span className="text-base text-[#1E1E23] font-medium">18</span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center text-sm font-normal text-[#5F5F69] gap-2">
                                                            <span className="w-3 h-3 bg-[#D39D00] rounded-sm"></span>
                                                            Normal
                                                        </div>
                                                        <span className="text-base text-[#1E1E23] font-medium">12</span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center text-sm font-normal text-[#5F5F69] gap-2">
                                                            <span className="w-3 h-3 bg-[#D12A2A] rounded-sm"></span>
                                                            Out of Range
                                                        </div>
                                                        <span className="text-base text-[#1E1E23] font-medium">5</span>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-8">
                                                        <div className="flex items-center text-sm font-normal text-[#5F5F69] gap-2">
                                                            <span className="w-3 h-3 bg-[#777B8B] rounded-sm"></span>
                                                            Missing
                                                        </div>
                                                        <span className="text-base text-[#1E1E23] font-medium">3</span>
                                                    </div>
                                                </div>

                                                <hr className="border-b border-[#E3E3E3] mb-5" />

                                                <h3 className="text-sm font-semibold text-[#1E1E23] mb-4">
                                                    Category Overview
                                                </h3>

                                                <div className="grid grid-cols-2 gap-5">

                                                    {[
                                                        { name: "Heart", score: "0/10" },
                                                        { name: "Blood Health", score: "5/10" },
                                                        { name: "Kidney Health", score: "0/8" },
                                                        { name: "Hormonal Health", score: "0/10" },
                                                        { name: "Metabolic Health", score: "0/5" },
                                                        { name: "Nutrients", score: "0/6" },
                                                        { name: "Inflammation", score: "1/5" },
                                                        { name: "Liver Health", score: "0/9" },
                                                        { name: "Cancer Screening", score: "0/2" },
                                                    ].map((item, i) => (

                                                        <div key={i}>

                                                            <div className="flex justify-between text-base text-[#0F172B] mb-2">
                                                                <span>{item.name}</span>
                                                                <span>{item.score}</span>
                                                            </div>

                                                            <div className="h-3 flex rounded-full overflow-hidden">
                                                                <div className="bg-[#1CA34E] w-[55%]"></div>
                                                                <div className="bg-[#D39D00] w-[15%]"></div>
                                                                <div className="bg-[#D12A2A] w-[15%]"></div>
                                                                <div className="bg-[#777B8B] w-[15%]"></div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                        <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 md:gap-6 mb-4">
                            <TitlePara title="Key Biomarkers" description="Individual laboratory values with clinical reference ranges and recent trends." />
                            <Button text="View More" className="bg-[#BE735B] hover:bg-[#A86550] px-3 py-2.5" icon={<ArrowIcon />} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {filtered.map(card => (
                                <HealthCard key={card.id} card={card} onClick={() => setSelected(card)} />
                            ))}
                            {filtered.length === 0 && (
                                <p className="col-span-3 text-center text-sm text-[#535862] py-12">No results found.</p>
                            )}
                        </div>

                    </div>

                    <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                        <div className="mb-4">
                            <TitlePara title="Specialists Notes" description="Expert interpretation of recent health metrics and lab data." />
                        </div>
                        <div className="p-6 rounded-lg bg-white border border-[#E9EAEB] grid gap-6">
                            {NOTES.map(item =>
                                <div key={item.id}>
                                    <h4 className="text-lg text-black font-normal font-serif mb-2">{item.title}</h4>
                                    <p className="text-[rgba(95,95,105,0.8)] font-normal leading-6 text-base">{item.description}</p>
                                </div>
                            )}
                            <div>
                                <h4 className="text-lg text-black font-normal font-serif mb-2">Medical Disclaimer:</h4>
                                <p className="text-[rgba(95,95,105,0.8)] mb-2 p-3 border border-[#E5E7EB] rounded-xl font-normal leading-6 text-base">This information is for educational purposes only and does not constitute medical advice. Always consult with a qualified healthcare provider before making decisions about your health or treatment.</p>
                                <p className="text-[#5F5F69] text-sm font-normal">Reviewed by Olyra Intelligence • Last updated: October 15, 2025</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                        <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 md:gap-6 mb-4">
                            <TitlePara title="Functional Markers" description="Recent functional health measurements." />
                            <Button text="View More" className="bg-[#BE735B] hover:bg-[#A86550] px-3 py-2.5" icon={<ArrowIcon />} />
                        </div>
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                            {FUNCATIONAL_MARKER.map(item =>
                                <div onClick={() => setSelectedMarker(item.id)} className="p-6 rounded-lg bg-white border border-[#E9EAEB] cursor-pointer hover:shadow-lg transition" key={item.id}>
                                    <div className="flex items-center justify-between gap-3 mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#E5E7D4] rounded-[80px] w-fit">
                                                <item.icon />
                                            </div>
                                            <p className="text-[#1E1E23] text-sm font-medium">{item.text}</p>
                                        </div>
                                        <WriterIcon />
                                    </div>
                                    <p className="text-[#252613] text-5xl font-normal font-serif pb-4 border-b border-[#E3E3E3]">{item.span}<span className="text-[#252613] text-xl font-normal">{item.spann}</span></p>
                                    <p className="text-base text-[#5F5F69] font-normal mt-4">{item.description}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {selectedMarker && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedMarker(null)}>
                            <div className="bg-white rounded-lg border border-[#E4E4E7] p-6 max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
                                {FUNCATIONAL_MARKER.filter(item => item.id === selectedMarker).map(item => (
                                    <div key={item.id}>
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#E5E7D4] rounded-[80px] w-fit">
                                                    <item.icon />
                                                </div>
                                                <h2 className="text-xl text-[#1E1E23] font-normal font-serif">{item.text}</h2>
                                            </div>
                                            <button onClick={() => setSelectedMarker(null)} className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer">&times;</button>
                                        </div>
                                        <div className="mb-2">
                                            <h3 className="text-sm font-semibold text-[#1E1E23] mb-2">{item.title}</h3>
                                            <input
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder={item.normalRange}
                                                className="text-sm text-[#71717A] font-normal px-3 w-full py-2.5 border border-[#E4E4E7] rounded-md"
                                            />
                                        </div>
                                        <p className="text-xs text-[#71717A] font-normal border-b border-[#E3E3E3] pb-6">{item.detailedInfo}</p>
                                        <div className="flex items-center gap-2 justify-end mt-6">
                                            <Button
                                                onClick={() => {
                                                    setInputValue('');
                                                    setSelectedMarker(null);
                                                }}
                                                text="Cancel"
                                                className="!border !border-[#BE735B] px-4 py-2.5 !text-[#BE735B] bg-white"
                                            />
                                            <Button
                                                onClick={() => {
                                                    if (inputValue) {
                                                        console.log('Saved Data:', {
                                                            marker: item.text,
                                                            value: inputValue,
                                                            unit: item.detailedInfo,
                                                            timestamp: new Date().toISOString()
                                                        });
                                                        setInputValue('');
                                                        setSelectedMarker(null);
                                                    }
                                                }}
                                                text="Save"
                                                className="!border !border-[#BE735B] px-4 py-2.5 bg-[#BE735B]"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                    <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 md:gap-6 mb-4">
                        <TitlePara title="Action Plan" description="Evidence-based recommendations derived from your biomarker results and health profile." />
                        <Button text="View More" className="bg-[#BE735B] hover:bg-[#A86550] px-3 py-2.5" icon={<ArrowIcon />} />
                    </div>
                    <div className="grid gap-4">
                        {ACTION_PLAN.map(item =>
                            <div onClick={() => setSelectedAction(item.id)} className="p-3 rounded-lg bg-white border border-[#E9EAEB] cursor-pointer hover:shadow-lg transition" key={item.id}>
                                <div className="pb-2.5 border-b border-[#E9EAEB] flex items-center justify-between">
                                    <h4 className="text-lg font-normal text-[#0F172B] font-serif">{item.title}</h4>
                                    <span className="px-2.5 py-0.5 bg-[#ADB37D] rounded-full text-xs font-semibold text-white">{item.span}</span>
                                </div>
                                <p className="text-sm font-normal text-[#5F5F69] mt-2.5">{item.description}</p>
                            </div>
                        )}
                    </div>
                </div>

                {selectedAction && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedAction(null)}>
                        <div className="bg-white rounded-lg border border-[#E4E4E7] p-6 max-w-187 w-full mx-4" onClick={(e) => e.stopPropagation()}>
                            {ACTION_PLAN.filter(item => item.id === selectedAction).map(item => (
                                <div key={item.id}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-6">
                                            <h2 className="text-xl text-[#1E1E23] font-normal font-serif">{item.title}</h2>
                                            <span className="px-2.5 py-0.5 bg-[#ADB37D] rounded-full text-xs font-semibold text-white">{item.span}</span>
                                        </div>
                                        <button onClick={() => setSelectedAction(null)} className="text-gray-500 hover:text-gray-700 text-2xl cursor-pointer">&times;</button>
                                    </div>
                                    <div className="border-t border-[#E3E3E3] pt-4">
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

                <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                    <div className="flex md:flex-row flex-col items-start justify-between md:items-center gap-4">
                        <TitlePara title="Help Centre" description="Ask Questions, clear doubts or get guidance, with expert available 24/7" />
                        <div className="flex md:flex-row flex-col md:w-fit w-full items-start md:items-center gap-4">
                            <Button text="Chat with a specialist" className="bg-[#BE735B] md:w-fit w-full justify-center hover:bg-[#A86550] px-4 py-2.5" icon={<WhattsappIcon />} onClick={() => window.open('https://wa.me/+1234567890?text=Hello%2C%20I%20need%20help%20with%20my%20health%20data', '_blank')} />
                            <Button text="Chat with Olyra Intelligence" className="bg-[#4F512D] md:w-fit w-full justify-center hover:bg-[#3F4125] px-4 py-2.5" icon={<ChatIcon />} onClick={() => window.location.href = '/chatbot'} />
                        </div>
                    </div>
                </div>

                <div className="bp-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                    <div className="mb-4">
                        <TitlePara title="Did You Know?" description="Additional clinical context related to your laboratory results." />
                    </div>
                    <div className="relative">
                        <button
                            onClick={() => {
                                const el = didScrollRef.current;
                                if (!el) return;
                                const cardW = el.querySelector('div')?.offsetWidth ?? el.offsetWidth;
                                el.scrollBy({ left: -cardW, behavior: "smooth" });
                            }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white border border-[#E9EAEB] rounded-full w-9 h-9 flex items-center justify-center shadow cursor-pointer hover:bg-[#F5F5F5] transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#4F512D"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <div
                            ref={didScrollRef}
                            className="flex overflow-x-auto gap-4"
                            style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollSnapType: "x mandatory" } as React.CSSProperties}
                        >
                            {IMAGE.map(item =>
                                <div
                                    key={item.id}
                                    className="p-3 rounded-lg border border-[#E9EAEB] bg-white flex-shrink-0 w-full md:w-[calc(33.333%-11px)]"
                                    style={{ scrollSnapAlign: "start" }}
                                >
                                    <Image src={item.image.src} className="w-full h-auto" alt="did-image" width={320} height={372} />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => {
                                const el = didScrollRef.current;
                                if (!el) return;
                                const cardW = el.querySelector('div')?.offsetWidth ?? el.offsetWidth;
                                el.scrollBy({ left: cardW, behavior: "smooth" });
                            }}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white border border-[#E9EAEB] rounded-full w-9 h-9 flex items-center justify-center shadow cursor-pointer hover:bg-[#F5F5F5] transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#4F512D"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
                <Note />
            </div>
            {selected && <CardPopup card={selected} onClose={() => setSelected(null)} />}

        </section>
    )
}
