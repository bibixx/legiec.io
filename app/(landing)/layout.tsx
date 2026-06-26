import type { Metadata } from "next";
import "@/styles/globals.css";
import { Matomo } from "@/components/Matomo";
import { cn } from "@/lib/utils";
import { clashDisplay, inter } from "@/styles/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Noise } from "@/components/Noise/Noise";

export const metadata: Metadata = {
  title: "Bartek Legięć | legiec.io",
  metadataBase: new URL("https://legiec.io"),
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

const NO_NOISE_SCRIPT = /* js */ `
if (/firefox|fxios/i.test(navigator.userAgent)) {
  document.documentElement.setAttribute("data-no-noise","true");
}
`;

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <html
        lang="en"
        className={cn(clashDisplay.variable, inter.variable, "dark")}
        suppressHydrationWarning
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: NO_NOISE_SCRIPT }} />
        </head>
        <Matomo />
        <body>
          {children}
          <Noise />
        </body>
      </html>
    </TooltipProvider>
  );
}
