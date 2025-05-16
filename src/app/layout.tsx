import { Inter } from "next/font/google";
import "../styles/globals.css";
import Layout from "@/components/layout/Layout";
import { Metadata } from 'next';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'My Creative Blog',
  description: 'A personal blog built with Next.js, GSAP, and Lenis.',
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
