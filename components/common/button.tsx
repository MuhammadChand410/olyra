interface ButtonProps {
    icon?: React.ReactNode;
    text: string;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    className?: string;
}

export default function Button({ className, icon, text, onClick, type = 'button', disabled = false }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center gap-2 cursor-pointer rounded-md text-sm text-white font-medium transition disabled:opacity-50 disabled:cursor-not-allowed ${className || ''}`}
        >
            {text}
            {icon}
        </button>
    )
}