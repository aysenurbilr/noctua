import * as React from "react";

export function Card({
    className = "",
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & { className?: string; children: React.ReactNode }) {
    return (
        <div className={`bg-white shadow-md rounded-2xl p-6 ${className}`} {...props}>
            {children}
        </div>
    );
}

export function CardContent({ children }: { children: React.ReactNode }) {
    return <div className="mt-2">{children}</div>;
}
