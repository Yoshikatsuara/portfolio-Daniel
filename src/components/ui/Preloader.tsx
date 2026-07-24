"use client";
import { useEffect, useRef, useState } from "react";

const TARGET = "DANIEL@ARA:~$";
const GLYPHS = "#%&*+=-/<>01?$";
const LOCK_MS = 460;

type Ch = { c: string; locked: boolean };

export default function Preloader() {
  const [chars, setChars] = useState<Ch[]>(() =>
    TARGET.split("").map((c) => ({ c, locked: false }))
  );
  const [status, setStatus] = useState("sincronizando");
  const [exiting, setExiting] = useState(false);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();

    function tick(now: number) {
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
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setStatus("pronto");
        setExiting(true);
        setTimeout(() => {
          document.body.style.overflow = "";
          setDone(true);
          window.dispatchEvent(new Event("preloaderComplete"));
        }, 520);
      }
    }
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div className={`preloader${exiting ? " preloader-exit" : ""}`}>
      <div className="preloader-stage">
        <div className="preloader-word">
          {chars.map((ch, i) => (
            <span key={i} className={ch.locked ? "is-locked" : "is-scrambling"}>
              {ch.c}
            </span>
          ))}
        </div>
        <div className="preloader-status">{status}</div>
      </div>
      <div className="preloader-wipe" />
      <div className="preloader-cut" />
    </div>
  );
}
