import { profile } from "@/content/profile";

export default function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-bg-surface">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">
        
        {/* Lado Esquerdo: Foto */}
        <div className="w-full lg:w-[45%] order-1 lg:order-none">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-bg-elevated to-bg-primary border border-border flex items-center justify-center overflow-hidden">
             {/* Placeholder Fase 1 */}
             <p className="font-mono text-text-muted text-sm uppercase tracking-widest absolute">Placeholder de Foto</p>
          </div>
        </div>

        {/* Lado Direito: Texto */}
        <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pt-8 order-2 lg:order-none">
          <h2 className="font-mono text-text-muted uppercase tracking-[0.02em] mb-4">03. Quem Sou</h2>
          <h3 className="font-sans font-bold tracking-[-0.03em] text-[clamp(2.5rem,5vw,4rem)] leading-tight text-text-primary mb-8 md:mb-12">
            {profile.shortName}
          </h3>

          <div className="space-y-6 font-sans text-[1.125rem] leading-[1.7] text-text-secondary mb-16">
            <p>{profile.bioShort}</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 pt-8 border-t border-border">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-text-muted text-xs uppercase tracking-wider">Years_Exp</span>
              <span className="font-mono text-accent text-xl md:text-2xl font-bold">{profile.stats.yearsExp}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-text-muted text-xs uppercase tracking-wider">Clients</span>
              <span className="font-mono text-accent text-xl md:text-2xl font-bold">{profile.stats.clients}</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-text-muted text-xs uppercase tracking-wider">Based</span>
              <span className="font-mono text-text-primary text-xl md:text-2xl font-medium">{profile.stats.based}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
