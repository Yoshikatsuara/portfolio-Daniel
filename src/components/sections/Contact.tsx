import type { CSSProperties } from "react";
import { profile } from "@/content/profile";

export default function Contact() {
  return (
    <section id="contato" className="home-section">
      <div className="home-wrap">
        <div className="home-head reveal">
          <span className="num">04.</span>
          <h2>Contato</h2>
        </div>
        <div className="home-contact">
          <div className="home-ccard reveal" style={{ "--i": 0 } as CSSProperties}>
            <h3>Buscando talento?</h3>
            <p>
              Customer Success Analyst com pegada analítica, aberto a oportunidades
              CLT em SP ou remoto.
            </p>
            <div>
              <a className="home-chip primary" href={profile.cvPt} download>
                Baixar CV (PT)
              </a>
              <a className="home-chip" href={profile.cvEn} download>
                Download CV (EN)
              </a>
              <a
                className="home-chip"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <a className="home-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </div>
          <div className="home-ccard reveal" style={{ "--i": 1 } as CSSProperties}>
            <h3>Precisa resolver um problema?</h3>
            <p>
              Projetos freelance de análise de dados, automação de operação e
              implementação de IA para SMB.
            </p>
            <div>
              <a
                className="home-chip primary"
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a className="home-chip" href={`mailto:${profile.email}`}>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
