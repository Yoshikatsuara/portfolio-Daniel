"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stack } from "@/content/stack";

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(".stack-card", {
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse"
          }
        });
      } else {
        gsap.fromTo(
          ".stack-card",
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-bg-surface border-y border-border">
      <div className="max-w-6xl mx-auto space-y-16">
        
        <div className="space-y-4 text-center md:text-left">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em]">02. Stack</h2>
          <h3 className="font-sans font-bold tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary">
            Arsenal
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stack.map((category, i) => (
            <div key={i} className="stack-card opacity-0 bg-bg-elevated border border-border p-8 rounded-[2rem] hover:border-accent transition-colors duration-300">
              <h4 className="font-sans font-semibold text-xl text-text-primary mb-6 pb-4 border-b border-border/50">
                {category.category}
              </h4>
              <ul className="space-y-4">
                {category.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    {/* Micro-indicador estilo telemetria */}
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                    <span className="font-mono text-sm uppercase tracking-wide text-text-secondary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
