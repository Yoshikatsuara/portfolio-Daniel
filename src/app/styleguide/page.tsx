import { Metadata } from "next";
import MagneticButton from "@/components/ui/MagneticButton";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Styleguide · Daniel Ara",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Styleguide() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary p-8 md:p-16 lg:p-24 pb-32">
      <div className="max-w-5xl mx-auto space-y-32">
        
        {/* Header */}
        <div>
          <h1 className="font-mono text-accent text-sm uppercase tracking-[0.05em] mb-4">Design System</h1>
          <p className="font-serif italic text-4xl">Midnight Luxe Adapted</p>
        </div>

        {/* Tipografia */}
        <section className="space-y-12">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em] border-b border-border pb-4">01. Tipografia</h2>
          
          <div className="space-y-16">
            <div>
              <p className="font-mono text-text-muted text-sm mb-4">Hero Principal — 800, tracking -0.04em</p>
              <h1 className="font-sans font-extrabold tracking-[-0.04em] text-[clamp(3rem,8vw,7rem)] leading-none">
                Dados que viram
              </h1>
            </div>
            
            <div>
              <p className="font-mono text-text-muted text-sm mb-4">Hero Drama — Serif Italic, 400</p>
              <h1 className="font-serif italic font-normal text-[clamp(3.5rem,9vw,8rem)] leading-none">
                decisão.
              </h1>
            </div>

            <div>
              <p className="font-mono text-text-muted text-sm mb-4">H2 — 700, tracking -0.03em</p>
              <h2 className="font-sans font-bold tracking-[-0.03em] text-[clamp(2rem,5vw,3.5rem)] leading-tight">
                A maioria foca em dashboards bonitos.
              </h2>
            </div>

            <div>
              <p className="font-mono text-text-muted text-sm mb-4">H3 — 600</p>
              <h3 className="font-sans font-semibold text-[clamp(1.5rem,3vw,2rem)] leading-snug">
                Customer Success
              </h3>
            </div>

            <div>
              <p className="font-mono text-text-muted text-sm mb-4">Body Lg — 400, line-height 1.7</p>
              <p className="font-sans font-normal text-[1.125rem] leading-[1.7] text-text-secondary max-w-2xl">
                Customer Success Analyst com pegada analítica. Três anos transformando
                operação de retail digital em conversa útil com cliente.
              </p>
            </div>

            <div>
              <p className="font-mono text-text-muted text-sm mb-4">Body — 400, line-height 1.6</p>
              <p className="font-sans font-normal text-[1rem] leading-[1.6] max-w-2xl">
                Combino fluência analítica com prática em treinamento de time, 
                ciclos de renovação e apresentação de resultados.
              </p>
            </div>

            <div>
              <p className="font-mono text-text-muted text-sm mb-4">Mono / Data — 500, tracking 0.02em, uppercase</p>
              <div className="space-y-4">
                <p className="font-mono font-medium tracking-[0.02em] text-[0.875rem] uppercase text-text-muted">
                  Situation • Task • Action • Result
                </p>
                <p className="font-mono font-medium tracking-[0.02em] text-[0.875rem] uppercase text-accent">
                  YEARS_EXP: <span className="text-text-primary">03</span> &nbsp;&nbsp;
                  CLIENTS: <span className="text-text-primary">12+</span> &nbsp;&nbsp;
                  BASED: <span className="text-text-primary">SP / BR</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cores */}
        <section className="space-y-12">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em] border-b border-border pb-4">02. Paleta de Cores</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-bg-primary border border-border"></div><p className="font-mono text-sm text-text-secondary">--bg-primary</p></div>
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-bg-surface border border-border"></div><p className="font-mono text-sm text-text-secondary">--bg-surface</p></div>
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-bg-elevated border border-border"></div><p className="font-mono text-sm text-text-secondary">--bg-elevated</p></div>
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-border"></div><p className="font-mono text-sm text-text-secondary">--border</p></div>
            
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-text-primary border border-border"></div><p className="font-mono text-sm text-text-secondary">--text-primary</p></div>
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-text-secondary border border-border"></div><p className="font-mono text-sm text-text-secondary">--text-secondary</p></div>
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-text-muted border border-border"></div><p className="font-mono text-sm text-text-secondary">--text-muted</p></div>
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-accent border border-border"></div><p className="font-mono text-sm text-text-secondary">--accent</p></div>
            <div className="space-y-3"><div className="h-24 rounded-[1.5rem] bg-accent-glow border border-border"></div><p className="font-mono text-sm text-text-secondary">--accent-glow</p></div>
          </div>
        </section>

        {/* Componentes */}
        <section className="space-y-12">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em] border-b border-border pb-4">03. Componentes & Micro-interações</h2>
          
          <div className="space-y-16">
            <div className="space-y-6">
              <p className="font-mono text-text-muted text-sm">
                Botões Magnéticos <span className="text-accent text-[10px] ml-2">(HOVER)</span>
              </p>
              <div className="flex flex-wrap gap-6 items-center">
                <MagneticButton variant="primary">Ver cases</MagneticButton>
                <MagneticButton variant="ghost">Falar comigo</MagneticButton>
              </div>
            </div>

            <div className="space-y-6">
              <p className="font-mono text-text-muted text-sm">
                Link Animado <span className="text-accent text-[10px] ml-2">(HOVER)</span>
              </p>
              <a href="#" className="inline-flex font-sans text-lg font-medium text-text-primary hover:-translate-y-[1px] transition-transform duration-300 relative group">
                Download CV (PT)
                <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-current scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </a>
            </div>

            <div className="space-y-6">
              <p className="font-mono text-text-muted text-sm">
                Badges / Tags <span className="text-accent text-[10px] ml-2">(HOVER)</span>
              </p>
              <div className="flex gap-3">
                <Badge>Python (pandas)</Badge>
                <Badge>Mercado Livre</Badge>
                <Badge>Looker Studio</Badge>
              </div>
            </div>

            <div className="space-y-6">
              <p className="font-mono text-text-muted text-sm">
                Card Básico Interativo <span className="text-accent text-[10px] ml-2">(HOVER)</span>
              </p>
              <div className="bg-bg-surface p-8 rounded-[2rem] border border-border hover:border-accent hover:-translate-y-1 transition-all duration-300 group max-w-md relative overflow-hidden cursor-pointer">
                <div className="absolute inset-0 bg-accent-glow opacity-0 group-hover:opacity-15 transition-opacity duration-300 pointer-events-none"></div>
                <h3 className="font-sans font-semibold text-2xl mb-2 relative z-10">Retail Media</h3>
                <p className="font-mono text-sm text-text-muted uppercase mb-6 relative z-10">Share Competitivo</p>
                <p className="font-sans text-text-secondary leading-relaxed relative z-10">
                  Um card elegante com cantos arredondados, borda sutil que revela o accent no hover, elevação suave e fundo em bg-surface.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="font-mono text-text-muted text-sm">Stat / Número de Impacto</p>
              <div className="flex flex-col">
                <span className="font-serif italic text-accent text-5xl md:text-6xl mb-2">R$ 2.4M</span>
                <span className="font-sans text-sm text-text-secondary">em renovações no Q3</span>
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
