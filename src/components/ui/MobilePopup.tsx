"use client";
import { useEffect, useState } from "react";

const DISMISS_KEY = "mobilePopupDismissed";

export default function MobilePopup() {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobile || sessionStorage.getItem(DISMISS_KEY)) return;

    const show = () => setVisible(true);
    window.addEventListener("preloaderComplete", show, { once: true });
    return () => window.removeEventListener("preloaderComplete", show);
  }, []);

  function dismiss() {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  }

  async function share() {
    const shareData = {
      title: "Daniel Ara — Portfólio",
      text: "Dá uma olhada nesse portfólio no computador, fica bem melhor:",
      url: location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // usuário cancelou o share sheet — sem ação necessária
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // clipboard indisponível — sem fallback adicional
      }
    }
  }

  if (!visible) return null;

  return (
    <div className="mobile-popup" role="dialog" aria-modal="true">
      <div className="mobile-popup-card">
        <span className="mobile-popup-tag">Aviso_mobile</span>
        <h4>Melhor em um computador</h4>
        <p>
          As animações 3D deste site foram pensadas pra tela grande. Aqui no
          celular alguns efeitos ficam mais simples, mas dá pra aproveitar numa boa.
        </p>
        <div className="mobile-popup-actions">
          <button className="mobile-popup-primary" onClick={dismiss}>
            Continuar por aqui
          </button>
          <button className="mobile-popup-secondary" onClick={share}>
            {copied ? "link copiado!" : "compartilhar link (ver no pc)"}
          </button>
        </div>
      </div>
    </div>
  );
}
