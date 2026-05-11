"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../animations/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement = "Eu foco em decisões certas.".split(" ");

  return (
    <section 
      id="philosophy" 
      ref={sectionRef} 
      className="relative py-32 md:py-48 px-6 bg-bg-primary border-y border-accent overflow-hidden flex items-center justify-center min-h-[70vh]"
    >
      {/* Background Parallax - Dark Marble */}
      <div 
        ref={bgRef}
        className="absolute inset-[-20%] w-[140%] h-[140%] opacity-[0.08] pointer-events-none z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1600170311833-c2cf5280ce49?q=80&w=2000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10 max-w-[900px] w-full mx-auto flex flex-col items-center text-center">
        <p className="font-mono text-text-muted text-sm tracking-[0.1em] uppercase mb-8 md:mb-12">
          COMO EU TRABALHO
        </p>
        
        <p className="font-sans font-bold text-text-primary text-[clamp(1.5rem,4vw,2.5rem)] leading-tight mb-4 md:mb-6">
          A maioria foca em dashboards bonitos.
        </p>

        <SplitText className="flex flex-wrap justify-center font-serif italic text-[clamp(3rem,8vw,6rem)] leading-tight text-text-primary">
          {statement.map((word, i) => {
            const isHighlight = word.includes("decisões") || word.includes("certas");
            return (
              <span key={i} className={`split-word opacity-0 mr-[0.25em] ${isHighlight ? "text-accent" : ""}`}>
                {word}
              </span>
            );
          })}
        </SplitText>
      </div>
    </section>
  );
}
