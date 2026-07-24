"use client";
import { useState, type CSSProperties } from "react";
import { profile } from "@/content/profile";

export default function About() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const paragraphs = lang === "pt" ? profile.aboutPt : profile.aboutEn;

  return (
    <section id="sobre" className="home-section">
      <div className="home-wrap">
        <div className="home-head reveal">
          <span className="num">03.</span>
          <h2>Quem Sou</h2>
          <button
            type="button"
            onClick={() => setLang((prev) => (prev === "pt" ? "en" : "pt"))}
            aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
            className="home-lang-btn"
          >
            {lang === "pt" ? "EN" : "PT"}
          </button>
        </div>
        <div className="home-about">
          <div className="reveal" style={{ "--i": 1 } as CSSProperties}>
            <h3>{profile.shortName}</h3>
            <p className="fullname">{profile.name}</p>
            {paragraphs.map((paragraph, index) => (
              <p className="body" key={index}>
                {paragraph}
              </p>
            ))}
          </div>
          <div className="home-readout reveal" style={{ "--i": 2 } as CSSProperties}>
            <div className="row">
              <span className="k">YEARS_EXP</span>
              <span className="v">{profile.stats.yearsExp}</span>
            </div>
            <div className="row">
              <span className="k">BASED</span>
              <span className="v">{profile.stats.based}</span>
            </div>
            <div className="row">
              <span className="k">STATUS</span>
              <span className="v hl">ONLINE</span>
            </div>
            <div className="row">
              <span className="k">ATUALMENTE</span>
              <span className="v hl">Retail Media Analyst @ Cadastra</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
