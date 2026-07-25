import type { JSX } from "react";

// Ícones monocromáticos (na paleta do site) pra cada habilidade — ferramenta
// concreta (logo simplificado) ou conceito (ícone genérico representando a
// ideia: QBR = relatório com tendência, Buy Box = pacote com selo de
// disponibilidade, Digital Shelf = grade de gôndola digital etc.).
export const skillIcons: Record<string, JSX.Element> = {
  "Apresentação a cliente": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="5" width="24" height="16" rx="2" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M9 17v-4M15 17v-7M21 17v-2.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M13 25h6M16 21v4" stroke="var(--accent-soft)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  QBR: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="4" width="20" height="24" rx="2" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M6 11h20" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M9.5 22l3.5-5 3 3 5.5-7" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Ciclo de renovação": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M6.5 16a9.5 9.5 0 0 1 16-7" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M25.5 16a9.5 9.5 0 0 1-16 7" fill="none" stroke="var(--accent-soft)" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M22.5 5.5v4h-4M9.5 26.5v-4h4" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Data storytelling": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M4 6h24v15H14l-5 5v-5H4z" fill="none" stroke="var(--accent-soft)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 15l4.5-5.5 3 3.5 6.5-6.5" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Relacionamento bilíngue (PT/ES)": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M5 16h22" stroke="var(--accent)" strokeWidth="1.6" />
      <path
        d="M16 5c3.2 3 3.2 19 0 22M16 5c-3.2 3-3.2 19 0 22"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.6"
      />
    </svg>
  ),
  "Buy Box": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M5 11.5L16 5l11 6.5v11L16 29 5 22.5z" fill="none" stroke="var(--accent-soft)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5 11.5L16 18l11-6.5M16 18v11" fill="none" stroke="var(--accent-soft)" strokeWidth="1.6" />
      <circle cx="23.5" cy="8.5" r="4.5" fill="var(--bg-primary)" stroke="var(--accent)" strokeWidth="1.8" />
      <path d="M21.5 8.5l1.4 1.4 2.6-2.8" fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Digital Shelf": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4.5" y="4.5" width="10" height="10" rx="1.5" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <rect x="17.5" y="4.5" width="10" height="10" rx="1.5" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <rect x="4.5" y="17.5" width="10" height="10" rx="1.5" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <rect x="17.5" y="17.5" width="10" height="10" rx="1.5" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
    </svg>
  ),
  "Share competitivo": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M16 16V5a11 11 0 0 1 9.5 16.3z" fill="var(--accent)" opacity="0.85" />
    </svg>
  ),
  "Análise de preços": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M4 16.5L15.5 5H24a3.5 3.5 0 0 1 3.5 3.5v8.5L16 28.5z"
        fill="none"
        stroke="var(--accent-soft)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="21.5" cy="10.5" r="2" fill="var(--accent)" />
    </svg>
  ),
  "Prompting de produção": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="6" width="24" height="20" rx="3" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M9.5 13l4 3-4 3" fill="none" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17 19h6" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  "Automação com LLMs": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="5" fill="none" stroke="var(--accent)" strokeWidth="2" />
      <path
        d="M16 3.5v4.5M16 24v4.5M2.5 16h4.5M25 16h4.5M6.9 6.9l3.2 3.2M21.9 21.9l3.2 3.2M25.1 6.9l-3.2 3.2M10.1 21.9l-3.2 3.2"
        stroke="var(--accent-soft)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  "Antigravity IDE": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M12 9l-6.5 7 6.5 7M20 9l6.5 7-6.5 7"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M16 27V6M13 10.5l3-4 3 4" fill="none" stroke="var(--accent-soft)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "Python (pandas)": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3c-6 0-5.6 2.6-5.6 2.6l.01 2.7h5.7v.8H8.2S4 8.6 4 15.1s3.7 6.3 3.7 6.3h2.2v-3s-.1-3.7 3.6-3.7h5.6s3.5.06 3.5-3.4V6.4S23.1 3 16 3zm-3.1 1.8a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z"
        fill="none"
        stroke="var(--accent-soft)"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M16 29c6 0 5.6-2.6 5.6-2.6l-.01-2.7h-5.7v-.8h7.9s4.2.5 4.2-6-3.7-6.3-3.7-6.3h-2.2v3s.1 3.7-3.6 3.7h-5.6s-3.5-.06-3.5 3.4v5.7S8.9 29 16 29zm3.1-1.8a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2z"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "SQL básico": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <ellipse cx="16" cy="8" rx="10" ry="4" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M6 8v8c0 2.2 4.5 4 10 4s10-1.8 10-4V8" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M6 16v8c0 2.2 4.5 4 10 4s10-1.8 10-4v-8" fill="none" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  ),
  "Looker Studio": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="11" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M16 5a11 11 0 0 1 11 11h-11z" fill="var(--accent)" opacity="0.85" />
    </svg>
  ),
  "Power BI": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="6" y="18" width="4.5" height="9" fill="var(--accent-soft)" />
      <rect x="13.5" y="12" width="4.5" height="15" fill="var(--accent)" />
      <rect x="21" y="6" width="4.5" height="21" fill="var(--accent-soft)" />
    </svg>
  ),
  "Excel avançado": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="4" width="24" height="24" rx="5" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M11 11l10 10M21 11L11 21" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  "Amazon Seller Central": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect x="7" y="10" width="18" height="12" rx="2" fill="none" stroke="var(--accent-soft)" strokeWidth="2" />
      <path d="M7 24c6 3 12 3 18 0" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M22 24l3-1-1 3" stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  "Mercado Livre": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path d="M8 12h16l-2 14H10z" fill="none" stroke="var(--accent-soft)" strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 12v-2a4 4 0 0 1 8 0v2" fill="none" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  ),
  "Claude (Code, API)": (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <g stroke="var(--accent)" strokeWidth="2.2" strokeLinecap="round">
        <path d="M16 4v8M16 20v8M4 16h8M20 16h8" />
        <path d="M8 8l5.5 5.5M18.5 18.5L24 24M24 8l-5.5 5.5M13.5 18.5L8 24" />
      </g>
    </svg>
  ),
  Gemini: (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M16 3c1 7 3 9 13 10-10 1-12 3-13 13-1-10-3-12-13-13 10-1 12-3 13-10z"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  ),
};
