import type { CSSProperties } from "react";
import { stack } from "@/content/stack";

export default function Stack() {
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
        <div className="home-bands">
          {stack.map((group, i) => (
            <div
              className="home-band reveal"
              key={group.category}
              style={{ "--i": i, "--d": `${i * 0.9}s` } as CSSProperties}
            >
              <span className="cat">{group.category}</span>
              <div className="items">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
