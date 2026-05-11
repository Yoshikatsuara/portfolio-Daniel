"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stack } from "@/content/stack";

gsap.registerPlugin(ScrollTrigger);

export default function Stack() {
  const containerRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [pathLength, setPathLength] = useState(3000);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // DESKTOP (Horizontal Scroll-Jacking Cinematográfico)
      mm.add("(min-width: 768px)", () => {
        if (prefersReducedMotion) return;
        
        const track = trackRef.current;
        if (!track) return;

        // Distância de rolagem = toda a largura da esteira menos a janela
        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

        // A esteira rolando para a esquerda
        const tween = gsap.to(track, {
          x: getScrollAmount,
          ease: "none",
          force3D: true, // Força a placa de vídeo (GPU) a rasterizar
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1, // Momentum ideal para tracking limpo
            anticipatePin: 1, // Previne stutter na hora de travar a tela
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Atualiza o Progresso Circular apenas
              const dashoffset = 201 - (self.progress * 201);
              gsap.set(".progress-circle", { strokeDashoffset: dashoffset });
            }
          }
        });

        // Removidas as animações individuais de opacidade e escala em cada card.
        // O efeito 'clean' vem do scroll ininterrupto e sólido, sem elementos piscando ou mudando de tamanho.
      });

      // MOBILE (Vertical Linear Padrão)
      mm.add("(max-width: 767px)", () => {
        if (prefersReducedMotion) return;
        gsap.fromTo(
          ".stack-card-mobile",
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
              toggleActions: "play none none reverse"
            }
          }
        );
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={containerRef} className="bg-bg-surface border-y border-border relative overflow-hidden">
      
      {/* KEYFRAMES CSS PARA O LED */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes trace-led {
          0% { stroke-dashoffset: var(--path-length, 3000); }
          100% { stroke-dashoffset: 0; }
        }
        .animate-led {
          animation: trace-led 8s linear infinite;
        }
      `}} />

      {/* GLOW ESTÁTICO (Falso Neon super leve para a GPU) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] md:w-[600px] md:h-[300px] bg-accent/20 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* SÍMBOLO DO INFINITO + NEON LED (Sem drop-shadow dinâmico) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 opacity-40">
        <svg
          className="w-[400px] md:w-[700px]"
          viewBox="0 0 800 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* TRILHO BASE MAIS VISÍVEL E GROSSO */}
          <path
            d="M 400,200 C 500,50 750,50 750,200 C 750,350 500,350 400,200 C 300,50 50,50 50,200 C 50,350 300,350 400,200 Z"
            stroke="var(--accent)"
            strokeWidth="8"
            strokeOpacity="0.4"
          />

          {/* LED ANIMADO EXTREMAMENTE GROSSO E COM MUITO BRILHO */}
          <path
            ref={pathRef}
            d="M 400,200 C 500,50 750,50 750,200 C 750,350 500,350 400,200 C 300,50 50,50 50,200 C 50,350 300,350 400,200 Z"
            stroke="var(--accent)"
            strokeWidth="24"
            strokeLinecap="round"
            className={isVisible ? "animate-led" : ""}
            style={{ 
              strokeDasharray: `0.1 ${pathLength}`, 
              '--path-length': pathLength 
            } as React.CSSProperties}
          />
        </svg>
      </div>

      {/* ========================================= */}
      {/* MOBILE VIEW: GRID LINEAR PADRÃO           */}
      {/* ========================================= */}
      <div className="md:hidden flex flex-col gap-6 w-full max-w-6xl mx-auto px-6 py-24 relative z-10">
        <div className="w-full text-center mb-12">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em]">02. Stack</h2>
          <h3 className="font-sans font-bold tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary">
            Arsenal
          </h3>
        </div>

        {stack.map((category, i) => (
          <div key={"mobile-" + i} className="stack-card-mobile opacity-0 relative overflow-hidden bg-bg-elevated border border-border p-8 rounded-[2rem]">
            <div className="relative z-10">
              <h4 className="font-sans font-bold text-xl text-text-primary mb-6 pb-4 border-b border-border/50">
                {category.category}
              </h4>
              <ul className="space-y-4">
                {category.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30"></span>
                    <span className="font-mono text-sm uppercase tracking-wide text-text-secondary leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================= */}
      {/* DESKTOP VIEW: SCROLL-JACKING HORIZONTAL   */}
      {/* ========================================= */}
      <div className="hidden md:block relative h-screen w-full overflow-hidden">
        
        {/* Título Fixo durante o scroll */}
        <div className="absolute top-24 lg:top-32 left-16 lg:left-24 z-20 pointer-events-none">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em]">02. Stack</h2>
          <h3 className="font-sans font-bold tracking-[-0.03em] text-[clamp(2.5rem,5vw,4rem)] leading-tight text-text-primary">
            Arsenal
          </h3>
        </div>

        {/* Indicador de Progresso Circular (Aparece apenas na rolagem do Desktop) */}
        <div className="absolute bottom-24 left-16 lg:left-24 z-30 flex items-center justify-center">
          <svg className="w-[72px] h-[72px] transform -rotate-90">
            {/* Círculo de Fundo */}
            <circle cx="36" cy="36" r="32" stroke="var(--border)" strokeWidth="2" fill="none" opacity="0.3" />
            {/* Círculo Animado (Sem drop shadow para não travar a rolagem) */}
            <circle 
              className="progress-circle"
              cx="36" cy="36" r="32" 
              stroke="var(--accent)" 
              strokeWidth="4" 
              fill="none" 
              strokeDasharray="201" 
              strokeDashoffset="201" 
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Esteira Animada (Track) */}
        <div className="flex h-full items-center w-full pt-24 lg:pt-32">
          <div ref={trackRef} className="flex gap-16 lg:gap-32 pl-[40vw] pr-[50vw] items-center w-max h-full">
            {stack.map((category, i) => (
              <div 
                key={"horiz-" + i} 
                className="horizontal-card will-change-transform w-[420px] lg:w-[480px] h-[500px] lg:h-[580px] bg-[#15151F] border border-border/40 p-12 lg:p-14 rounded-[2.5rem] flex flex-col shrink-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]"
              >
                <h4 className="font-sans font-bold text-[26px] lg:text-[32px] text-text-primary mb-10 pb-6 border-b border-border/50">
                  {category.category.split(' ').map((word, idx, arr) => (
                    <span key={idx} className={idx === arr.length - 1 ? "font-serif italic text-accent font-normal text-[1.1em] ml-1" : ""}>
                      {word}{idx < arr.length - 1 ? " " : ""}
                    </span>
                  ))}
                </h4>
                
                <ul className="space-y-6 flex-1">
                  {category.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-5 group/item cursor-default">
                      <span className="w-2 h-2 rounded-full bg-accent/40 shadow-[0_0_8px_1px_var(--accent-glow)] group-hover/item:bg-accent transition-colors duration-300"></span>
                      <span className="font-mono text-[15px] lg:text-[17px] uppercase tracking-widest text-text-secondary group-hover/item:text-text-primary transition-colors duration-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
