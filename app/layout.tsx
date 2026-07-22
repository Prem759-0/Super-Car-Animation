import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apex Automotive — Engineering Without Compromise",
  description: "An immersive digital experience celebrating four iconic vehicles. Design, engineering, and craftsmanship at the absolute limit.",
  keywords: "luxury automotive, supercar, engineering, performance, design",
  openGraph: {
    title: "Apex Automotive — Engineering Without Compromise",
    description: "An immersive digital experience celebrating four iconic vehicles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
