"use client";
import { useEffect } from "react";

const DURATION = 700;
const NAV_OFFSET = 72;

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Scroll suave pros links internos (#sobre, #cases, ...) feito na mão em vez
// de depender de `scroll-behavior: smooth` do CSS: o navegador ignora esse
// CSS e pula direto quando o SO está com "reduzir movimento" ligado (o caso
// dele), então o clique parecia um teletransporte em vez de rolar.
export default function SmoothAnchors() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      const startY = window.scrollY;
      const targetY = Math.max(
        0,
        startY + el.getBoundingClientRect().top - NAV_OFFSET
      );
      const start = performance.now();

      function step(now: number) {
        const t = Math.min(1, (now - start) / DURATION);
        window.scrollTo({ top: startY + (targetY - startY) * easeInOutCubic(t), behavior: "instant" });
        if (t < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
