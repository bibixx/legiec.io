import type { Metadata } from "next";
import "@/styles/landing.css";
import { Matomo } from "@/components/Matomo";
import { cn } from "@/lib/utils";
import { clashDisplay, inter } from "@/styles/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Noise } from "@/components/Noise/Noise";
import { ThemeProvider } from "@/components/ui/theme-provider";

export const metadata: Metadata = {
  title: "Bartek Legięć | legiec.io",
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
