"use client";
import { useEffect, useRef, useState } from "react";
import { cases } from "@/content/cases";

// Carrossel com rotação automática E scroll manual: a lista é duplicada e o
// container rola sozinho via scrollLeft (loop infinito voltando meia largura).
// Só pausa com interação horizontal de verdade no carrossel (arrasto/roda
// horizontal, clique) — rolar a página (wheel vertical, swipe vertical no
// celular) nunca pausa, mesmo que o gesto passe por cima do carrossel.
// Clicar num card expande ele (fica maior, parado) até o usuário fechar.
export default function Cases() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const expandedRef = useRef<number | null>(null);
  const loop = [...cases, ...cases];

  useEffect(() => {
    expandedRef.current = expanded;
  }, [expanded]);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    let rafId = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchIsHorizontal = false;

    const pause = () => {
      paused = true;
      if (resumeTimer) clearTimeout(resumeTimer);
    };
    const scheduleResume = () => {
      if (resumeTimer) clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
      }, 2200);
    };

    // Wheel vertical = rolando a página, nunca pausa. Só delta horizontal
    // (shift+roda, trackpad) conta como interação de verdade no carrossel.
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      pause();
      scheduleResume();
    };

    // Touch: só decide no touchmove, comparando o quanto o dedo andou na
    // horizontal vs. na vertical. Um swipe pra rolar a página (vertical)
    // nunca pausa; só um arrasto horizontal de verdade no carrossel pausa.
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchStartX = t.clientX;
      touchStartY = t.clientY;
      touchIsHorizontal = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchIsHorizontal) return;
      const t = e.touches[0];
      const dx = t.clientX - touchStartX;
      const dy = t.clientY - touchStartY;
      if (Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy)) {
        touchIsHorizontal = true;
        pause();
      }
    };
    const onTouchEnd = () => {
      if (touchIsHorizontal) scheduleResume();
    };

    // Clique/arrasto de mouse pausa (inclui abrir um card); toque já é
    // tratado à parte acima.
    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      pause();
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      scheduleResume();
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("wheel", onWheel, { passive: true });

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (paused || expandedRef.current !== null || document.hidden) return;
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      el.scrollLeft += 0.6;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  function toggleExpand(i: number) {
    setExpanded((cur) => (cur === i ? null : i));
  }

  return (
    <section id="cases" className="home-section">
      <div className="home-wrap">
        <div className="home-head reveal">
          <span className="num">01.</span>
          <h2>Melhores execuções</h2>
        </div>
      </div>
      <div className="home-strip-outer" ref={outerRef}>
        <div className="home-strip">
          {loop.map((item, i) => {
            const isExpanded = expanded === i;
            return (
              <article
                className={`home-case${isExpanded ? " is-expanded" : ""}`}
                key={`${item.slug}-${i}`}
                aria-hidden={i >= cases.length ? true : undefined}
                onClick={() => toggleExpand(i)}
              >
                {isExpanded && (
                  <button
                    className="home-case-close"
                    aria-label="Fechar"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(null);
                    }}
                  >
                    ×
                  </button>
                )}
                <div className="client">{item.client}</div>
                <h4>{item.title}</h4>
                <p className="desc">{item.description}</p>
                <div className="rline">
                  RESULTADO → {item.result_metric.replace("\n", " ")}: {item.result_text}
                </div>
                <div className="tags">
                  {item.tags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
