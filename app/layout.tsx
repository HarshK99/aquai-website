import type { Metadata } from "next";
import { Prata, Manrope } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { series } from "@/data/catalog";

const prata = Prata({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-prata",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Aquai - Premium Bath Accessories & Kitchen Sinks",
    template: "%s | Aquai",
  },
  description:
    "Premium bath accessories and handmade kitchen sinks for homes that value lasting quality.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const seriesList = series.map((s) => ({ slug: s.slug, name: s.name }));

  return (
    <html lang="en" className={`${prata.variable} ${manrope.variable}`}>
      <body className="bg-porcelain text-navy-deep antialiased font-body">
        <MotionProvider>
          <Header seriesList={seriesList} />
          <main id="main-content">{children}</main>
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
