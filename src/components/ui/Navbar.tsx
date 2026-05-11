"use client";
import React, { useState, useEffect } from "react";
import MagneticButton from "./MagneticButton";
import { Menu, X, ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Força o scroll pro topo ao recarregar a página
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Usando IntersectionObserver para monitorar o final do Hero
    // Colocamos uma div vazia no final do Hero com id "hero-end-trigger"
    const triggerElement = document.getElementById("hero-end-trigger");
    if (!triggerElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Quando o trigger bottom sair da tela para cima (isIntersecting false), a navbar fica scrolled
        setIsScrolled(!entry.isIntersecting);
      },
      { root: null, threshold: 0 }
    );

    observer.observe(triggerElement);
    return () => observer.disconnect();
  }, []);

  const navLinks = ["Cases", "Sobre", "Stack", "Contato"];

  return (
    <>
      <header className={`fixed top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 w-[calc(100%-3rem)] md:w-auto md:min-w-[400px] rounded-[2rem] ${
        isScrolled ? "bg-bg-surface/60 backdrop-blur-xl border border-border py-3 px-6" : "bg-transparent py-4 px-6 border border-transparent"
      }`}>
        <div className="flex items-center justify-between md:gap-12">
          {/* Logo */}
          <button 
            onClick={() => gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power3.inOut" })} 
            className="font-mono text-sm tracking-[0.1em] font-medium text-text-primary outline-none hover:text-accent transition-colors"
          >
            DANIEL DAMASCENO
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="font-sans text-sm font-medium text-text-secondary hover:text-accent hover:-translate-y-[1px] transition-all duration-250">
                {link}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <MagneticButton variant="primary" className="!px-6 !py-2.5 !text-sm !rounded-full">
              Trabalhar comigo
            </MagneticButton>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-text-primary p-2 -mr-2 outline-none focus-visible:text-accent"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 z-50 bg-bg-surface/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} md:hidden flex flex-col`}>
        <div className="flex items-center justify-between p-6 border-b border-border">
          <button 
            onClick={() => { setIsMobileMenuOpen(false); gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power3.inOut" }); }} 
            className="font-mono text-sm tracking-[0.1em] font-medium text-text-primary outline-none"
          >
            DANIEL DAMASCENO
          </button>
          <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Fechar menu" className="p-2 -mr-2 text-text-primary outline-none focus-visible:text-accent">
            <X size={24} />
          </button>
        </div>
        <div className="flex flex-col p-8 gap-8 justify-center flex-1">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMobileMenuOpen(false)} className="font-sans text-3xl font-semibold text-text-primary hover:text-accent transition-colors">
              {link}
            </a>
          ))}
          <div className="mt-8">
             <MagneticButton variant="primary" className="w-full !rounded-[2rem]">
               Trabalhar comigo
             </MagneticButton>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => gsap.to(window, { duration: 1.5, scrollTo: 0, ease: "power3.inOut" })}
        className={`fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 p-4 rounded-full bg-bg-surface/80 backdrop-blur-md border border-border text-text-secondary transition-all duration-500 hover:text-accent hover:border-accent hover:scale-110 shadow-2xl ${
          isScrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
        aria-label="Voltar ao topo"
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
}
