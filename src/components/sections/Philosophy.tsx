"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hexOuterRef = useRef<SVGSVGElement>(null);
  const hexInnerRef = useRef<SVGSVGElement>(null);
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const mouseLabelRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndex = useRef(-1);
  const carouselTimer = useRef<NodeJS.Timeout | null>(null);
  
  const currentMousePos = useRef({ x: 0, y: 0 });
  const sparkInterval = useRef<NodeJS.Timeout | null>(null);

  const phrases = [
    { label: "O MEU MANIFESTO", title: "Dados sem direção são apenas números.", accent: "O impacto mora na execução." },
    { label: "O VALOR DA ESTRATÉGIA", title: "Relatórios mostram o que já aconteceu.", accent: "A inteligência revela o que fazer a seguir." },
    { label: "O FOCO DO CLIENTE", title: "O cliente não compra a sua ferramenta.", accent: "Ele compra o resultado." }
  ];

  // ==============================
  // CAROUSEL LOGIC
  // ==============================
  const startCarousel = () => {
    if (carouselTimer.current) clearInterval(carouselTimer.current);
    carouselTimer.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % phrases.length);
    }, 8000); // 8 seconds per phrase
  };

  useEffect(() => {
    startCarousel();
    return () => { if (carouselTimer.current) clearInterval(carouselTimer.current); };
  }, []);

  const handleDotClick = (i: number) => {
    if (i === activeIndex) return;
    setActiveIndex(i);
    startCarousel(); // reseta o timer pra pessoa ter tempo de ler
  };

  useEffect(() => {
    if (prevIndex.current !== -1 && prevIndex.current !== activeIndex) {
      const oldItem = document.getElementById(`phrase-${prevIndex.current}`);
      const newItem = document.getElementById(`phrase-${activeIndex}`);
      
      // Animate out (Sai do quadro pra esquerda lentamente)
      if (oldItem) {
        gsap.to(oldItem, { x: "-50vw", opacity: 0, duration: 1.8, ease: "power2.inOut" });
      }
      
      // Animate in (Entra pelo quadro da direita lentamente)
      if (newItem) {
        gsap.fromTo(newItem, 
          { x: "50vw", opacity: 0 },
          { x: 0, opacity: 1, duration: 2.0, ease: "power2.out", delay: 0.6 }
        );
      }
    } else if (prevIndex.current === -1) {
      // Entrada inicial
      const newItem = document.getElementById(`phrase-${activeIndex}`);
      if (newItem) {
        gsap.set(newItem, { opacity: 1, x: 0 });
      }
    }
    prevIndex.current = activeIndex;
  }, [activeIndex]);


  // ==============================
  // STATIC GSAP & EVENT LISTENERS
  // ==============================
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animações infinitas de ambiente. Coletadas para pausar quando a seção sai da tela.
      const loops = [
        gsap.to(glowRef.current, { opacity: 0.28, duration: 2, yoyo: true, repeat: -1, ease: "power1.inOut" }),
        gsap.to(hexOuterRef.current, { rotation: 360, duration: 15, repeat: -1, ease: "none", transformOrigin: "center center" }),
        gsap.to(hexInnerRef.current, { rotation: -360, duration: 10, repeat: -1, ease: "none", transformOrigin: "center center" }),
        gsap.to(".pulse-accent", { opacity: 0.7, duration: 1.5, yoyo: true, repeat: -1, ease: "power1.inOut" }),
      ];

      // Pausa as animações quando a seção não está visível, liberando a main-thread
      // durante a rolagem das outras seções (evita jank fora do Philosophy).
      const visibilityTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          if (self.isActive) loops.forEach((t) => t.play());
          else loops.forEach((t) => t.pause());
        },
      });
      // Aplica o estado inicial (caso a seção já comece fora da viewport).
      if (!visibilityTrigger.isActive) loops.forEach((t) => t.pause());

      const handleMouseMove = (e: MouseEvent) => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          currentMousePos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
          
          if (mouseGlowRef.current && mouseLabelRef.current) {
            gsap.to(mouseGlowRef.current, { x: currentMousePos.current.x - 50, y: currentMousePos.current.y - 50, duration: 0.5, ease: "power2.out" });
            gsap.to(mouseLabelRef.current, { x: currentMousePos.current.x + 20, y: currentMousePos.current.y + 20, duration: 0.8, ease: "power3.out" });
          }
        }
      };

      const handleMouseEnter = () => {
        gsap.to(mouseGlowRef.current, { opacity: 1, duration: 0.4 });
        gsap.to(mouseLabelRef.current, { opacity: 1, duration: 0.4 });
      };
      const handleMouseLeave = () => {
        gsap.to(mouseGlowRef.current, { opacity: 0, duration: 0.4 });
        gsap.to(mouseLabelRef.current, { opacity: 0, duration: 0.4 });
        if (sparkInterval.current) clearInterval(sparkInterval.current);
      };

      const section = sectionRef.current;
      if (section) {
        section.addEventListener("mousemove", handleMouseMove);
        section.addEventListener("mouseenter", handleMouseEnter);
        section.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        if (section) {
          section.removeEventListener("mousemove", handleMouseMove);
          section.removeEventListener("mouseenter", handleMouseEnter);
          section.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ==============================
  // PHYSICS PARTICLE SYSTEM
  // ==============================
  const createSparksAt = (x: number, y: number) => {
    if (!sectionRef.current) return;

    // Calcula área do texto atual para a "ilusão de colisão"
    const activeText = document.getElementById(`phrase-${activeIndex}`);
    const sectionRect = sectionRef.current.getBoundingClientRect();
    
    let textLeft = 0;
    let textRight = 0;
    let textTopY = -1;

    if (activeText && activeText.children.length > 1) {
      // children[1] é o "Title" (texto grande principal em branco)
      const textElement = activeText.children[1];
      if (textElement) {
        const textRect = textElement.getBoundingClientRect();
        textLeft = textRect.left - sectionRect.left - 80; // Margem horizontal de erro
        textRight = textRect.right - sectionRect.left + 80;
        // Bate exatamente na borda real do texto (sem paredes invisiveis acima)
        textTopY = textRect.top - sectionRect.top; 
      }
    }
    
    // Spawn 4 sparks per tick to keep performance smooth
    for (let i = 0; i < 4; i++) {
      const spark = document.createElement("div");
      spark.className = "absolute w-1.5 h-1.5 bg-accent rounded-sm pointer-events-none z-30 mix-blend-screen glow-particle";
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.boxShadow = "0 0 10px var(--accent)";
      
      sectionRef.current.appendChild(spark);

      // Random velocities (mais lentas e controladas)
      const vx = (Math.random() - 0.5) * 300; 
      const initialVy = - (Math.random() * 150 + 80); // Initial upward burst
      
      const tl = gsap.timeline({
        onComplete: () => spark.remove()
      });

      // Y mov (Gravity + Bounce) calculations needed for X duration
      const floorY = sectionRef.current.clientHeight - y - 10; 
      const textHitDistance = textTopY - y;
      
      // Verifica se a trajetória horizontal vai passar por cima do texto, e se a fagulha nasceu acima dele
      const targetX = x + vx;
      const willHitText = textHitDistance > 0 && ((x > textLeft && x < textRight) || (targetX > textLeft && targetX < textRight));

      // X mov (Duração ajustada pra manter sincronia)
      tl.to(spark, { x: vx, duration: willHitText ? 4.8 : 3.5, ease: "power1.out" }, 0);
      
      // 1. Pulo inicial pra cima (0.6s)
      tl.to(spark, { y: initialVy, duration: 0.6, ease: "power1.out" }, 0);

      if (willHitText) {
        // --- TIMELINE COM DUPLO QUIQUE (Texto + Chão) ---
        // 2. Cai até o texto (0.8s - mesma velocidade de queda do vazio)
        tl.to(spark, { y: textHitDistance, duration: 0.8, ease: "power1.in" }, 0.6);
        // 3. Quica no texto (0.7s)
        tl.to(spark, { y: textHitDistance - (Math.random() * 50 + 30), duration: 0.7, ease: "power1.out" }, 1.4);
        // 4. Cai do texto até o chão (0.9s - mesma velocidade)
        tl.to(spark, { y: floorY, duration: 0.9, ease: "power1.in" }, 2.1);
        // 5. Quica no chão (0.8s)
        tl.to(spark, { y: floorY - (Math.random() * 40 + 20), duration: 0.8, ease: "power1.out" }, 3.0);
        // 6. Cai pro vácuo (1.0s)
        tl.to(spark, { y: floorY + 150, duration: 1.0, ease: "power1.in" }, 3.8);
        
        // Fade out sincronizado
        tl.to(spark, { opacity: 0, duration: 0.8 }, 4.0);
      } else {
        // --- TIMELINE NORMAL (Só Chão) ---
        // 2. Cai até bater na borda (chão) (1.2s)
        tl.to(spark, { y: floorY, duration: 1.2, ease: "power1.in" }, 0.6);
        // 3. Dá um pulo pra cima (quique manual, mais suave) (0.8s)
        tl.to(spark, { y: floorY - (Math.random() * 80 + 40), duration: 0.8, ease: "power1.out" }, 1.8);
        // 4. Sai de cena pra baixo no vácuo (1.0s)
        tl.to(spark, { y: floorY + 150, duration: 1.0, ease: "power1.in" }, 2.6);

        // Fade out lento no final
        tl.to(spark, { opacity: 0, duration: 0.8 }, 2.8);
      }
    }
  };

  const handleMouseDown = () => {
    createSparksAt(currentMousePos.current.x, currentMousePos.current.y);
    sparkInterval.current = setInterval(() => {
      createSparksAt(currentMousePos.current.x, currentMousePos.current.y);
    }, 50);
  };

  const handleMouseUp = () => {
    if (sparkInterval.current) clearInterval(sparkInterval.current);
  };

  return (
    <section 
      id="sobre" 
      ref={sectionRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="relative py-32 md:py-48 px-6 bg-bg-primary overflow-hidden flex items-center justify-center min-h-[70vh] cursor-crosshair select-none"
      style={{
        borderTop: "1px solid rgba(59, 91, 255, 0.4)",
        borderBottom: "1px solid rgba(59, 91, 255, 0.4)"
      }}
    >
      {/* CAMADAS DE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15" style={{ backgroundImage: `linear-gradient(to right, var(--accent) 0.5px, transparent 0.5px), linear-gradient(to bottom, var(--accent) 0.5px, transparent 0.5px)`, backgroundSize: '40px 40px' }} />
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-0 opacity-15" style={{ background: "radial-gradient(circle at 50% 60%, var(--accent) 0%, transparent 45%)" }} />

      {/* HEXÁGONO */}
      <div className="absolute top-[60px] right-[70px] hidden md:flex items-center justify-center pointer-events-none z-10 w-[50px] h-[50px]">
        <svg ref={hexOuterRef} className="absolute inset-0 opacity-60" viewBox="0 0 50 50">
          <polygon points="25,0 46.65,12.5 46.65,37.5 25,50 3.35,37.5 3.35,12.5" fill="none" stroke="var(--accent)" strokeWidth="1" />
        </svg>
        <svg ref={hexInnerRef} className="absolute m-auto opacity-50" viewBox="0 0 30 30" style={{ width: 30, height: 30 }}>
          <polygon points="15,0 27.99,7.5 27.99,22.5 15,30 2.01,22.5 2.01,7.5" fill="none" stroke="var(--accent)" strokeWidth="0.6" />
        </svg>
        <div className="absolute w-[4px] h-[4px] rounded-full bg-accent" />
      </div>

      {/* NEON TRACKER */}
      <div ref={mouseGlowRef} className="absolute top-0 left-0 w-[100px] h-[100px] bg-accent/80 rounded-full pointer-events-none z-0 blur-[8px] opacity-0 mix-blend-screen will-change-transform" />
      
      {/* LABEL CLIQUE */}
      <div ref={mouseLabelRef} className="absolute top-0 left-0 pointer-events-none z-40 opacity-0 will-change-transform">
        <span className="font-mono text-[10px] uppercase tracking-widest text-accent font-bold bg-bg-surface/60 px-3 py-1.5 rounded-full border border-accent/40 backdrop-blur-md">
          Segure ou clique
        </span>
      </div>

      {/* TEXTOS (CARROSSEL) */}
      <div className="relative z-20 w-full flex flex-col items-center">
        <div className="relative w-full h-[350px] max-w-[1000px] mx-auto flex items-center justify-center text-center overflow-visible">
          {phrases.map((phrase, i) => (
            <div 
              key={i} 
              id={`phrase-${i}`}
              className="absolute w-full flex flex-col items-center justify-center opacity-0 pointer-events-none"
            >
              <p className="font-mono text-accent text-sm tracking-[0.15em] uppercase mb-8 md:mb-12 font-semibold">
                {phrase.label}
              </p>
              <p className="font-sans font-bold text-text-primary text-[clamp(1.5rem,4vw,2.5rem)] leading-tight mb-4 md:mb-6">
                {phrase.title}
              </p>
              <p className="font-serif italic text-[clamp(3rem,8vw,6rem)] leading-tight text-accent pulse-accent">
                {phrase.accent}
              </p>
            </div>
          ))}
        </div>

        {/* DOTS DE NAVEGAÇÃO */}
        <div className="flex gap-4 mt-8 z-30 pointer-events-auto">
          {phrases.map((_, i) => (
            <button 
              key={i} 
              onClick={(e) => { e.stopPropagation(); handleDotClick(i); }}
              onMouseDown={(e) => e.stopPropagation()}
              className="group relative flex items-center justify-center p-2 outline-none"
              aria-label={`Ver frase ${i + 1}`}
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${activeIndex === i ? "bg-accent scale-125" : "bg-border group-hover:bg-text-muted"}`} />
              {activeIndex === i && (
                <div className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
