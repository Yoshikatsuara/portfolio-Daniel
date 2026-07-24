"use client";
import { useEffect, useState } from "react";

// Quando o sistema do visitante tem "reduzir movimento" ativado, as animações
// começam pausadas por acessibilidade — este banner oferece o opt-in explícito.
export default function MotionBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="motion-banner">
      <span>
        Seu sistema está com &quot;reduzir movimento&quot; ativado — as animações começam
        pausadas por acessibilidade.
      </span>
      <button
        type="button"
        onClick={() => {
          document.body.classList.add("force-motion");
          window.dispatchEvent(new Event("motion-enabled"));
          setShow(false);
        }}
      >
        ▶ Ativar todas as animações
      </button>
    </div>
  );
}
