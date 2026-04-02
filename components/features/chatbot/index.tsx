"use client"

import { NewChatIcon, SandDataIcon, StopRecordIcon, VoiceRecordIcon } from "@/assets/icon";
import { avatar } from "@/assets/image";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface Message {
    id: number;
    type: 'text' | 'audio' | 'link' | 'typing';
    text?: string;
    time: string;
    sender: 'user' | 'bot';
    link?: { title: string; description: string; url: string };
    audioDuration?: string;
    audioUrl?: string;
}

const CHATS = [
    { id: 1, name: "Lorem Ipsum is simply dummy text " },
    { id: 2, name: "Lorem Ipsum is simply dummy text " },
    { id: 3, name: "Lorem Ipsum is simply dummy text " },
    { id: 4, name: "Lorem Ipsum is simply dummy text " },
    { id: 5, name: "Lorem Ipsum is simply dummy text " },
    { id: 6, name: "Lorem Ipsum is simply dummy text " },
    { id: 7, name: "Lorem Ipsum is simply dummy text " },
    { id: 8, name: "Lorem Ipsum is simply dummy text " },
    { id: 9, name: "Lorem Ipsum is simply dummy text " },

];

const BOT_RESPONSES: Record<string, string> = {
    "health score": "Your health score of 57 is calculated based on your biomarkers. Focus on improving out-of-range markers to boost your score.",
    "glucose": "Your fasting glucose of 96 mg/dL is at the higher end of normal. Reduce refined carbs and increase fiber intake.",
    "cholesterol": "Your LDL of 142 mg/dL is borderline high. Consider increasing soluble fiber and reducing saturated fats.",
    "biological age": "Your biological age of 49 is 3.1 years younger than your chronological age — great work!",
};

function getBotResponse(input: string): string {
    const lower = input.toLowerCase();
    for (const key in BOT_RESPONSES) {
        if (lower.includes(key)) return BOT_RESPONSES[key];
    }
    return "Thank you for your message. Based on your health profile, I recommend consulting with a specialist for personalized advice.";
}

export default function ChatbotView() {
    const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingName, setEditingName] = useState('');
    const [chats, setChats] = useState(CHATS);
    const [activeChat, setActiveChat] = useState(1);
    const activeChatRef = useRef(1);
    const setActiveChatSafe = (id: number) => {
        activeChatRef.current = id;
        setActiveChat(id);
    };
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [recording, setRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [playingId, setPlayingId] = useState<number | null>(null);
    const recordingTimeRef = useRef(0);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const audioRefs = useRef<Record<number, HTMLAudioElement>>({});
    const waveformBars = useRef<Record<number, number[]>>({});
    const bottomRef = useRef<HTMLDivElement>(null);

    const getWaveBars = (id: number) => {
        if (!waveformBars.current[id]) {
            waveformBars.current[id] = Array.from({ length: 24 }, () => Math.floor(Math.random() * 16) + 4);
        }
        return waveformBars.current[id];
    };

    const [chatMessages, setChatMessages] = useState<Record<number, Message[]>>({ 1: [] });
    const messages = chatMessages[activeChat] || [];
    const setMessages = (updater: Message[] | ((prev: Message[]) => Message[])) => {
        const id = activeChatRef.current;
        setChatMessages(prev => ({
            ...prev,
            [id]: typeof updater === 'function' ? updater(prev[id] || []) : updater
        }));
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                const dur = recordingTimeRef.current;
                const duration = `${String(Math.floor(dur / 60)).padStart(2, '0')}:${String(dur % 60).padStart(2, '0')}`;
                const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                const id = activeChatRef.current;

                setChatMessages(prev => ({
                    ...prev,
                    [id]: [...(prev[id] || []), {
                        id: Date.now(),
                        type: 'audio',
                        sender: 'user',
                        time,
                        audioDuration: duration,
                        audioUrl: url,
                    }]
                }));

                stream.getTracks().forEach(t => t.stop());
                recordingTimeRef.current = 0;
                setRecordingTime(0);
            };

            mediaRecorder.start();
            setRecording(true);
            recordingTimerRef.current = setInterval(() => {
                recordingTimeRef.current += 1;
                setRecordingTime(t => t + 1);
            }, 1000);
        } catch {
            alert('Microphone access denied.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            if (recordingTimerRef.current) clearInterval(recordingTimerRef.current);
        }
    };

    const togglePlay = (msg: Message) => {
        if (!msg.audioUrl) return;
        if (playingId === msg.id) {
            audioRefs.current[msg.id]?.pause();
            setPlayingId(null);
        } else {
            if (playingId !== null && audioRefs.current[playingId]) {
                audioRefs.current[playingId].pause();
            }
            if (!audioRefs.current[msg.id]) {
                const audio = new Audio(msg.audioUrl);
                audio.onended = () => setPlayingId(null);
                audioRefs.current[msg.id] = audio;
            } else {
                audioRefs.current[msg.id].currentTime = 0;
            }
            setPlayingId(msg.id);
            audioRefs.current[msg.id].play().catch(() => setPlayingId(null));
        }
    };

    const sendMessage = () => {
        if (!input.trim() || loading) return;
        const id = activeChatRef.current;
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMsg: Message = { id: Date.now(), type: 'text', sender: 'user', text: input, time };
        setChatMessages(prev => ({ ...prev, [id]: [...(prev[id] || []), userMsg] }));
        const captured = input;
        setInput('');
        setLoading(true);
        setTimeout(() => {
            setChatMessages(prev => ({
                ...prev,
                [id]: [...(prev[id] || []), {
                    id: Date.now() + 1,
                    type: 'text',
                    sender: 'bot',
                    text: getBotResponse(captured),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                }]
            }));
            setLoading(false);
        }, 1200);
    };

    return (
        <section className=" bg-[#F9F9F9] overflow-hidden py-6">
            <div className="container">
                <div className="mb-6">
                    <h1 className="text-[#181D27] text-4xl font-normal font-serif mb-1">Chat Bot</h1>
                    <p className="text-sm font-normal text-[#535862]">Your health. Your data. Your life.</p>
                </div>
                <div className="flex gap-4 h-[calc(96vh-80px)]">
                    <div className="md:max-w-54 w-full border rounded-xl bg-white border-[#E9EAEB] flex flex-col flex-shrink-0">
                        <div className="mb-2">
                            <button
                                onClick={() => {
                                    const newId = Date.now();
                                    const newChat = { id: newId, name: `New Chat ${chats.length + 1}` };
                                    setChats(prev => [newChat, ...prev]);
                                    setActiveChatSafe(newId);
                                }}
                                className="flex items-center gap-2 m-3 cursor-pointer px-3 py-3 text-base text-[#535862] hover:bg-gray-50 transition">
                                <NewChatIcon />
                                New Chat
                            </button>
                            <p className="text-xs text-[#8C8C96] px-3">Your Chats</p>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {chats.map(chat => (
                                <div key={chat.id} onClick={() => { setActiveChatSafe(chat.id); setMenuOpenId(null); }}
                                    className={`flex justify-between items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50 transition ${activeChat === chat.id ? 'bg-gray-100' : ''}`}>
                                    {editingId === chat.id ? (
                                        <input
                                            autoFocus
                                            value={editingName}
                                            onChange={(e) => setEditingName(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    setChats(prev => prev.map(c => c.id === chat.id ? { ...c, name: editingName } : c));
                                                    setEditingId(null);
                                                }
                                                if (e.key === 'Escape') setEditingId(null);
                                            }}
                                            onBlur={() => {
                                                setChats(prev => prev.map(c => c.id === chat.id ? { ...c, name: editingName } : c));
                                                setEditingId(null);
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                            className="text-sm text-[#1E1E23] bg-white border border-[#BE735B] rounded px-1 w-full outline-none"
                                        />
                                    ) : (
                                        <span className="text-base text-[#535862] font-normal truncate">{chat.name}</span>
                                    )}
                                    <div className="relative flex-shrink-0">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === chat.id ? null : chat.id); }}
                                            className="text-[#8C8C96] cursor-pointer hover:text-[#1E1E23]"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M11.9961 11.5C12.2613 11.5 12.5157 11.6054 12.7032 11.7929C12.8907 11.9804 12.9961 12.2348 12.9961 12.5C12.9961 12.7652 12.8907 13.0196 12.7032 13.2071C12.5157 13.3946 12.2613 13.5 11.9961 13.5C11.7309 13.5 11.4765 13.3946 11.289 13.2071C11.1015 13.0196 10.9961 12.7652 10.9961 12.5C10.9961 12.2348 11.1015 11.9804 11.289 11.7929C11.4765 11.6054 11.7309 11.5 11.9961 11.5ZM11.9961 5.5C12.2613 5.5 12.5157 5.60536 12.7032 5.79289C12.8907 5.98043 12.9961 6.23478 12.9961 6.5C12.9961 6.76522 12.8907 7.01957 12.7032 7.20711C12.5157 7.39464 12.2613 7.5 11.9961 7.5C11.7309 7.5 11.4765 7.39464 11.289 7.20711C11.1015 7.01957 10.9961 6.76522 10.9961 6.5C10.9961 6.23478 11.1015 5.98043 11.289 5.79289C11.4765 5.60536 11.7309 5.5 11.9961 5.5ZM11.9961 17.5C12.2613 17.5 12.5157 17.6054 12.7032 17.7929C12.8907 17.9804 12.9961 18.2348 12.9961 18.5C12.9961 18.7652 12.8907 19.0196 12.7032 19.2071C12.5157 19.3946 12.2613 19.5 11.9961 19.5C11.7309 19.5 11.4765 19.3946 11.289 19.2071C11.1015 19.0196 10.9961 18.7652 10.9961 18.5C10.9961 18.2348 11.1015 17.9804 11.289 17.7929C11.4765 17.6054 11.7309 17.5 11.9961 17.5Z" stroke="#484A54" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                        {menuOpenId === chat.id && (
                                            <div className="fixed inset-0 justify-center flex items-center bg-black/50 z-50">
                                                <div className="bg-white border border-[#E9EAEB] rounded-xl shadow-lg z-50 w-44 p-1.5 ">
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setEditingId(chat.id); setEditingName(chat.name); setMenuOpenId(null); }}
                                                        className="flex cursor-pointer items-center gap-2 w-full px-3 py-2 text-sm text-[#717680] hover:bg-gray-50"
                                                    >

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                            <path d="M9.7 1.82007L10.36 1.16007C10.6226 0.897507 10.9787 0.75 11.35 0.75C11.7213 0.75 12.0774 0.897507 12.34 1.16007C12.6026 1.42264 12.7501 1.77875 12.7501 2.15007C12.7501 2.52139 12.6026 2.87751 12.34 3.14007L11.68 3.80007M9.7 1.82007L5.26 6.26007C4.92178 6.59852 4.6819 7.02251 4.566 7.48674L4.08333 9.41674L6.014 8.93407C6.4783 8.81798 6.9023 8.57787 7.24067 8.23941L11.68 3.80007M9.7 1.82007L11.68 3.80007M11.4167 7.75007C11.4167 9.94207 11.4167 11.0374 10.8113 11.7754C10.7006 11.9103 10.5769 12.034 10.442 12.1447C9.70333 12.7501 8.60867 12.7501 6.41667 12.7501H6.08333C3.56933 12.7501 2.312 12.7501 1.53133 11.9687C0.750667 11.1874 0.75 9.93074 0.75 7.41674V7.0834C0.75 4.89207 0.75 3.79607 1.35533 3.05807C1.46644 2.92296 1.58956 2.79985 1.72467 2.68874C2.46333 2.0834 3.558 2.0834 5.75 2.0834" stroke="#414651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                        Rename Chat
                                                    </button>
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); setChats(prev => prev.filter(c => c.id !== chat.id)); setMenuOpenId(null); if (activeChat === chat.id) setActiveChat(chats[0]?.id ?? 1); }}
                                                        className="flex cursor-pointer items-center gap-2 w-full px-3 py-2 text-sm text-[#717680] hover:bg-gray-50"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                            <path d="M13 3.66659L12.5867 10.3499C12.4813 12.0573 12.4287 12.9113 12 13.5253C11.7884 13.8287 11.5159 14.0848 11.2 14.2773C10.562 14.6666 9.70667 14.6666 7.996 14.6666C6.28267 14.6666 5.426 14.6666 4.78667 14.2766C4.47059 14.0837 4.19814 13.8272 3.98667 13.5233C3.55867 12.9086 3.50667 12.0533 3.404 10.3433L3 3.66659M2 3.66659H14M10.704 3.66659L10.2487 2.72792C9.94667 2.10392 9.79533 1.79259 9.53467 1.59792C9.47676 1.5548 9.41545 1.51645 9.35133 1.48325C9.06267 1.33325 8.716 1.33325 8.02333 1.33325C7.31267 1.33325 6.95733 1.33325 6.66333 1.48925C6.59834 1.52406 6.53635 1.5642 6.478 1.60925C6.21467 1.81125 6.06733 2.13459 5.77267 2.78059L5.36867 3.66659M6.33333 10.9999V6.99992M9.66667 10.9999V6.99992" stroke="#484A54" stroke-width="1.5" stroke-linecap="round" />
                                                        </svg>
                                                        Delete Chat
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 hidden md:flex flex-col bg-[#F9F9F9]">
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-[#4F512D] flex-shrink-0" />}

                                    <div className="max-w-[60%]">
                                        {msg.type === 'audio' && (
                                            <div className="bg-[#ADB37D] rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[200px]">
                                                <button onClick={() => togglePlay(msg)} className="w-7 h-7 bg-white/30 rounded-full flex items-center justify-center flex-shrink-0">
                                                    {playingId === msg.id ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24">
                                                            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                                        </svg>
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="white" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    )}
                                                </button>
                                                <div className="flex items-center gap-0.5 flex-1">
                                                    {getWaveBars(msg.id).map((h, i) => (
                                                        <div key={i} className="w-1 bg-white/70 rounded-full" style={{ height: `${h}px` }} />
                                                    ))}
                                                </div>
                                                <span className="text-xs text-white/80 flex-shrink-0">{msg.audioDuration}</span>
                                            </div>
                                        )}

                                        {msg.type === 'text' && (
                                            <div className={`rounded-2xl px-3 py-3 ${msg.sender === 'user' ? 'bg-[#ADB37D] rounded-2xl' : 'bg-white border border-[#E9EAEB]'}`}>
                                                <div className="flex items-end gap-3">
                                                    <span className={`text-sm ${msg.sender === 'user' ? 'text-white' : 'text-[#1E1E23]'}`}>{msg.text}</span>
                                                    <span className={`text-xs flex-shrink-0 ${msg.sender === 'user' ? 'text-white/70' : 'text-[#8C8C96]'}`}>{msg.time}</span>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                    {msg.sender === 'user' && <img src={avatar.src} alt="avatar" width={40} height={40} />}

                                </div>
                            ))}

                            {loading && (
                                <div className="flex items-end gap-2 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-[#4F512D] flex-shrink-0" />
                                    <div className="bg-white border border-[#E9EAEB] rounded-2xl rounded-bl-none px-4 py-3 flex items-center gap-1">
                                        <span className="w-2 h-2 bg-[#ADB37D] rounded-full animate-bounce [animation-delay:0ms]"></span>
                                        <span className="w-2 h-2 bg-[#ADB37D] rounded-full animate-bounce [animation-delay:150ms]"></span>
                                        <span className="w-2 h-2 bg-[#ADB37D] rounded-full animate-bounce [animation-delay:300ms]"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        <div className="fixed bottom-4 right-6 left-128 z-40">
                            <div className="flex items-end border bg-white border-[#E2E8F0] rounded-xl shadow-md gap-3 p-4">
                                {recording ? (
                                    <div className="flex-1 flex items-center gap-3 text-sm text-red-500 py-2">
                                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                                        {`${String(Math.floor(recordingTime / 60)).padStart(2, '0')}:${String(recordingTime % 60).padStart(2, '0')}`}
                                    </div>
                                ) : (
                                    <textarea
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                                        placeholder="Message to Client..."
                                        rows={2}
                                        className="flex-1 resize-none text-sm text-[#1E1E23] placeholder:text-[#8C8C96] outline-none bg-transparent"
                                    />
                                )}

                                <div className="flex items-center gap-2 flex-shrink-0">
                                    {recording ? (
                                        <button
                                            onClick={stopRecording}
                                            className="w-9 h-9 rounded-full flex items-center justify-center bg-red-500 text-white animate-pulse"
                                            title="Stop recording"
                                        >
                                            <StopRecordIcon />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={startRecording}
                                            className="w-9 h-9 rounded-full cursor-pointer flex items-center justify-center bg-gray-100 text-[#8C8C96] hover:bg-gray-200 transition"
                                            title="Click to record voice"
                                        >
                                            <VoiceRecordIcon />
                                        </button>
                                    )}
                                    <button
                                        onClick={sendMessage}
                                        disabled={!input.trim() || loading}
                                        className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-[#BE735B] text-white font-medium text-sm rounded-md hover:bg-[#A86550] transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Send
                                        <SandDataIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
