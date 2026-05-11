"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cases } from "@/content/cases";
import Badge from "../ui/Badge";

gsap.registerPlugin(ScrollTrigger);

export default function Cases() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const caseCards = gsap.utils.toArray<HTMLElement>(".case-card");
      
      caseCards.forEach((card) => {
        const starBlocks = card.querySelectorAll(".star-block");
        
        if (prefersReducedMotion) {
          gsap.to(starBlocks, {
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          });
        } else {
          gsap.fromTo(
            starBlocks,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              }
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cases" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-bg-primary">
      <div className="max-w-6xl mx-auto space-y-24 md:space-y-40">
        
        <div className="space-y-4">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em]">01. Cases</h2>
          <h3 className="font-sans font-bold tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary">
            Os Trabalhos
          </h3>
        </div>

        <div className="space-y-24 md:space-y-32">
          {cases.map((item, index) => {
            // Alternância: index 0 (case 1) fica normal, index 1 (case 2) espelhado
            const isMirror = index % 2 !== 0; 
            const numberString = String(index + 1).padStart(2, "0");

            return (
              <div 
                key={index} 
                className={`case-card group relative flex flex-col md:flex-row gap-12 md:gap-24 p-8 md:p-12 rounded-[2.5rem] border border-border hover:border-accent hover:-translate-y-1 transition-all duration-300 bg-bg-surface overflow-hidden ${isMirror ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="absolute inset-0 bg-accent-glow opacity-0 group-hover:opacity-[0.05] transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Lado Esquerdo / Descritivo */}
                <div className="w-full md:w-[40%] flex flex-col items-start relative z-10">
                  <span className="font-mono text-[clamp(3rem,6vw,5rem)] text-accent font-bold leading-none mb-6">
                    {numberString}
                  </span>
                  <p className="font-mono text-sm text-text-muted uppercase mb-4">
                    {item.client}
                  </p>
                  <h4 className="font-sans font-semibold text-[clamp(1.5rem,3vw,2.5rem)] leading-tight text-text-primary mb-8">
                    {item.title}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {item.tags.map(tag => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                </div>

                {/* Lado Direito / STAR Framework */}
                <div className="w-full md:w-[60%] flex flex-col gap-8 relative z-10">
                  <div className="star-block opacity-0">
                    <p className="font-mono text-[0.75rem] text-text-muted uppercase tracking-wider mb-2">Situation</p>
                    <p className="font-sans text-text-secondary leading-relaxed">{item.situation}</p>
                  </div>
                  
                  <div className="star-block opacity-0">
                    <p className="font-mono text-[0.75rem] text-text-muted uppercase tracking-wider mb-2">Task</p>
                    <p className="font-sans text-text-secondary leading-relaxed">{item.task}</p>
                  </div>

                  <div className="star-block opacity-0">
                    <p className="font-mono text-[0.75rem] text-text-muted uppercase tracking-wider mb-2">Action</p>
                    <p className="font-sans text-text-secondary leading-relaxed">{item.action}</p>
                  </div>

                  <div className="star-block opacity-0 bg-bg-elevated p-6 md:p-8 rounded-[1.5rem] mt-4 border border-border">
                    <p className="font-mono text-[0.75rem] text-text-muted uppercase tracking-wider mb-4">Result</p>
                    <div className="flex flex-col gap-2">
                      <span className="font-serif italic text-accent text-4xl md:text-5xl">{item.result_metric}</span>
                      <span className="font-sans text-text-primary leading-relaxed font-medium mt-2">{item.result_text}</span>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
