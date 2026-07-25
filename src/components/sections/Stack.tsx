"use client";
import { useState, type CSSProperties } from "react";
import { stack } from "@/content/stack";

// Mesmo padrão de foco do carrossel de Cases: clicar numa categoria a
// destaca (cresce, ganha borda/sombra) e escurece as outras, até fechar.
export default function Stack() {
  const [expanded, setExpanded] = useState<number | null>(null);

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
                className={`home-band reveal${isExpanded ? " is-expanded" : ""}`}
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
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
