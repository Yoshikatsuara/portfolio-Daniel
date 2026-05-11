"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "@/content/profile";
import MagneticButton from "../ui/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.to(".contact-col", { opacity: 1, duration: 1 });
      } else {
        gsap.fromTo(
          ".contact-col-left",
          { x: -50, y: 30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
        gsap.fromTo(
          ".contact-col-right",
          { x: 50, y: 30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contato" ref={containerRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-mono text-text-muted uppercase tracking-[0.02em] mb-12 md:mb-20 text-center md:text-left">
          04. Contato
        </h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          
          {/* Esquerda: Recrutadores */}
          <div className="contact-col contact-col-left opacity-0 w-full md:w-1/2 flex flex-col">
            <h3 className="font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-text-primary mb-4">
              Buscando talento?
            </h3>
            <p className="font-sans text-[1.125rem] leading-[1.6] text-text-secondary mb-10 max-w-md">
              Customer Success Analyst com pegada analítica, aberto a oportunidades CLT em SP ou remoto.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
              {/* TODO: Daniel adiciona o PDF em public/ */}
              <MagneticButton variant="primary" className="w-full sm:w-auto opacity-50 cursor-not-allowed" disabled>
                Baixar CV (PT)
              </MagneticButton>
              {profile.cvEn ? (
                <a href={profile.cvEn} download>
                  <MagneticButton variant="ghost" className="w-full sm:w-auto">Download CV (EN)</MagneticButton>
                </a>
              ) : (
                <MagneticButton variant="ghost" className="w-full sm:w-auto opacity-50 cursor-not-allowed" disabled>
                  Download CV (EN)
                </MagneticButton>
              )}
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <MagneticButton variant="ghost" className="w-full sm:w-auto">LinkedIn</MagneticButton>
              </a>
            </div>

            <a href={`mailto:${profile.email}`} className="font-mono text-accent hover:text-text-primary transition-colors duration-300 w-fit">
              {profile.email}
            </a>
          </div>

          {/* Divisor mobile */}
          <div className="md:hidden w-full h-[1px] bg-border my-4"></div>

          {/* Direita: Clientes */}
          <div className="contact-col contact-col-right opacity-0 w-full md:w-1/2 flex flex-col">
            <h3 className="font-sans font-bold text-[clamp(2rem,4vw,3rem)] leading-tight text-text-primary mb-4">
              Precisa resolver um problema?
            </h3>
            <p className="font-sans text-[1.125rem] leading-[1.6] text-text-secondary mb-10 max-w-md">
              Projetos freelance de análise de dados, automação de operação e implementação de IA para SMB.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-10">
              <a href={profile.whatsapp} target="_blank" rel="noopener noreferrer">
                <MagneticButton variant="primary" className="w-full sm:w-auto">WhatsApp</MagneticButton>
              </a>
              <a href="#">
                <MagneticButton variant="ghost" className="w-full sm:w-auto">Workana</MagneticButton>
              </a>
              <a href={`mailto:${profile.email}`}>
                <MagneticButton variant="ghost" className="w-full sm:w-auto">Email</MagneticButton>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
