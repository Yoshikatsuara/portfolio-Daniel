"use client";
import { useEffect, useRef, useState } from "react";

const TARGET = "DANIEL@DAMASCENO:~$";
const GLYPHS = "#%&*+=-/<>01?$";
const LOCK_MS = 460;
const LINE_DELAY_MS = 150;
const SPLIT_DELAY_MS = 700;
const DONE_DELAY_MS = 1400;

type Ch = { c: string; locked: boolean };

export default function Preloader() {
  const [chars, setChars] = useState<Ch[]>(() =>
    TARGET.split("").map((c) => ({ c, locked: false }))
  );
  const [status, setStatus] = useState("sincronizando");
  const [lineGrowing, setLineGrowing] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Sempre começa do topo — sem isso o navegador às vezes restaura a
    // posição de scroll de antes do refresh, e a pessoa recarrega no meio
    // da página em vez de ver o preloader/hero do início.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function tick(start: number, now: number) {
      const t = now - start;
      const lockedCount = Math.floor((t / LOCK_MS) * TARGET.length);
      setChars(
        TARGET.split("").map((c, i) =>
          i < lockedCount
            ? { c, locked: true }
            : { c: GLYPHS[Math.floor(Math.random() * GLYPHS.length)], locked: false }
        )
      );
      if (lockedCount < TARGET.length) {
        rafRef.current = requestAnimationFrame((n) => tick(start, n));
      } else {
        setStatus("pronto");
        timers.push(
          setTimeout(() => setLineGrowing(true), LINE_DELAY_MS),
          setTimeout(() => setSplitting(true), SPLIT_DELAY_MS),
          setTimeout(() => {
            document.body.style.overflow = "";
            setDone(true);
            window.dispatchEvent(new Event("preloaderComplete"));
          }, DONE_DELAY_MS)
        );
      }
    }

    // Espera a fonte mono carregar antes de animar: sem isso, o texto troca
    // de fonte de fallback pra JetBrains Mono no meio da animação e "pula"
    // de largura (o salto pra esquerda que aparecia perto da linha laranja).
    const fontsReady =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready
        : Promise.resolve();
    const safety = new Promise<void>((resolve) => setTimeout(resolve, 300));

    Promise.race([fontsReady, safety]).then(() => {
      if (cancelled) return;
      rafRef.current = requestAnimationFrame((n) => tick(n, n));
    });

    return () => {
      cancelled = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className="preloader">
      <div className={`preloader-panel top${splitting ? " is-splitting" : ""}`} />
      <div className={`preloader-panel bottom${splitting ? " is-splitting" : ""}`} />
      <div className={`preloader-stage${splitting ? " is-fading" : ""}`}>
        <div className="preloader-word">
          {chars.map((ch, i) => (
            <span key={i} className={ch.locked ? "is-locked" : "is-scrambling"}>
              {ch.c}
            </span>
          ))}
        </div>
        <div className="preloader-status">{status}</div>
      </div>
      <div
        className={`preloader-line${lineGrowing ? " is-growing" : ""}${
          splitting ? " is-fading" : ""
        }`}
      />
    </div>
  );
}
