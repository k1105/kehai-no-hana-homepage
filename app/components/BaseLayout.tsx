import {Geist, Geist_Mono} from "next/font/google";
import type {Lang} from "../dictionaries";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function BaseLayout({
  lang,
  children,
}: Readonly<{
  lang: Lang;
  children: React.ReactNode;
}>) {
  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
