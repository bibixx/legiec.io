import type { Metadata } from "next";
import "@/styles/globals.css";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
