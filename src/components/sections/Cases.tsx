"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cases } from "@/content/cases";

gsap.registerPlugin(ScrollTrigger);

export default function Cases() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Header animation
      if (prefersReducedMotion) {
        gsap.to(".cases-header", {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: ".cases-header",
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        });
      } else {
        gsap.fromTo(
          ".cases-header",
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cases-header",
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      }

      // Cards animation
      const caseCards = gsap.utils.toArray<HTMLElement>(".case-card");
      caseCards.forEach((card, index) => {
        const isMirror = index % 2 !== 0; 
        const xOffset = isMirror ? 100 : -100;

        if (prefersReducedMotion) {
          gsap.to(card, {
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play reverse play reverse"
            }
          });
        } else {
          gsap.fromTo(
            card,
            { x: xOffset, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
              }
            }
          );
        }
      });
      
      // Indicators animation
      const indicators = gsap.utils.toArray<HTMLElement>(".case-indicator");
      if (prefersReducedMotion) {
        gsap.to(indicators, {
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse"
          }
        });
      } else {
        indicators.forEach((indicator) => {
          gsap.fromTo(
            indicator,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: indicator,
                start: "top 90%",
                toggleActions: "play reverse play reverse"
              }
            }
          );
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="cases" ref={containerRef} className="relative py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-bg-primary overflow-hidden">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float-bob {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .float-icon {
            animation: none !important;
            transform: none !important;
          }
        }
      `}} />

      {/* ÍCONES TÉCNICOS FLUTUANTES */}
      <div className="absolute top-[8%] right-[6%] z-[5] pointer-events-none opacity-[0.25] text-accent float-icon" style={{ animation: 'float-bob 5s infinite alternate ease-in-out' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="5" width="50" height="50" rx="4" />
          <line x1="21.6" y1="5" x2="21.6" y2="55" />
          <line x1="38.3" y1="5" x2="38.3" y2="55" />
          <line x1="5" y1="21.6" x2="55" y2="21.6" />
          <line x1="5" y1="38.3" x2="55" y2="38.3" />
        </svg>
      </div>

      <div className="absolute top-[35%] left-[4%] z-[5] pointer-events-none opacity-[0.22] text-accent float-icon" style={{ animation: 'float-bob 6s infinite alternate ease-in-out' }}>
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="5,35 25,20 40,25 60,10 75,5" />
          <circle cx="5" cy="35" r="2" fill="currentColor" />
          <circle cx="25" cy="20" r="2" fill="currentColor" />
          <circle cx="40" cy="25" r="2" fill="currentColor" />
          <circle cx="60" cy="10" r="2" fill="currentColor" />
          <circle cx="75" cy="5" r="2" fill="currentColor" />
        </svg>
      </div>

      <div className="absolute bottom-[18%] right-[8%] z-[5] pointer-events-none opacity-[0.28] text-accent float-icon" style={{ animation: 'float-bob 4.5s infinite alternate ease-in-out' }}>
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="25" width="6" height="20" />
          <rect x="17" y="15" width="6" height="30" />
          <rect x="29" y="30" width="6" height="15" />
          <rect x="41" y="5" width="6" height="40" />
        </svg>
      </div>

      <div className="absolute top-[22%] left-[12%] z-[5] pointer-events-none opacity-[0.25] text-accent float-icon" style={{ animation: 'float-bob 5.5s infinite alternate ease-in-out' }}>
        <div className="font-mono text-[36px] font-light">{"{ }"}</div>
      </div>

      <div className="absolute bottom-[45%] left-[38%] z-[5] pointer-events-none opacity-[0.22] text-accent float-icon" style={{ animation: 'float-bob 7s infinite alternate ease-in-out' }}>
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1">
          <polygon points="30,5 55,19.5 55,40.5 30,55 5,40.5 5,19.5" />
        </svg>
      </div>

      <div className="absolute top-[55%] right-[5%] z-[5] pointer-events-none opacity-[0.28] text-accent float-icon" style={{ animation: 'float-bob 4s infinite alternate ease-in-out' }}>
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="35" cy="15" r="4" />
          <circle cx="15" cy="40" r="4" />
          <circle cx="55" cy="40" r="4" />
          <circle cx="25" cy="60" r="4" />
          <circle cx="45" cy="60" r="4" />
          <line x1="35" y1="19" x2="15" y2="36" />
          <line x1="35" y1="19" x2="55" y2="36" />
          <line x1="15" y1="44" x2="25" y2="56" />
          <line x1="55" y1="44" x2="45" y2="56" />
          <line x1="25" y1="60" x2="45" y2="60" />
          <line x1="15" y1="40" x2="55" y2="40" />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col">
        
        {/* A) HEADER DA SEÇÃO */}
        <div className="cases-header opacity-0 w-full mb-[56px] border-b-[0.5px] border-b-border pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
          {/* ESQUERDA */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-accent text-[11px] tracking-[3px] uppercase">
                01 / Cases
              </span>
              <div className="w-[60px] h-[0.5px] bg-accent opacity-40"></div>
            </div>
            <h3 className="font-sans font-bold text-text-primary text-[clamp(2.5rem,5vw,3rem)] leading-none tracking-[-0.03em]">
              Os Trabalhos.
            </h3>
          </div>

          {/* DIREITA */}
          <div className="flex flex-col md:items-end gap-1">
            <span className="font-mono text-text-muted text-[10px] tracking-[2px] uppercase">
              Total
            </span>
            <span className="font-serif italic text-accent text-[24px] leading-none">
              {String(cases.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* LISTA DE CASES */}
        <div className="flex flex-col space-y-[32px]">
          {cases.map((item, index) => {
            const isMirror = index % 2 !== 0; 
            const numberString = String(index + 1).padStart(2, "0");
            const isLast = index === cases.length - 1;

            // Borda condicional (ímpar=esquerda, par=direita)
            const cardClasses = isMirror 
              ? "border-r-[3px] border-r-accent" 
              : "border-l-[3px] border-l-accent";

            // Cantos assimétricos condicionados
            const borderStyles = isMirror 
              ? { borderTopRightRadius: '0px', borderTopLeftRadius: '24px', borderBottomLeftRadius: '24px', borderBottomRightRadius: '4px' }
              : { borderTopLeftRadius: '0px', borderTopRightRadius: '24px', borderBottomRightRadius: '24px', borderBottomLeftRadius: '4px' };

            const labelPosition = isMirror ? "right-[24px]" : "left-[24px]";

            // Margens para espelhamento global
            const marginClasses = isMirror
              ? "md:ml-[8%] md:mr-0"
              : "md:ml-0 md:mr-[8%]";

            return (
              <React.Fragment key={item.slug}>
                <div 
                  className={`case-card opacity-0 relative flex flex-col w-full ${marginClasses}`}
                >
                  <div 
                    className={`relative bg-bg-surface ${cardClasses} p-[24px] md:p-[28px] hover:-translate-y-1 transition-transform duration-300 w-full`}
                    style={borderStyles}
                  >
                    {/* LABEL "CASE_NN" TÉCNICO */}
                    <div className={`absolute top-[-16px] ${labelPosition} bg-bg-primary px-[16px] font-mono text-[13px] text-accent tracking-[3px] font-semibold leading-none flex items-center justify-center h-[32px] z-[2]`}>
                      CASE_{numberString}
                    </div>

                    {/* NÚMERO GRANDE COMO MARCA D'ÁGUA VOLTA AO TOPO DIREITO DO CARD */}
                    <div 
                      className="absolute top-[24px] right-[32px] font-mono font-bold text-[56px] text-[#0D0D12] leading-[0.8] select-none pointer-events-none z-0"
                    >
                      {numberString}
                    </div>

                    {/* CONTEÚDO DO CARD */}
                    <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-8 text-left items-start">
                      
                      {/* Lado Esquerdo: Conteúdo Principal */}
                      <div className="flex-1 max-w-[700px] flex flex-col items-start w-full">
                        <p className="font-mono text-[12px] text-text-muted uppercase tracking-[2px] mb-3">
                          {item.client}
                        </p>
                        <h4 className="font-sans font-bold text-[24px] text-text-primary leading-[1.3] mb-4 max-w-[85%]">
                          {item.title}
                        </h4>
                        <p className="font-sans text-[16px] text-text-secondary leading-[1.65] mb-6">
                          {item.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap justify-start gap-2 mt-auto">
                          {item.tags.map(tag => (
                            <span key={tag} className="border border-border rounded-[4px] px-[12px] py-[6px] font-mono text-[12px] uppercase tracking-[1px] text-text-secondary hover:border-accent transition-colors duration-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Lado Direito: RESULT */}
                      <div className="flex-shrink-0 w-full md:w-auto md:min-w-[260px] md:pl-[40px] md:border-l-[0.5px] md:border-l-border pt-[24px] md:pt-0 border-t-[0.5px] border-t-border md:border-t-0 flex flex-col items-start h-full">
                        
                        <p className="font-mono text-[11px] text-text-muted uppercase tracking-[2px] mb-[16px] md:mb-0">
                          RESULTADO
                        </p>
                        
                        <div className="flex flex-col items-start justify-center flex-1 w-full pt-[16px] pb-[16px] mt-[40px] md:mt-[60px]">
                          <span className="font-serif italic text-accent text-[clamp(36px,4vw,56px)] leading-[1.15] mb-[12px] whitespace-pre-line">
                            {item.result_metric}
                          </span>
                          
                          {/* Traço separador */}
                          <div className="w-[32px] h-[1px] bg-border mb-[12px]"></div>
                          
                          <span className="font-sans text-[16px] text-text-secondary leading-[1.4] pr-4">
                            {item.result_text}
                          </span>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>

                {/* INDICADOR DE CONTINUAÇÃO ENTRE CARDS */}
                {!isLast && (
                  <div className="case-indicator opacity-0 w-full flex justify-center py-[16px]">
                    <span className="font-mono text-[12px] text-text-muted tracking-[3px] uppercase text-center">
                      ↓ CASE_{String(index + 2).padStart(2, "0")} — {cases[index + 1].client.split('·')[0].trim()}
                    </span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
