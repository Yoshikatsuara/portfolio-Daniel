"use client";
import { useEffect, useState } from "react";
import { onMotionEnabled } from "@/lib/motion";

const LINES = [
  "daniel@ara:~$ ./customer_success --data-driven",
  "daniel@ara:~$ atualmente: retail media analyst @ cadastra",
  "daniel@ara:~$ amazon · mercado livre · sell-out em escala",
  "daniel@ara:~$ python + looker + ia aplicada",
];

export default function Hero() {
  // Com reduced-motion, mostra a primeira linha completa e parada.
  const [typed, setTyped] = useState(LINES[0]);

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const off = onMotionEnabled(() => {
      let li = 0;
      let ci = 0;
      let deleting = false;
      const tick = () => {
        if (cancelled) return;
        const line = LINES[li];
        if (!deleting) {
          ci += 1;
          setTyped(line.slice(0, ci));
          if (ci >= line.length) {
            deleting = true;
            timer = setTimeout(tick, 2400);
            return;
          }
          timer = setTimeout(tick, 34 + Math.random() * 40);
        } else {
          ci -= 3;
          if (ci <= 0) {
            ci = 0;
            deleting = false;
            li = (li + 1) % LINES.length;
          }
          setTyped(line.slice(0, Math.max(ci, 0)));
          timer = setTimeout(tick, 12);
        }
      };
      setTyped("");
      tick();
    });

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      off();
    };
  }, []);

  return (
    <section id="hero" className="home-hero">
      <div className="home-hero-copy">
        <div className="home-typeline">
          <span>{typed}</span>
          <span className="cursor" />
        </div>
        <h1>
          Dados que viram <span className="hl">decisão.</span>
        </h1>
        <p className="sub">
          Customer Success Analyst com pegada analítica. Três anos transformando
          operação de retail digital em conversa útil com cliente: Amazon,
          Mercado Livre, ciclo de renovação, treinamento de time.
        </p>
        <div className="home-ctas">
          <a className="home-btn primary" href="#cases">
            Ver cases
          </a>
          <a className="home-btn" href="#contato">
            Falar comigo
          </a>
        </div>
      </div>
    </section>
  );
}
