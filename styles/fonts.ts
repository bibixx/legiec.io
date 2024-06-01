import localFont from "next/font/local";

export const clashDisplay = localFont({
  src: "./fonts/ClashDisplay-Variable.woff2",
  weight: "200 700",
  display: "swap",
  style: "normal",
  variable: "--font-clash-display",
});

export const inter = localFont({
  src: [
    { path: "./fonts/InterVariable.woff2", style: "normal" },
    { path: "./fonts/InterVariable-Italic.woff2", style: "italic" },
  ],
  weight: "100 900",
  display: "swap",
  variable: "--font-general-sans",
});
