import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Biolo - Catálogo digital com finalização no WhatsApp",
    template: "%s | Biolo",
  },
  description: "Biolo é um catálogo digital para pequenos negócios em Angola. O cliente escolhe os produtos, bota na sacolinha e fecha o pedido direto no WhatsApp.",
  keywords: ["catálogo digital", "WhatsApp", "Angola", "e-commerce", "pequenos negócios", "vender online"],
  authors: [{ name: "Biolo" }],
  creator: "Biolo",
  publisher: "Biolo",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Biolo - Catálogo digital",
    description: "Compre produtos e receba o pedido no WhatsApp. Simples e rápido.",
    url: "https://biolo.ao",
    siteName: "Biolo",
    locale: "pt_AO",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Biolo - Catálogo digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Biolo - Catálogo digital",
    description: "Compre produtos e receba o pedido no WhatsApp.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="pt-AO" 
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        {children}
      </body>
    </html>
  );
}