"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { stack } from "@/content/stack";
import { skillIcons } from "@/content/skillIcons";

// Mesmo padrão de foco do carrossel de Cases: clicar numa categoria a
// destaca (cresce, ganha borda/sombra) e escurece as outras, até fechar.
//
// As bandas usam sua PRÓPRIA revelação-ao-rolar (local-reveal) em vez do
// RevealInit global: o RevealInit adiciona ".is-visible" direto no DOM por
// fora do React, e como o clique já muda a className via React a cada
// render, o React sobrescrevia a string inteira da classe e apagava esse
// ".is-visible" — a banda clicada (e as vizinhas escurecidas) ficavam
// "sumidas". Controlando o reveal também pelo React isso não acontece.
export default function Stack() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<boolean[]>(() => stack.map(() => false));
  const bandRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setRevealed(stack.map(() => true));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const i = Number((en.target as HTMLElement).dataset.i);
          setRevealed((cur) => {
            if (cur[i]) return cur;
            const next = [...cur];
            next[i] = true;
            return next;
          });
          obs.unobserve(en.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    bandRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function toggleExpand(i: number) {
    setExpanded((cur) => (cur === i ? null : i));
  }

  return (
    <section id="stack" className="home-section">
      <div className="home-wrap">
        <div className="home-head reveal">
          <span className="num">02.</span>
          <h2>Habilidades</h2>
        </div>
        <p className="home-section-lead reveal">
          Retail Media Analyst para indústria de bens de consumo — as habilidades
          por trás disso, por categoria.
        </p>
        <div className={`home-bands${expanded !== null ? " has-expanded" : ""}`}>
          {stack.map((group, i) => {
            const isExpanded = expanded === i;
            return (
              <div
                ref={(el) => {
                  bandRefs.current[i] = el;
                }}
                data-i={i}
                className={`home-band local-reveal${revealed[i] ? " is-visible" : ""}${
                  isExpanded ? " is-expanded" : ""
                }`}
                key={group.category}
                style={{ "--i": i, "--d": `${i * 0.9}s` } as CSSProperties}
                onClick={() => toggleExpand(i)}
              >
                {isExpanded && (
                  <button
                    className="home-band-close"
                    aria-label="Fechar"
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpanded(null);
                    }}
                  >
                    ×
                  </button>
                )}
                <span className="cat">{group.category}</span>
                <div className="items">
                  {group.items.map((item) => {
                    const icon = skillIcons[item];
                    return (
                      <span key={item}>
                        {isExpanded && icon && <span className="skill-icon">{icon}</span>}
                        {item}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
