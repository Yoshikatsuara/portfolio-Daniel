// Gate central de animação: respeita prefers-reduced-motion por padrão,
// mas permite religar tudo via banner (classe force-motion + evento).
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function motionEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return !prefersReducedMotion() || document.body.classList.contains("force-motion");
}

// Executa fn imediatamente se o motion já está liberado; senão aguarda o
// clique no banner ("motion-enabled"). Retorna função de cleanup.
export function onMotionEnabled(fn: () => void): () => void {
  if (motionEnabled()) {
    fn();
    return () => {};
  }
  const handler = () => fn();
  window.addEventListener("motion-enabled", handler, { once: true });
  return () => window.removeEventListener("motion-enabled", handler);
}
