// interface ButtonProps {
//     icon?: React.ReactNode;
//     text: string;
//     onClick?: () => void;
//     type?: 'button' | 'submit' | 'reset';
//     disabled?: boolean;
//     className?: string;
// }

// export default function Button({ className, icon, text, onClick, type = 'button', disabled = false }: ButtonProps) {
//     return (
//         <button
//             type={type}
//             onClick={onClick}
//             disabled={disabled}
//             className={`flex items-center gap-2 cursor-pointer rounded-md text-sm text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}
//         >
//             {text}
//             {icon}
//         </button>
//     )
// }

"use client";

import Link from "next/link";

interface ButtonProps {
    icon?: React.ReactNode;
    text: string;
    path?: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    className?: string;
}

export default function Button({
    path,
    className = "",
    icon,
    text,
    onClick,
    type = "button",
    disabled = false,
}: ButtonProps) {

    const baseClasses =
        "flex items-center gap-2 rounded-md text-sm font-medium transition px-3 py-2.5";

    const enabledClasses =
        "bg-[#4F512D] text-white hover:bg-[#3F4125]";

    const disabledClasses =
        "bg-gray-300 text-gray-500 cursor-not-allowed";

    // 🔹 अगर path hai → Link render karo
    if (path) {
        return (
            <Link
                href={disabled ? "#" : path}
                aria-label={text}
                className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses
                    } ${className}`}
                onClick={(e) => {
                    if (disabled) e.preventDefault();
                    onClick?.();
                }}
            >
                {icon && <span aria-hidden="true">{icon}</span>}
                <span>{text}</span>
            </Link>
        );
    }

    // 🔹 warna button render karo
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            aria-label={text}
            className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses
                } ${className}`}
        >
            {icon && <span aria-hidden="true">{icon}</span>}
            <span>{text}</span>
        </button>
    );
}