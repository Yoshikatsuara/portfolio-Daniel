"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function SplitText({ children, className = "" }: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".split-word");
      
      if (prefersReducedMotion) {
        gsap.to(elements, { 
          opacity: 1, 
          duration: 1, 
          stagger: 0.08, 
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top 85%" 
          } 
        });
      } else {
        gsap.fromTo(
          elements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
