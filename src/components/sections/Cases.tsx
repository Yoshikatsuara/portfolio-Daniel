"use client";
import { useEffect, useRef } from "react";
import { cases } from "@/content/cases";

// Carrossel com rotação automática E scroll manual: a lista é duplicada e o
// container rola sozinho via scrollLeft (loop infinito voltando meia largura).
// Qualquer interação (hover, toque, scroll manual) pausa; solta, ele retoma.
export default function Cases() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const loop = [...cases, ...cases];

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    let rafId = 0;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout> | undefined;

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

    const onEnter = () => pause();
    const onLeave = () => scheduleResume();
    const onTouchStart = () => pause();
    const onTouchEnd = () => scheduleResume();
    const onWheel = () => {
      pause();
      scheduleResume();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("wheel", onWheel, { passive: true });

    const tick = () => {
      rafId = requestAnimationFrame(tick);
      if (paused || document.hidden) return;
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      el.scrollLeft += 0.6;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      if (resumeTimer) clearTimeout(resumeTimer);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

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
          {loop.map((item, i) => (
            <article
              className="home-case"
              key={`${item.slug}-${i}`}
              aria-hidden={i >= cases.length ? true : undefined}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
