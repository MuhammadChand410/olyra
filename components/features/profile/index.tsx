"use client"

import { EditIcon, EmailSvgIcon, HealthhIcon, InfoArrowIcon, InfoIcon, LogoutIcon, RightIcon, UploaddIcon } from "@/assets/icon";
import { avatar } from "@/assets/image";
import { useState } from "react";
import Link from "next/link";
import Note from "@/components/common/note";

export default function ProfileView() {
    const [isEditing, setIsEditing] = useState(false);
    const [isHealting, setIsHealting] = useState(false);
    const [language, setLanguage] = useState("English");
    const [profile, setProfile] = useState({
        name: "Diego Castellon",
        email: "Afridi.100@gmail.com",
        birthdate: "11-05-1999",
        phone: "+35 48090884",
    });
    const [form, setForm] = useState(profile);

    const handleSave = () => {
        setProfile(form);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setForm(profile);
        setIsEditing(false);
    };


    const [health, sethealth] = useState({
        chronis: "Add Chronic Illness...",
        current: "Add medication...",
        allergie: "Add Allergy...",
        family: "Describe family history...",
    });

    const [formm, setHealth] = useState(health);

    const handleSavee = () => {
        sethealth(formm);
        setIsHealting(false);
    };

    const handleCancell = () => {
        setHealth(health);
        setIsHealting(false);
    };

    const [settings, setSetting] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [terms, setTerms] = useState(false);
    const [logout, setLogout] = useState(false);

    return (
        <section className="py-6">
            <div className="container">
                <h1 className="font-serif font-normal text-3xl text-[#181D27] mb-1">My Profile</h1>
                <p className="text-sm text-[#535862] mb-6">Your health. Your data. Your life.</p>

                <div className="bg-white rounded-xl border border-[#E9EAEB] p-4 mb-4">
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <img src={avatar.src} alt="avatar" width={56} height={56} className="rounded-full" />
                            <div>
                                <h2 className="text-xl font-semibold text-[#181D27]">{profile.name}</h2>
                                <div className="flex items-center gap-2">
                                    <EmailSvgIcon />
                                    <span className="text-sm font-normal text-[#414651]">{profile.email}</span>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => { setForm(profile); setIsEditing(true); }} className="flex cursor-pointer items-center gap-2 px-4 py-2.5 text-sm font-medium bg-[#BE735B] text-white rounded-md hover:bg-[#A86550] transition">
                            <EditIcon />
                            Edit
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-[#18181B] font-medium mb-1 block">Birthdate</label>
                            <div className="px-3 py-2.5 border border-[#E4E4E7] rounded-md font-normal text-sm text-[#71717A]">{profile.birthdate}</div>
                        </div>
                        <div>
                            <label className="text-sm text-[#18181B] font-medium mb-1 block">Phone no</label>
                            <div className="px-3 py-2.5 border border-[#E4E4E7] rounded-md font-normal text-sm text-[#71717A]">{profile.phone}</div>
                        </div>
                    </div>
                </div>

                {isEditing && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCancel}>
                        <div className="bg-white rounded-xl border border-[#E9EAEB] p-6 w-full max-w-187 mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-normal text-[#1E1E23] font-serif">Edit Profile</h2>
                                <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer">&times;</button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-[#18181B] mb-1 block">Full Name</label>
                                    <input
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md font-normal text-sm text-[#18181B] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#18181B] mb-1 block">Email</label>
                                    <input
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md font-normal text-sm text-[#18181B] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#18181B] mb-1 block">Birthdate</label>
                                    <input
                                        value={form.birthdate}
                                        onChange={(e) => setForm({ ...form, birthdate: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md font-normal text-sm text-[#18181B] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#18181B] mb-1 block">Phone no</label>
                                    <input
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md font-normal text-sm text-[#18181B] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 justify-end mt-6">
                                <button onClick={handleCancel} className="cursor-pointer px-4 py-2.5 text-sm border border-[#BE735B] text-[#BE735B] rounded-lg hover:bg-orange-50 transition">Cancel</button>
                                <button onClick={handleSave} className="cursor-pointer px-4 py-2.5 text-sm bg-[#BE735B] text-white rounded-lg hover:bg-[#A86550] transition">Save</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl border border-[#E9EAEB] p-4 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
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

                {isHealting && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleCancell}>
                        <div className="bg-white rounded-xl border border-[#E9EAEB] p-6 w-full max-w-187 mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-lg font-normal text-[#1E1E23] font-serif">My Health Profile</h2>
                                <button onClick={handleCancell} className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer">&times;</button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Chronis Illnesses</label>
                                    <input
                                        value={formm.chronis}
                                        onChange={(e) => setHealth({ ...formm, chronis: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Current Medications</label>
                                    <input
                                        value={formm.current}
                                        onChange={(e) => setHealth({ ...formm, current: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Allergies</label>
                                    <input
                                        value={formm.allergie}
                                        onChange={(e) => setHealth({ ...formm, allergie: e.target.value })}
                                        className="w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-[#18181B] font-medium mb-1 block">Family History</label>
                                    <textarea
                                        value={formm.family}
                                        onChange={(e) => setHealth({ ...formm, family: e.target.value })}
                                        className="w-full  px-3 py-2.5 border border-[#E4E4E7] rounded-md resize-none text-sm font-normal text-[#71717A] outline-none focus:border-[#BE735B] transition"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2 justify-end mt-6">
                                <button onClick={handleCancell} className="cursor-pointer px-4 py-2.5 text-sm border border-[#BE735B] text-[#BE735B] rounded-lg hover:bg-orange-50 transition">Cancel</button>
                                <button onClick={handleSavee} className="cursor-pointer px-4 py-2.5 text-sm bg-[#BE735B] text-white rounded-lg hover:bg-[#A86550] transition">Save</button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl border border-[#E9EAEB] p-4 mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-[#E5E7D4] flex items-center justify-center flex-shrink-0">
                            <UploaddIcon />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-[#181D27] mb-0.5">My Uploads</h3>
                            <p className="text-sm font-normal text-[#414651]">Manage your uploaded PDF files and view the extracted lab values</p>
                        </div>
                    </div>
                    <Link href="/uploads" className="flex items-center gap-2 px-2 hover:bg-orange-50 font-medium py-2 text-sm border cursor-pointer border-[#BE735B] text-[#BE735B] rounded-md transition">
                        View All
                        <RightIcon />
                    </Link>
                </div>

                <div className="bg-white rounded-xl border border-[#E9EAEB] p-4 mb-4">
                    <h3 className="text-xl font-semibold text-[#181D27] mb-0.5">Account Settings</h3>
                    <p className="text-sm font-normal text-[#414651] mb-4">Manage your uploaded PDF files and view the extracted lab values</p>
                    <label className="text-sm font-medium text-[#18181B] mb-2 block">Language / Region</label>
                    <div
                        onClick={() => setSetting(true)}
                        className="relative w-full px-3 py-2.5 border border-[#E4E4E7] rounded-md text-sm text-[#1E1E23] bg-white cursor-pointer flex items-center justify-between"
                    >
                        <span>{language}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#535862">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {settings && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-end p-6 z-50" onClick={() => setSetting(false)}>
                        <div className="bg-white rounded-xl border border-[#E9EAEB] p-1.5 w-full max-w-234" onClick={(e) => e.stopPropagation()}>
                            <ul className="">
                                {['English', 'Spanish', 'French', 'German', 'Arabic'].map((lang) => (
                                    <li key={lang}>
                                        <button
                                            onClick={() => { setLanguage(lang); setSetting(false); }}
                                            className={`cursor-pointer w-full text-left px-2.5 py-2 rounded-lg text-sm transition flex items-center justify-between ${language === lang ? 'bg-[#F5F5F5] text-[#181D27] rounded-md' : 'hover:bg-gray-50 text-[#717680]'
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-xl border border-[#E9EAEB] p-4 mb-4">
                    <h3 className="text-xl font-semibold text-[#181D27] mb-4">About Olyra</h3>
                    <div className="flex items-center justify-end gap-2.5">
                        <button onClick={() => setPrivacy(true)} className="cursor-pointer bg-[#F5F5F5] flex w-115 items-center justify-between px-2 py-3 border border-[#E9EAEB] rounded-md hover:bg-gray-100 transition">
                            <div className="flex items-center gap-2 font-medium text-sm text-[#181D27]">
                                <InfoIcon />
                                Privacy Notes
                            </div>
                            <InfoArrowIcon />
                        </button>
                        <button onClick={() => setTerms(true)} className="bg-[#F5F5F5] cursor-pointer flex w-115 items-center justify-between px-2 py-3 border border-[#E9EAEB] rounded-md hover:bg-gray-100 transition">
                            <div className="flex items-center gap-2 text-sm font-medium text-[#181D27]">
                                <InfoIcon />
                                Terms of services
                            </div>
                            <InfoArrowIcon />
                        </button>
                        <button onClick={() => setLogout(true)} className="cursor-pointer flex items-center gap-2 px-2 py-3 bg-[#BE735B] text-white text-sm font-medium rounded-md hover:bg-[#A86550] transition">
                            <LogoutIcon />
                            Logout
                        </button>
                    </div>
                </div>
                <Note/>

                {privacy && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setPrivacy(false)}>
                        <div className="bg-white rounded-xl border border-[#E9EAEB] p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-[#181D27]">Privacy Notes</h2>
                                <button onClick={() => setPrivacy(false)} className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer">&times;</button>
                            </div>
                            <div className="space-y-3 text-sm text-[#535862] leading-6 max-h-80 overflow-y-auto">
                                <p><strong className="text-[#181D27]">Data Collection:</strong> We collect health data you provide to deliver personalized insights and recommendations.</p>
                                <p><strong className="text-[#181D27]">Data Usage:</strong> Your data is used solely to improve your health experience and is never sold to third parties.</p>
                                <p><strong className="text-[#181D27]">Data Security:</strong> All data is encrypted and stored securely following industry-standard protocols.</p>
                                <p><strong className="text-[#181D27]">Your Rights:</strong> You have the right to access, modify, or delete your personal data at any time.</p>
                                <p><strong className="text-[#181D27]">Cookies:</strong> We use cookies to enhance your experience. You can manage cookie preferences in your browser settings.</p>
                                <p><strong className="text-[#181D27]">Contact:</strong> For privacy concerns, contact us at privacy@olyra.com</p>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button onClick={() => setPrivacy(false)} className="px-4 py-2.5 text-sm bg-[#BE735B] text-white rounded-md hover:bg-[#A86550] transition cursor-pointer">Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {terms && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setTerms(false)}>
                        <div className="bg-white rounded-xl border border-[#E9EAEB] p-6 w-full max-w-lg mx-4" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-[#181D27]">Terms of Services</h2>
                                <button onClick={() => setTerms(false)} className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer">&times;</button>
                            </div>
                            <div className="space-y-3 text-sm text-[#535862] leading-6 max-h-80 overflow-y-auto">
                                <p><strong className="text-[#181D27]">Acceptance:</strong> By using Olyra, you agree to these terms and conditions in full.</p>
                                <p><strong className="text-[#181D27]">Medical Disclaimer:</strong> Olyra does not provide medical advice. Always consult a qualified healthcare provider for medical decisions.</p>
                                <p><strong className="text-[#181D27]">Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account credentials.</p>
                                <p><strong className="text-[#181D27]">Prohibited Use:</strong> You may not use Olyra for any unlawful purpose or in any way that could harm other users.</p>
                                <p><strong className="text-[#181D27]">Intellectual Property:</strong> All content and features of Olyra are the property of Olyra Inc. and protected by copyright laws.</p>
                                <p><strong className="text-[#181D27]">Termination:</strong> We reserve the right to terminate accounts that violate these terms without prior notice.</p>
                            </div>
                            <div className="flex justify-end mt-6">
                                <button onClick={() => setTerms(false)} className="px-4 py-2.5 text-sm bg-[#BE735B] text-white rounded-md hover:bg-[#A86550] transition cursor-pointer">Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {logout && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setLogout(false)}>
                        <div className="bg-white rounded-lg border border-[#E4E4E7] p-6 w-full max-w-130" onClick={(e) => e.stopPropagation()}>
                            <h2 className="text-lg font-serif font-normal text-[#18181B] mb-2">Logout</h2>
                            <p className="text-sm text-[#71717A] mb-4">Are you sure want to logout?</p>
                            <div className="flex items-center gap-2 justify-end">
                                <button
                                    onClick={() => setLogout(false)}
                                    className="px-4 py-2.5 text-sm border border-[#E4E4E7] text-[#18181B] font-medium rounded-md hover:bg-gray-50 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setLogout(false);
                                        setProfile({
                                            name: 'Diego Castellon',
                                            email: 'Afridi.100@gmail.com',
                                            birthdate: '11-05-1999',
                                            phone: '+35 48090684',
                                        });
                                        sethealth({
                                            chronis: 'Add Chronic Illness...',
                                            current: 'Add medication...',
                                            allergie: 'Add Allergy...',
                                            family: 'Describe family history...',
                                        });
                                        setLanguage('English');
                                    }}
                                    className="px-4 py-2.5 text-sm bg-[#BE735B] text-white font-medium rounded-md hover:bg-[#A86550] transition cursor-pointer"
                                >
                                    Yes, Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
