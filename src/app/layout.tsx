import type { Metadata } from "next";
import { inter, playfair, jetbrains } from "@/lib/fonts";
import "./globals.css";
import NoiseOverlay from "@/components/ui/NoiseOverlay";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="antialiased selection:bg-accent selection:text-text-primary">
        <NoiseOverlay />
        {children}
      </body>
    </html>
  );
}
