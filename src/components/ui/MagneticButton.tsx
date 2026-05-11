"use client";
import React from "react";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}

export default function MagneticButton({ variant = "primary", children, className = "", ...props }: MagneticButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:scale-[1.03] outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-primary";
  
  const primaryClasses = "px-8 py-4 rounded-[2rem] bg-accent text-white overflow-hidden group border border-transparent";
  const ghostClasses = "px-8 py-4 rounded-[2rem] bg-transparent text-text-primary hover:text-accent border border-border hover:border-accent/30";

  return (
    <button 
      className={`${baseClasses} ${variant === "primary" ? primaryClasses : ghostClasses} ${className}`}
      {...props}
    >
      {variant === "primary" && (
        <span className="absolute inset-0 bg-accent-glow -translate-x-full group-hover:translate-x-0 transition-transform duration-[400ms] ease-out pointer-events-none" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
