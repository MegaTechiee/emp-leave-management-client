import { Inter, Geist, Geist_Mono } from "next/font/google";

export const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  fallback: ["sans-serif"],
});

export const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  fallback: ["sans-serif"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: 'swap',
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-mono",
  fallback: ["sans-serif"],
});