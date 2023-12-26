import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/Toaster/Toaster";

const fontSans = FontSans({
  subsets: ["latin", "latin-ext"],
  // src: "../fonts/GeneralSans-Variable.woff2",
  // style: "normal",
  // subsets: ["latin"],
  // variable: "--font-sans",
});

// const fontSansItalic = Font({
//   src: "../fonts/Satoshi-VariableItalic.woff2",
//   weight: "300 900",
//   style: "italic",
//   // subsets: ["latin"],
//   // variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "legiec.io Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.className
          // fontSansItalic.className
        )}
      >
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
        <Toaster />
      </body>
    </html>
  );
}
