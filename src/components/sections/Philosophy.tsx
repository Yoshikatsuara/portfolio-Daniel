"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "../animations/SplitText";

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hexOuterRef = useRef<SVGSVGElement>(null);
  const hexInnerRef = useRef<SVGSVGElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Glow pulsante (15% to 28% opacity)
      gsap.to(glowRef.current, {
        opacity: 0.28,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });

      // Rotação hexágono externo (360deg in 15s)
      gsap.to(hexOuterRef.current, {
        rotation: 360,
        duration: 15,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });

      // Rotação hexágono interno (-360deg in 10s)
      gsap.to(hexInnerRef.current, {
        rotation: -360,
        duration: 10,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center"
      });

      // Opacidade do label (0.5 to 0.9 in 5s loop -> 2.5s duration)
      gsap.to(labelRef.current, {
        opacity: 0.9,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });

      // Opacidade das palavras accent (0.7 to 1.0 in 3s loop -> 1.5s duration)
      const accentElements = gsap.utils.toArray<HTMLElement>(".pulse-accent");
      gsap.fromTo(accentElements, 
        { opacity: 1 }, 
        {
          opacity: 0.7,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
          delay: 2 // Wait for SplitText entrance animation to finish
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement = "Eu foco em decisões certas.".split(" ");

  return (
    <section 
      id="philosophy" 
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 bg-bg-primary overflow-hidden flex items-center justify-center min-h-[70vh]"
      style={{
        borderTop: "1px solid rgba(59, 91, 255, 0.4)",
        borderBottom: "1px solid rgba(59, 91, 255, 0.4)"
      }}
    >
      {/* CAMADA 2 - Grid técnico */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--accent) 0.5px, transparent 0.5px),
            linear-gradient(to bottom, var(--accent) 0.5px, transparent 0.5px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* CAMADA 3 - Glow radial pulsante */}
      <div 
        ref={glowRef}
        className="absolute inset-0 pointer-events-none z-0 opacity-15"
        style={{
          background: "radial-gradient(circle at 50% 60%, var(--accent) 0%, transparent 45%)"
        }}
      />

      {/* CAMADA 4 - Hexágono Técnico */}
      <div className="absolute top-[60px] right-[70px] hidden md:flex items-center justify-center pointer-events-none z-10 w-[50px] h-[50px]">
        {/* Hexágono externo (50px diâmetro) */}
        <svg ref={hexOuterRef} className="absolute inset-0 opacity-60" viewBox="0 0 50 50">
          <polygon 
            points="25,0 46.65,12.5 46.65,37.5 25,50 3.35,37.5 3.35,12.5" 
            fill="none" 
            stroke="var(--accent)" 
            strokeWidth="1" 
          />
        </svg>
        {/* Hexágono interno (30px diâmetro) */}
        <svg ref={hexInnerRef} className="absolute m-auto opacity-50" viewBox="0 0 30 30" style={{ width: 30, height: 30 }}>
          <polygon 
            points="15,0 27.99,7.5 27.99,22.5 15,30 2.01,22.5 2.01,7.5" 
            fill="none" 
            stroke="var(--accent)" 
            strokeWidth="0.6" 
          />
        </svg>
        {/* Ponto central */}
        <div className="absolute w-[4px] h-[4px] rounded-full bg-accent" />
      </div>

      {/* CAMADA 5 - Textos */}
      <div className="relative z-20 max-w-[900px] w-full mx-auto flex flex-col items-center text-center">
        <p 
          ref={labelRef}
          className="font-mono text-text-muted text-sm tracking-[0.1em] uppercase mb-8 md:mb-12 opacity-50"
        >
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
                {isHighlight ? (
                  <span className="inline-block pulse-accent">{word}</span>
                ) : (
                  word
                )}
              </span>
            );
          })}
        </SplitText>
      </div>
    </section>
  );
}
