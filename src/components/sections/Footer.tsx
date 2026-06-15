import { profile } from "@/content/profile";

export default function Footer() {
  const navLinks = ["Cases", "Sobre", "Stack", "Contato"];

  return (
    <footer className="bg-bg-primary pt-16 pb-8 px-6 md:px-16 lg:px-24 rounded-t-[3rem] mt-[-2rem] relative z-20 border-t border-border">
      <div className="max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          
          {/* Col 1 */}
          <div className="flex flex-col">
            <span className="font-mono text-xl tracking-[0.15em] font-medium uppercase text-text-primary mb-4">
              DANIEL ARA
            </span>
            <p className="font-sans text-sm text-text-secondary max-w-xs leading-relaxed">
              Customer Success Analyst com pegada analítica. Conectando dados a resultados comerciais.
            </p>
          </div>

          {/* Col 2 */}
          <div className="flex flex-col">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">Navegação</span>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-sans text-sm text-text-secondary hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div className="flex flex-col">
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">Social</span>
            <ul className="flex flex-col gap-3">
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-text-secondary hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://github.com/Yoshikatsuara" target="_blank" rel="noopener noreferrer" className="font-sans text-sm text-text-secondary hover:text-accent transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-border">
          
          {/* Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="font-mono text-xs text-text-muted uppercase tracking-wider">Status_Online</span>
          </div>

          {/* Copyright */}
          <span className="font-mono text-xs text-text-muted uppercase tracking-wider text-center md:text-left">
            © 2026 DANIEL ARA DAMASCENO
          </span>

          {/* Tech Pitch */}
          <span className="font-mono text-[10px] text-text-muted/50 uppercase tracking-wider">
            Built with Claude + Antigravity
          </span>
        </div>

      </div>
    </footer>
  );
}
