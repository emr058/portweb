"use client";

import { cn } from "@/utils/cn";
import { ReactNode } from "react";

interface SectionProps {
    id?: string;
    className?: string;
    children: ReactNode;
    fullWidth?: boolean;
}

export const Section = ({ id, className, children, fullWidth = false }: SectionProps) => {
    return (
        <section
            id={id}
            className={cn("py-20 md:py-32", className)}
        >
            <div className={cn("container mx-auto px-4", !fullWidth && "max-w-5xl")}>
                {children}
            </div>
        </section>
    );
};
