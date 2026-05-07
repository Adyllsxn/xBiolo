import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
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
    default: "Catálogo digital com finalização no WhatsApp",
    template: "%s | Catálogo Digital",
  },
  description: "Plataforma de catálogo digital onde o cliente escolhe produtos, adiciona ao carrinho e finaliza o pedido diretamente no WhatsApp.",
  keywords: ["catálogo digital", "WhatsApp", "e-commerce", "carrinho de compras", "vendas online"],
  authors: [{ name: "Adyllsxn" }],
  creator: "Adyllsxn",
  publisher: "Adyllsxn",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Catálogo digital - WhatsApp",
    description: "Compre produtos e receba o pedido no WhatsApp. Simples e rápido.",
    url: "https://github.com/Adyllsxn/xBiolo",
    siteName: "Catálogo Digital",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Catálogo digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo digital - WhatsApp",
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
      lang="pt" 
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-gray-50 font-sans">
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  );
}