"use client"

import { useState, useRef } from "react";
import Link from "next/link";
import { BackArrowIcon, DeleteIcon, DropdownIcon, NextIcon, PrevIcon, UploadedIcon } from "@/assets/icon";
import Note from "@/components/common/note";

interface LabValue {
    name: string;
    value: string;
}

interface PDFFile {
    id: number;
    name: string;
    clinic: string;
    doctor: string;
    patient: string;
    reportDate: string;
    uploadedId: string;
    uploaded: string;
    size: string;
    status: string;
    labValues: LabValue[];
    expanded: boolean;
}

const LAB_PAGES = [
    [
        { name: 'TC', value: 'Missing' },
        { name: 'LDL', value: 'Missing' },
        { name: 'HDL', value: 'Missing' },
        { name: 'HDL', value: 'Missing' },
        { name: 'TG', value: 'Missing' },
        { name: 'CLDL', value: 'Missing' },
        { name: 'ApoB', value: 'Missing' },
        { name: 'Lpa', value: 'Missing' },
    ],

    [
        { name: 'TG', value: 'Missing' },
        { name: 'CLDL', value: 'Missing' },
        { name: 'ApoB', value: 'Missing' },
        { name: 'Lpa', value: 'Missing' },
        { name: 'TC', value: 'Missing' },
        { name: 'LDL', value: 'Missing' },
        { name: 'HDL', value: 'Missing' },
        { name: 'HDL', value: 'Missing' },
    ],

    [
        { name: 'TC', value: 'Missing' },
        { name: 'LDL', value: 'Missing' },
        { name: 'HDL', value: 'Missing' },
        { name: 'HDL', value: 'Missing' },
        { name: 'TG', value: 'Missing' },
        { name: 'CLDL', value: 'Missing' },
        { name: 'ApoB', value: 'Missing' },
        { name: 'Lpa', value: 'Missing' },
    ],
];

const INITIAL_PDFS: PDFFile[] = [
    {
        id: 1, name: 'Name.PDF', clinic: 'Crystal Data Inc.', doctor: 'Dr. Sample',
        patient: 'Mr. Sample User', reportDate: '2026-08-12', uploadedId: 'Dorem ipsum dolor sit',
        uploaded: 'Jan 26, 2026 - 06:01 PM', size: '3.26 KB', status: 'Processed',
        labValues: [...LAB_PAGES[0], ...LAB_PAGES[1]], expanded: true,
    },
    {
        id: 2, name: 'Name.PDF', clinic: 'Crystal Data Inc.', doctor: 'Dr. Sample',
        patient: 'Mr. Sample User', reportDate: '2026-08-12', uploadedId: 'Dorem ipsum dolor sit',
        uploaded: 'Jan 26, 2026 - 06:01 PM', size: '3.26 KB', status: 'Processed',
        labValues: [...LAB_PAGES[0], ...LAB_PAGES[1]], expanded: false,
    },
    {
        id: 3, name: 'Name.PDF', clinic: 'Crystal Data Inc.', doctor: 'Dr. Sample',
        patient: 'Mr. Sample User', reportDate: '2026-08-12', uploadedId: 'Dorem ipsum dolor sit',
        uploaded: 'Jan 26, 2026 - 06:01 PM', size: '3.26 KB', status: 'Processed',
        labValues: [...LAB_PAGES[0], ...LAB_PAGES[1]], expanded: false,
    },
    {
        id: 4, name: 'Name.PDF', clinic: 'Crystal Data Inc.', doctor: 'Dr. Sample',
        patient: 'Mr. Sample User', reportDate: '2026-08-12', uploadedId: 'Dorem ipsum dolor sit',
        uploaded: 'Jan 26, 2026 - 06:01 PM', size: '3.26 KB', status: 'Processed',
        labValues: [...LAB_PAGES[0], ...LAB_PAGES[1]], expanded: false,
    },
];

export default function UploadsView() {
    const [pdfs, setPdfs] = useState<PDFFile[]>(INITIAL_PDFS);
    const [labPage, setLabPage] = useState<Record<number, number>>({ 1: 0 });
    const fileRef = useRef<HTMLInputElement>(null);

    const toggleExpand = (id: number) => {
        setPdfs(prev => prev.map(p => p.id === id ? { ...p, expanded: !p.expanded } : p));
    };

    const deletePdf = (id: number) => {
        setPdfs(prev => prev.filter(p => p.id !== id));
    };

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const newPdf: PDFFile = {
            id: Date.now(), name: file.name, clinic: 'New Clinic', doctor: 'Dr. New',
            patient: 'New Patient', reportDate: new Date().toISOString().split('T')[0],
            uploadedId: 'New ID', uploaded: new Date().toLocaleString(),
            size: `${(file.size / 1024).toFixed(2)} KB`, status: 'Processed',
            labValues: [...LAB_PAGES[0], ...LAB_PAGES[1]], expanded: true,
        };
        setPdfs(prev => [newPdf, ...prev]);
    };

    const downloadPdf = (pdf: PDFFile) => {
        const content = `
PDF Report: ${pdf.name}
========================
Clinic: ${pdf.clinic}
Doctor: ${pdf.doctor}
Patient: ${pdf.patient}
Report Date: ${pdf.reportDate}
ID: ${pdf.uploadedId}
Uploaded: ${pdf.uploaded}
Size: ${pdf.size}
Status: ${pdf.status}

Lab Values:
-----------
${[...LAB_PAGES[0], ...LAB_PAGES[1]].map(l => `${l.name}: ${l.value}`).join('\n')}
        `.trim();

        const blob = new Blob([content], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = pdf.name.endsWith('.pdf') ? pdf.name : `${pdf.name}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getLabPage = (id: number) => labPage[id] ?? 0;

    return (
        <section className="px-0 py-6 md:px-6">
            <div className="container">
                <div className="flex items-center gap-2.5 mb-1">
                    <Link href="/profile" className="text-[#535862] ml-0 md:-ml-9 hover:text-[#181D27]">
                        <BackArrowIcon />
                    </Link>
                    <h1 className="font-serif font-normal text-4xl text-[#181D27]">My Uploads</h1>
                </div>
                <p className="text-sm font-normal text-[#535862] mb-6">Manage your uploaded PDF files and view extracted lab values</p>

                <div className="p-4 bg-[#F5F5F5] border border-[#E9EAEB] rounded-xl mb-6">
                    <div className="bg-white rounded-xl border border-[#E9EAEB] px-5 py-4 flex items-center justify-between">
                        <span className="text-xl font-semibold text-[#181D27]">Upload New PDF</span>
                        <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 p-2 border border-[#BE735B] text-[#BE735B] text-sm font-medium rounded-md hover:bg-orange-50 transition cursor-pointer">
                            <UploadedIcon />
                            Upload
                        </button>
                        <input ref={fileRef} type="file" accept=".pdf" className="hidden" onChange={handleUpload} />
                    </div>
                </div>

                <div className="bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] p-4 mb-6">
                    <h2 className="text-xl font-semibold text-[#181D27] mb-0.5">Uploaded PDF's</h2>
                    <p className="text-sm text-[#414651] font-normal mb-4">Below are the PDF's that are uploaded</p>

                    <div className="space-y-3">
                        {pdfs.map(pdf => (
                            <div key={pdf.id} className="bg-white rounded-xl p-4 border border-[#E9EAEB] overflow-hidden">
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-semibold text-[#181D27]">{pdf.name}</span>
                                    <div className="flex items-center gap-4">
                                        <span className="px-2.5 py-0.5 bg-[#BE735B] text-white font-semibold text-xs rounded-full">Lab Values Extracted</span>
                                        <button onClick={() => toggleExpand(pdf.id)} className="text-[#535862] cursor-pointer">
                                            <DropdownIcon />
                                        </button>
                                    </div>
                                </div>

                                {pdf.expanded && (
                                    <div className=" pb-4 border-t mt-4 border-[#E3E3E3]">
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-b border-[#E9EAEB]">
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">Clinic:</p><p className="text-sm font-normal text-[#414651]">{pdf.clinic}</p></div>
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">Doctor:</p><p className="text-sm font-normal text-[#414651]">{pdf.doctor}</p></div>
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">Patient:</p><p className="text-sm font-normal text-[#414651]">{pdf.patient}</p></div>
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">Report Date:</p><p className="text-sm font-normal text-[#414651]">{pdf.reportDate}</p></div>
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">ID:</p><p className="text-sm font-normal text-[#414651]">{pdf.uploadedId}</p></div>
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">Uploaded:</p><p className="text-sm font-normal text-[#414651]">{pdf.uploaded}</p></div>
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">Size:</p><p className="text-sm font-normal text-[#414651]">{pdf.size}</p></div>
                                            <div><p className="text-[#181D27] text-base font-semibold mb-0.5">Status:</p><p className="text-sm font-normal text-[#414651]">{pdf.status}</p></div>
                                        </div>

                                        <div className="mt-4">
                                            <h3 className="text-xl font-semibold text-[#181D27] mb-3">Lab Values</h3>
                                            <div className="grid  grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                                                {LAB_PAGES[getLabPage(pdf.id)].map((lab, i) => (
                                                    <div key={i} className="border border-[#E9EAEB] rounded-lg p-4">
                                                        <p className="text-lg font-serif text-[#1E1E23] border-b border-[#E3E3E3] pb-3">{lab.name}</p>
                                                        <p className="text-xs text-[#535862] mt-3">{lab.value}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex items-center justify-between pb-4 border-b border-[#E9EAEB]">
                                                <button
                                                    onClick={() => setLabPage(prev => ({ ...prev, [pdf.id]: Math.max(0, (prev[pdf.id] ?? 0) - 1) }))}
                                                    className="cursor-pointer"
                                                >
                                                    <PrevIcon />
                                                </button>
                                                <div className="flex gap-1.5">
                                                    {LAB_PAGES.map((_, i) => (
                                                        <button key={i} onClick={() => setLabPage(prev => ({ ...prev, [pdf.id]: i }))}
                                                            className={`w-2 h-2 rounded-full transition ${getLabPage(pdf.id) === i ? 'bg-[#BE735B]' : 'bg-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={() => setLabPage(prev => ({ ...prev, [pdf.id]: Math.min(LAB_PAGES.length - 1, (prev[pdf.id] ?? 0) + 1) }))}
                                                    className="cursor-pointer"
                                                >
                                                    <NextIcon />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-end gap-3 mt-4">
                                            <button onClick={() => downloadPdf(pdf)} className="flex items-center gap-2 p-2 bg-[#BE735B] text-white text-sm font-medium rounded-md hover:bg-[#A86550] transition cursor-pointer">
                                                Download PDF
                                            </button>
                                            <button onClick={() => deletePdf(pdf.id)} className="p-2 border border-[#E9EAEB] bg-[#F5F5F5] rounded-[80px] hover:bg-red-50 hover:border-red-200 transition cursor-pointer">
                                                <DeleteIcon />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <Note />
            </div>
        </section>
    );
}
