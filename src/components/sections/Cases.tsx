import { cases } from "@/content/cases";

// Carrossel horizontal automático: a lista é duplicada e o track anima
// translateX(-50%) em loop — pausa no hover.
export default function Cases() {
  const loop = [...cases, ...cases];

  return (
    <section id="cases" className="home-section">
      <div className="home-wrap">
        <div className="home-head reveal">
          <span className="num">01.</span>
          <h2>Melhores execuções</h2>
        </div>
      </div>
      <div className="home-strip-outer">
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
