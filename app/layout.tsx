import type { Metadata } from "next";
import { Geist, Geist_Mono , Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Price Wice",
  description: "Track your favorite product",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontInter.className} antialiased`}
      >
        <main className="max-w-10xl mx-auto">
          <Navbar/>
        {children}
        </main>
      </body>
    </html>
  );
}
