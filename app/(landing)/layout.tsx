import type { Metadata } from "next";
import "@/styles/globals.css";
import { Matomo } from "@/components/Matomo";
import { cn } from "@/lib/utils";
import { clashDisplay, inter } from "@/styles/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Noise } from "@/components/Noise/Noise";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "Bartek Legięć | legiec.io",
  icons: [
    {
      url: "/favicon.png",
      sizes: "64x64",
      type: "image/png",
    },
    {
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  ],
  description:
    "Senior Product Engineer at Craft Docs, co‑founder of Bodging Bear and zium.app.",
  openGraph: {
    type: "profile",
    username: "bibixx",
    firstName: "Bartek",
    lastName: "Legięć",
    gender: "male",
    images: [
      {
        url: "/og-image.gif",
        width: 1200,
        height: 630,
        alt: "A black and white head shot image of Bartek Legięć wearing a black and white floral shirt.",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <html
        lang="en"
        className={cn(clashDisplay.variable, inter.variable)}
        suppressHydrationWarning
      >
        <Matomo />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Noise />
          </ThemeProvider>
        </body>
      </html>
    </TooltipProvider>
  );
}
