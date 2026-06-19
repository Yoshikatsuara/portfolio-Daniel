"use client";
import { useState } from "react";
import Image from "next/image";
import { profile } from "@/content/profile";

export default function About() {
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const paragraphs = lang === "pt" ? profile.aboutPt : profile.aboutEn;

  return (
    <section id="sobre-details" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-bg-surface">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center lg:items-start">

        {/* Lado Esquerdo: Foto */}
        <div className="w-full lg:w-[45%] order-1 lg:order-none">
          <div className="relative w-full aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-bg-elevated to-bg-primary border border-border overflow-hidden">
            <Image
              src="/profile.jpg"
              alt={profile.name}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Lado Direito: Texto */}
        <div className="w-full lg:w-[55%] flex flex-col pt-4 lg:pt-8 order-2 lg:order-none">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="font-mono text-text-muted uppercase tracking-[0.02em]">03. Quem Sou</h2>
            <button
              type="button"
              onClick={() => setLang((prev) => (prev === "pt" ? "en" : "pt"))}
              aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
              className="inline-flex items-center px-3 py-1 text-[0.875rem] font-mono font-medium tracking-[0.02em] uppercase text-text-muted border border-border rounded hover:border-accent hover:text-text-primary transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-surface"
            >
              {lang === "pt" ? "EN" : "PT"}
            </button>
          </div>
          <h3 className="font-sans font-bold tracking-[-0.03em] text-[clamp(2.5rem,5vw,4rem)] leading-tight text-text-primary mb-2">
            {profile.shortName}
          </h3>
          <p className="font-mono text-text-muted text-sm uppercase tracking-[0.15em] mb-8 md:mb-12">
            {profile.name}
          </p>

          <div className="space-y-6 font-sans text-[1.125rem] leading-[1.7] text-text-secondary mb-16">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 md:gap-12 pt-8 border-t border-border">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-text-muted text-xs uppercase tracking-wider">Years_Exp</span>
              <span className="font-mono text-accent text-xl md:text-2xl font-bold">{profile.stats.yearsExp}</span>
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
