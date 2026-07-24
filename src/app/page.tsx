import { Metadata } from "next";
import { profile } from "@/content/profile";
import MotionBanner from "@/components/ui/MotionBanner";
import RevealInit from "@/components/ui/RevealInit";
import OrbitalCore from "@/components/three/OrbitalCore";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Ticker from "@/components/sections/Ticker";
import About from "@/components/sections/About";
import Cases from "@/components/sections/Cases";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Daniel Ara Damasceno · Customer Success Analyst",
  description: profile.bioShort,
};

export default function Home() {
  return (
    <>
      <MotionBanner />
      <OrbitalCore />
      <div className="home-scan-fixed" aria-hidden="true" />
      <RevealInit />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <Ticker />
        <About />
        <Cases />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
