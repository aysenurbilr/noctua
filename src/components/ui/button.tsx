import React from "react";

export function Button({
    children,
    onClick,
    className = "",
}: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition ${className}`}
        >
            {children}
        </button>
    );
}
