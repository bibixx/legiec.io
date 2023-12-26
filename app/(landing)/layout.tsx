import type { Metadata } from "next";
import "@/styles/globals.css";
import { Matomo } from "@/components/Matomo";

export const metadata: Metadata = {
  title: "Bartek Legięć | legiec.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Matomo />
      <body className="bg-neutral-800">{children}</body>
    </html>
  );
}
