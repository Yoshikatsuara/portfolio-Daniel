"use client";
import { ArrowDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex justify-center">
      <div className="animate-bounce text-text-muted">
        <ArrowDown size={20} strokeWidth={2} />
      </div>
    </div>
  );
}
