import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { primary, primaryLight } from "@/utils/theme";
import HeaderMobile from "@/components/HeaderMobile/HeaderMobile";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Store-Galaxy 🚀",
  description: "StoreGalaxy — Your Online Store of the Future. A modern, fast, and user-friendly shop with a cosmic design and intuitive interface. Discover a new world of innovative shopping! 🚀",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[${primaryLight}]`}
      >
        <Header></Header>
        <HeaderMobile />
        {children}
        <Footer></Footer>
      </body>
    </html>
  );
}
