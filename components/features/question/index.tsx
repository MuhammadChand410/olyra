"use client"
import { AlcoholIcon, AnxiteyIcon, BloodIcon, DepressionIcon, DietIcon, ExerciseIcon, GlucoseIcon, HealthhIcon, HeartIcon, PainIcon, RightIcon, SleepIcon, SmokingIcon, VaccinesIcon, WeightIcon, WriterIcon } from "@/assets/icon";
import Button from "@/components/common/button";
import Note from "@/components/common/note";
import TitlePara from "@/components/common/titlteparacomponent";
import { title } from "process";
import { useState } from "react";

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
    {
        id: 7,
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
        id: 8,
        icon: WeightIcon,
        text: 'Weight',
        span: '52',
        spann: 'K/uL',
        description: 'Within healthy range for height',
        normalRange: '70',
        title: 'Enter Your Weight',
        detailedInfo: 'Weight should be Kg'
    },
]
const LIFE_STYLE_MARKER = [
    {
        id: 1,
        icon: DepressionIcon,
        text: 'Depression Score',
        description: 'PHQ-2 screening for depression symptoms',
        title: 'Depression Score'
    },
    {
        id: 2,
        icon: AnxiteyIcon,
        text: 'Anxiety Score',
        description: 'GAD-7 screening for anxiety symptoms',
        title: 'Anxiety Score'
    },
    {
        id: 3,
        icon: ExerciseIcon,
        text: 'Exercise Score',
        description: 'IPAQ physical activity assesment',
        title: 'Exercise Score'
    },
    {
        id: 4,
        icon: DepressionIcon,
        text: 'Wellbeing Score',
        description: 'WHO-5 Well-Being Index',
        title: 'Wellbeing Score'
    },
    {
        id: 5,
        icon: SmokingIcon,
        text: 'Smoking Score',
        description: 'Fagerstrom Tet for nicotine dependence',
        title: 'Smoking Score'
    },
    {
        id: 6,
        icon: AlcoholIcon,
        text: 'Alcohol Score',
        description: 'AUDIT-C alcohol use screening',
        title: 'Alcohol Score'
    },
    {
        id: 7,
        icon: SleepIcon,
        text: 'Sleep Score',
        description: 'Insomnia Severity Index assessment',
        title: 'Sleep Score'
    },
    {
        id: 8,
        icon: DietIcon,
        text: 'Diet Score',
        description: 'Mediterranean Diet Adherence',
        title: 'Diet Score'
    },
    {
        id: 9,
        icon: PainIcon,
        text: 'Pain Score',
        description: 'PEG 3-item pain scale',
        title: 'Pain Score'
    },
]
const VACCINES = [
    { title: "COVID-19", desc: "Every year or per latest schedule" },
    { title: "Influenza (Flu)", desc: "Yearly, starting at 6 months" },
    { title: "Tdap/Td", desc: "Once, then every 10 years" },
    { title: "MMR (Measles, Mumps, Rubella)", desc: "2 doses in childhood; verify immunity in adults" },
    { title: "HPV", desc: "Ages 9-26 (up to 45 in some cases)" },
    { title: "Hepatitis B", desc: "Childhood series; adults per risk" },
];

export default function QuestionView() {
    const [selectedMarker, setSelectedMarker] = useState<number | null>(null);
    const [lifeStyleMarker, setLifeStyleMarker] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [open, setOpen] = useState(false);
    const [isHealting, setIsHealting] = useState(false);

    const [depressionAnswers, setDepressionAnswers] = useState<Record<number, string>>({});

    const DEPRESSION_QUESTIONS = [
        { id: 1, text: 'Little interest or pleasure in doing things', options: ['Not at all', 'Several days', 'More then half the days', 'Nearly every day'] },
        { id: 2, text: 'Feeling down, depressed, or hopeless', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
        { id: 3, text: 'Trouble falling or staying asleep, or sleeping too much', options: ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'] },
    ];
    const totalQ = DEPRESSION_QUESTIONS.length;
    const answeredQ = Object.keys(depressionAnswers).length;

    const [health, sethealth] = useState({
        chronis: "Add Chronic Illness...",
        current: "Add medication...",
        allergie: "Add Allergy...",
        family: "Describe family history...",
    });
    const [formm, setHealth] = useState(health);

    const [savedChecked, setSavedChecked] = useState<number[]>([]);
    const [tempChecked, setTempChecked] = useState<number[]>([]);

    const toggleCheck = (index: number) => {
        setTempChecked(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const handleSaveVaccines = () => {
        setSavedChecked(tempChecked);
        setOpen(false);
    };

    const handleSavee = () => {
        sethealth(formm);
        setIsHealting(false);
    };

    const handleCancell = () => {
        setHealth(health);
        setIsHealting(false);
    };

    return (
        <section className="py-6">
            <div className="container">
                <div>
                    <h2 className="font-serif font-normal text-3xl text-[#181D27] mb-1">Questionnaires</h2>
                    <p className="text-sm text-[#535862] mb-6">View different questionnaires about health.</p>
                </div>
                <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                    <div className="bg-white rounded-xl border border-[#E9EAEB] p-4 mb-4 flex items-start md:items-center justify-between">
                        <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
                            <div className="p-2 rounded-full bg-[#E5E7D4] flex items-center justify-center flex-shrink-0">
                                <HealthhIcon />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#181D27] mb-0.5">My Health Profile</h3>
                                <p className="text-sm font-normal text-[#414651]">Chronic illnesses, medications, allergies, family history</p>
                            </div>
                        </div>
                        <button onClick={() => { setHealth(health); setIsHealting(true); }} className="flex items-center gap-2 px-2 hover:bg-orange-50 font-medium py-2 text-sm border cursor-pointer border-[#BE735B] text-[#BE735B] rounded-md transition">
                            View
                            <RightIcon />
                        </button>
                    </div>

                    <div className="bg-white rounded-xl border border-[#E9EAEB] p-4 flex items-center justify-between">
                        <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
                            <div className="p-2 rounded-full bg-[#E5E7D4] flex items-center justify-center flex-shrink-0">
                                <VaccinesIcon />
                            </div>
                            <div>
                                <div className="flex items-center gap-5">
                                    <h3 className="text-xl font-semibold text-[#181D27] mb-0.5">Vaccines</h3>
                                    <span className="text-sm font-normal text-[#D12A2A]">{savedChecked.length}/{VACCINES.length} Completed</span>
                                </div>
                                <p className="text-sm font-normal text-[#414651]">Checklist of recommended vaccines and boosters</p>
                            </div>
                        </div>
                        <button onClick={() => { setTempChecked(savedChecked); setOpen(true); }} className="flex items-center gap-2 px-2 hover:bg-orange-50 font-medium py-2 text-sm border cursor-pointer border-[#BE735B] text-[#BE735B] rounded-md transition">
                            View
                            <RightIcon />
                        </button>
                    </div>
                </div>

                <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                    <div className="mb-4">
                        <TitlePara title="Functional Markers" description="" />
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

                <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E9EAEB] mb-6">
                    <div className="mb-4">
                        <TitlePara title="Life Style Markers" description="" />
                    </div>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
                        {LIFE_STYLE_MARKER.map(item =>
                            <div onClick={() => setLifeStyleMarker(item.id)} className="p-6 rounded-lg bg-white border border-[#E9EAEB] cursor-pointer hover:shadow-lg transition" key={item.id}>
                                <div className=" mb-3">
                                    <div className="p-2 bg-[#E5E7D4] rounded-[80px] w-fit">
                                        <item.icon />
                                    </div>
                                </div>
                                <p className="text-[#252613] text-2xl font-normal leading-12 font-serif pb-4 border-b border-[#E3E3E3]">{item.text}</p>
                                <p className="text-base text-[#5F5F69] font-normal mt-4">{item.description}</p>
                            </div>
                        )}
                    </div>
                </div>
                <Note />

                {lifeStyleMarker && (
                    <div className="fixed inset-0 bg-black/50 flex items-center px-4 justify-center z-50" onClick={() => setLifeStyleMarker(null)}>
                        <div className="w-full max-w-187 border bg-white border-[#E9EAEB] rounded-lg flex flex-col max-h-[60vh] md:max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between rounded-xl bg-white px-6 pt-6 pb-6">
                                <div className="flex items-center gap-3">
                                    {LIFE_STYLE_MARKER.filter(i => i.id === lifeStyleMarker).map(item => (
                                        <div key={item.id} className="flex items-center gap-2">
                                            <div className="p-1.5 bg-[#E5E7D4] rounded-full"><item.icon /></div>
                                            <h2 className="text-xl font-serif font-normal text-[#1E1E23]">{item.title}</h2>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={() => setLifeStyleMarker(null)} className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer">&times;</button>
                            </div>

                            <div className="px-6">
                                <p className="text-sm text-[#535862] mb-2">{answeredQ}/{totalQ}</p>
                                <div className="w-full h-2 bg-[#BAE7CB] rounded-full mb-4">
                                    <div className="h-2 bg-[#1CA34E] rounded-full transition-all" style={{ width: `${(answeredQ / totalQ) * 100}%` }} />
                                </div>
                            </div>
                            <div className=" bg-white rounded-lg overflow-y-auto px-6">
                                <div className="flex-1 p-4 rounded-xl space-y-6 bg-[#F5F5F5] border border-[#E9EAEB] pb-4">
                                    {DEPRESSION_QUESTIONS.map((q, qi) => (
                                        <div key={q.id}>
                                            <p className="text-lg font-medium text-[#0F172B] mb-1">Question {qi + 1}:</p>
                                            <p className="text-xl tracking-[-1.8px] text-[#626366] border-b border-[#E3E3E3] pb-3">{q.text}</p>
                                            <p className="text-base text-[#0F172B] font-medium pt-3 mb-2">Options:</p>
                                            <div className="space-y-2">
                                                {q.options.map(opt => (
                                                    <button
                                                        key={opt}
                                                        onClick={() => setDepressionAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                                        className={`w-full text-left p-3 border rounded-md text-sm transition cursor-pointer ${depressionAnswers[q.id] === opt
                                                            ? 'border-[#1CA34E] bg-green-50 text-[#4F512D] font-normal'
                                                            : 'border-[#E5E7EB] text-[#7D8796] hover:border-[#1CA34E]'
                                                            }`}
                                                    >
                                                        {opt}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 px-6 mt-4 py-4 border-t border-[#E4E4E7]">
                                <button
                                    onClick={() => { setLifeStyleMarker(null); setDepressionAnswers({}); }}
                                    className="px-4 py-2.5 text-sm border border-[#E4E4E7] text-[#1E1E23] rounded-lg hover:bg-gray-50 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        console.log('Depression Answers:', depressionAnswers);
                                        setLifeStyleMarker(null);
                                        setDepressionAnswers({});
                                    }}
                                    className="px-4 py-2.5 text-sm bg-[#BE735B] text-white rounded-lg hover:bg-[#A86550] transition cursor-pointer"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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

                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                        <div className="max-w-91 md:max-w-187 w-full bg-white rounded-lg border py-6 border-[#E4E4E7]">
                            <div className="flex items-center justify-between px-6 mb-6">
                                <h2 className="text-xl font-normal text-[#1E1E23] font-serif">Vaccines</h2>
                                <button onClick={() => setOpen(false)} className="cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <g opacity="0.7">
                                            <path d="M12 4L4 12M4 4L12 12" stroke="#18181B" strokeWidth="1.33" strokeLinecap="round" strokeLinejoin="round" />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <div className="max-h-70 md:max-h-100 h-full overflow-y-auto px-6 bg-white">
                                <div className="space-y-3 pb-6">
                                    {VACCINES.map((item, index) => (
                                        <label key={index} className="flex items-start gap-3 border border-[#E9EAEB] rounded-lg p-3 cursor-pointer hover:bg-gray-50">
                                            <input
                                                type="checkbox"
                                                className="mt-2"
                                                checked={tempChecked.includes(index)}
                                                onChange={() => toggleCheck(index)}
                                            />
                                            <div className="w-full">
                                                <p className="text-lg font-normal text-[#0F172B] font-serif border-b border-[#E3E3E3] pb-1">{item.title}</p>
                                                <p className="text-sm text-[#5F5F69] font-normal pt-1">{item.desc}</p>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                                <div className="flex justify-end gap-2 pt-6 border-t border-[#E3E3E3]">
                                    <button onClick={() => setOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-[#BE735B] text-[#BE735B] hover:bg-orange-50 cursor-pointer">
                                        Cancel
                                    </button>
                                    <button onClick={handleSaveVaccines} className="px-4 py-2 text-sm rounded-lg bg-[#BE735B] text-white hover:bg-[#A86550] cursor-pointer">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isHealting && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCancell}>
                        <div className="bg-white rounded-xl border border-[#E9EAEB] p-6 w-full max-w-91 md:max-w-187 mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-normal text-[#1E1E23] font-serif">My Health Profile</h2>
                                <button onClick={handleCancell} className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer">&times;</button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Chronis Illnesses</label>
                                    <input value={formm.chronis} onChange={(e) => setHealth({ ...formm, chronis: e.target.value })} className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Current Medications</label>
                                    <input value={formm.current} onChange={(e) => setHealth({ ...formm, current: e.target.value })} className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Allergies</label>
                                    <input value={formm.allergie} onChange={(e) => setHealth({ ...formm, allergie: e.target.value })} className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition" />
                                </div>
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Family History</label>
                                    <textarea value={formm.family} onChange={(e) => setHealth({ ...formm, family: e.target.value })} className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md resize-none text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition" />
                                </div>
                            </div>
                            <div className="flex items-center gap-2 justify-end mt-6">
                                <button onClick={handleCancell} className="cursor-pointer px-4 py-2.5 text-sm border border-[#BE735B] text-[#BE735B] rounded-lg hover:bg-orange-50 transition">Cancel</button>
                                <button onClick={handleSavee} className="cursor-pointer px-4 py-2.5 text-sm bg-[#BE735B] text-white rounded-lg hover:bg-[#A86550] transition">Save</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}


