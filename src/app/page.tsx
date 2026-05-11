import { Metadata } from "next";
import { profile } from "@/content/profile";
import Preloader from "@/components/ui/Preloader";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Cases from "@/components/sections/Cases";
import Stack from "@/components/sections/Stack";
import Philosophy from "@/components/sections/Philosophy";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Daniel Ara Damasceno · Customer Success Analyst",
  description: profile.bioShort,
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Preloader />
      <Navbar />
      <Hero />
      <Philosophy />
      <About />
      <Cases />
      <Stack />
      <Contact />
      <Footer />
    </main>
  );
}
