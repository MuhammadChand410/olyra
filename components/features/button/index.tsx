"use client"

import { useState } from "react";
import Link from "next/link";
import { BackArrowIcon, VectorIcon } from "@/assets/icon";
import Note from "@/components/common/note";

const STEPS = [
    'Work environment conditions',
    'Workload',
    'Lack of control over work',
    'Work vs lifestyle',
    'Work adjustment tips',
];

const QUESTIONS = [
    {
        id: 1,
        text: 'In my work I can express my opinions without fear of reprisals',
        options: ['Always', 'Almost always', 'Sometimes', 'Never almost', 'Never'],
    },
    {
        id: 2,
        text: 'When I have problems at work I receive support from my coworkers',
        options: ['Always', 'Almost always', 'Sometimes', 'Never almost', 'Never'],
    },
    {
        id: 3,
        text: 'My coworkers help me when I have shared difficulties',
        options: ['Always', 'Almost always', 'Sometimes', 'Never almost', 'Never'],
    },
];

export default function ButtonView() {
    const [isSubmitted, setCurrentStepp] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});

    const handleAnswer = (questionId: number, option: string) => {
        setAnswers(prev => ({ ...prev, [`${currentStep}-${questionId}`]: option }));
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const progress = Math.round(((currentStep + 1) / STEPS.length) * 100);

    return (
        <section className="min-h-screen bg-[#F9F9F9] py-6 px-6">
            <div className="container max-w-3xl mb-6">
                <div className="mb-6">
                    <div className="flex items-center gap-2.5 mb-1">
                        <Link href="/enterprise" className="text-[#535862] -ml-9 hover:text-[#181D27]">
                            <BackArrowIcon />
                        </Link>
                        <h1 className="font-serif font-normal text-4xl text-[#181D27]">NOM-035 Questionnaire</h1>
                    </div>

                    <p className="text-xs text-[#535862]">This questionnaire is mandatory for all personnel and is organized and will work in accordance with NOM-035-STPS-2018</p>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-[#535862]">Questionnaire progress</span>
                    <span className="text-sm text-[#535862]">{currentStep + 1}/{STEPS.length}</span>
                </div>
                <div className="w-full h-3 bg-[#BAE7CB] rounded-full mb-6">
                    <div className="h-3 bg-[#1CA34E] rounded-full transition-all" style={{ width: `${progress}%` }} />
                </div>

                <div className="bg-white rounded-xl border border-[#E9EAEB] p-6">

                    <div className="flex items-center justify-between mb-6">
                        <span className="text-xs font-semibold text-[#535862] uppercase tracking-wide">Lifestyle Questionnaire</span>
                        <span className="px-3 py-1 bg-[#E5E7D4] text-[#4F512D] text-xs font-medium rounded-full">In Progress</span>
                    </div>

                    <div className="flex items-start justify-between mb-8 overflow-x-auto gap-2">
                        {STEPS.map((step, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium border-2 transition ${i < currentStep ? 'bg-[#BE735B] border-[#BE735B] text-white' :
                                    i === currentStep ? 'border-[#BE735B] text-[#BE735B] bg-white' :
                                        'border-gray-200 text-gray-400 bg-white'
                                    }`}>
                                    {i < currentStep ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : i + 1}
                                </div>
                                <span className={`text-xs text-center leading-tight ${i === currentStep ? 'text-[#BE735B] font-medium' : 'text-[#535862]'}`}>{step}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 pb-6">
                        {QUESTIONS.map((q, qi) => (
                            <div key={q.id}>
                                <div className=" pb-6 border-b border-[#E3E3E3]">
                                    <span className="text-[#0F172B] text-xl font-medium">Question {qi + 1}:</span><br />
                                    <p className="text-xl font-normal text-[#626366] tracking-[-1.8px]">{q.text}</p>
                                </div>
                                <p className="text-xl text-[#0F172B] font-medium mt-6 mb-3">Options:</p>
                                <div className="space-y-3">

                                    {q.options.map((opt) => {
                                        const key = `${currentStep}-${q.id}`;
                                        const selected = answers[key] === opt;
                                        return (
                                            <button
                                                key={opt}
                                                onClick={() => handleAnswer(q.id, opt)}
                                                className={`w-full text-left p-3 border rounded-md text-sm font-normal transition cursor-pointer ${selected
                                                    ? 'border-[#BE735B] bg-orange-50 text-[#BE735B]'
                                                    : 'border-[#E5E7EB] text-[#7D8796] hover:border-[#BE735B] hover:bg-orange-50'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between pt-6 gap-3  border-t border-[#E3E3E3]">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className="px-4 py-2.5 bg-[#4F512D] hover:bg-[#3F4124] text-white text-sm font-medium rounded-md transition cursor-pointer disabled:opacity-50"
                        >
                            Back
                        </button>

                        <button
                            onClick={() => {
                                if (currentStep < STEPS.length - 1) {
                                    setCurrentStep(currentStep + 1);
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                    setCurrentStepp(true);
                                }
                            }}
                            className="px-4 py-2.5 bg-[#BE735B] text-white text-sm font-medium rounded-md hover:bg-[#A86550] transition cursor-pointer"
                        >
                            {currentStep < STEPS.length - 1 ? 'Continue' : 'Submit'}
                        </button>

                    </div>
                    {isSubmitted && (
                        <div>
                            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-lg border border-[#E4E4E7] p-6 w-full max-w-130">
                                    <div className="mb-4 flex justify-center">
                                        <VectorIcon />
                                    </div>
                                    <h2 className="text-lg font-normal text-[#18181B] font-serif mb-2 text-center">Questionnaire Completed!</h2>
                                    <p className="text-sm text-[#71717A] font-normal mb-4 text-center">Thank you for completing the NOM-035 questionnaire. Your responses have been successfully recorded.</p>
                                    <div className="">
                                        <button
                                            onClick={() => {
                                                setCurrentStepp(false);
                                                setCurrentStep(0);
                                            }}

                                            className="px-4 bg-[#BE735B] text-white hover:bg-[#A86550] mb-2 py-2.5 w-full text-sm font-medium rounded-md transition cursor-pointer"
                                        >
                                            Take Again
                                        </button>
                                        <button
                                            onClick={() => setCurrentStepp(false)}
                                            className="px-4 py-2.5 w-full text-sm border border-[#E4E4E7] text-[#18181B] font-medium rounded-md hover:bg-gray-50 transition cursor-pointer"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <Note/>
            </div>
        </section>
    );
}
