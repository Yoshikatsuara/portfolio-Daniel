"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import MagneticButton from "../ui/MagneticButton";
import ScrollIndicator from "../ui/ScrollIndicator";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respeito à preferência de acessibilidade do usuário
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ctx: gsap.Context;

    const runAnimation = () => {
      ctx = gsap.context(() => {
        if (prefersReducedMotion) {
          gsap.to(".hero-anim", { opacity: 1, duration: 1, stagger: 0.15 });
        } else {
          gsap.fromTo(
            ".hero-anim",
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" }
          );
        }
      }, containerRef);
    };

    // Fica aguardando o evento do preloader para iniciar a animação
    window.addEventListener("preloaderComplete", runAnimation);

    // Se o preloader já terminou antes (ou se o usuário removeu ele manualmente), dá fallback de 3s
    // Mas no caso feliz, o event listener pega e roda logo
    const fallbackTimeout = setTimeout(() => {
      if (!ctx) runAnimation();
    }, 4000);

    return () => {
      window.removeEventListener("preloaderComplete", runAnimation);
      clearTimeout(fallbackTimeout);
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative min-h-[100dvh] w-full flex flex-col justify-end pb-24 md:pb-32 px-6 md:px-16 lg:px-24 bg-gradient-to-b from-bg-primary to-bg-surface">
      <div className="max-w-5xl w-full">
        <h1 className="hero-anim opacity-0 font-sans font-extrabold tracking-[-0.04em] text-[clamp(3rem,8vw,7rem)] leading-none text-text-primary mb-2 md:mb-4">
          Dados que viram
        </h1>
        <h2 className="hero-anim opacity-0 font-serif italic font-normal text-[clamp(3.5rem,9vw,8rem)] leading-none text-text-primary mb-8 md:mb-12">
          decisão.
        </h2>
        
        <p className="hero-anim opacity-0 font-sans text-[1.125rem] md:text-[1.25rem] leading-[1.7] text-text-secondary max-w-2xl mb-12">
          Customer Success Analyst com pegada analítica. Três anos transformando
          operação de retail digital em conversa útil com cliente — Amazon,
          Mercado Livre, ciclo de renovação, treinamento de time.
        </p>

        <div className="hero-anim opacity-0 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start">
          <MagneticButton 
            variant="primary" 
            onClick={() => gsap.to(window, { duration: 1.5, scrollTo: "#cases", ease: "power3.inOut" })}
          >
            Ver cases
          </MagneticButton>
          <MagneticButton 
            variant="ghost"
            onClick={() => gsap.to(window, { duration: 1.5, scrollTo: "#contato", ease: "power3.inOut" })}
          >
            Falar comigo
          </MagneticButton>
        </div>
      </div>

      <ScrollIndicator />

      {/* Sentinel Element para a Navbar observar o final do Hero */}
      <div id="hero-end-trigger" className="absolute bottom-16 left-0 w-full h-[1px] pointer-events-none opacity-0"></div>
    </section>
  );
}
