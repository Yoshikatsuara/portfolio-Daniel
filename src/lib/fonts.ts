import { Outfit, Playfair_Display, JetBrains_Mono } from "next/font/google";

// Outfit no lugar de Inter: geometrica, mais "tech", combina com o visual
// orbital 3D. Mantem a variavel --font-inter pra nao precisar tocar em quem
// consome (globals.css, layout.tsx).
export const inter = Outfit({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});
