"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<SVGCircleElement>(null);
  const ring2Ref = useRef<SVGCircleElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const animContainerRef = useRef<HTMLDivElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Trava o scroll enquanto carrega
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          setIsDone(true);
          // Avisa os outros componentes (Hero) que a tela carregou
          window.dispatchEvent(new Event("preloaderComplete"));
        }
      });

      // Animação de Anel 1 (Desenho Progressivo)
      tl.fromTo(ring1Ref.current, 
        { strokeDashoffset: 300 }, 
        { strokeDashoffset: 0, duration: 2.5, ease: "power2.inOut" }, 
        0
      );

      // Rotação contínua do Anel 2
      gsap.to(ring2Ref.current, { rotation: 360, duration: 4, repeat: -1, ease: "none", transformOrigin: "50% 50%" });

      // Pulse do Dot Central
      gsap.to(dotRef.current, { scale: 1.5, opacity: 0.5, duration: 0.6, yoyo: true, repeat: -1, ease: "power1.inOut" });

      // Pisca as mensagens técnicas
      const messages = ["BOOTING_SYSTEM", "LOADING_ASSETS", "SYNCING_DATA", "STATUS_ONLINE"];
      messages.forEach((msg, i) => {
        tl.to(textRef.current, {
          duration: 0,
          onComplete: () => {
            if (textRef.current) textRef.current.innerText = msg;
          }
        }, (2.5 / messages.length) * i);
      });

      // Animação de saída (Geometria some expandindo, cortina sobe)
      tl.to(animContainerRef.current, { scale: 1.5, opacity: 0, duration: 0.5, ease: "power2.in" }, 2.8);
      tl.to(containerRef.current, { 
        yPercent: -100, 
        duration: 1.2, 
        ease: "power3.inOut" 
      }, 3.1);

    }, containerRef);

    return () => {
      document.body.style.overflow = "auto"; 
      ctx.revert();
    };
  }, []);

  if (isDone) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center pointer-events-none"
    >
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Animação Geométrica */}
        <div ref={animContainerRef} className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center mb-6">
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-80">
            {/* Anel 1 - Preenchimento contínuo */}
            <circle 
              ref={ring1Ref} 
              cx="50" cy="50" r="46" 
              fill="none" 
              stroke="var(--accent)" 
              strokeWidth="1.5" 
              strokeDasharray="300" 
              style={{ transformOrigin: "50% 50%", transform: "rotate(-90deg)" }}
            />
            {/* Anel 2 - Tracejado giratório */}
            <circle 
              ref={ring2Ref} 
              cx="50" cy="50" r="38" 
              fill="none" 
              stroke="var(--text-secondary)" 
              strokeWidth="0.5" 
              strokeDasharray="8 6" 
            />
          </svg>
          {/* Núcleo Pulsante */}
          <div ref={dotRef} className="w-2 h-2 md:w-3 md:h-3 bg-accent rounded-full shadow-[0_0_15px_var(--accent)]" />
        </div>
        
        {/* Linha técnica de carregamento */}
        <div className="w-[160px] flex justify-between items-center text-accent/80 font-mono text-[10px] uppercase tracking-widest border-t border-accent/20 pt-3">
           <span>SYS.INIT</span>
           <span ref={textRef}>AWAITING</span>
        </div>
      </div>
      
      {/* Grid de telemetria de fundo super sutil */}
      <div className="absolute inset-0 z-[-1] opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(to right, var(--text-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--text-primary) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
    </div>
  );
}
