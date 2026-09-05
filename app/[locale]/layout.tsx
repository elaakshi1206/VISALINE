import type { Metadata, Viewport } from "next";
import "../globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import { Providers } from "@/app/providers";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import GlobalBackground from "@/components/ui/GlobalBackground";
import Chatbot from "@/components/ui/Chatbot";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0A182E",
};

export const metadata: Metadata = {
  title: {
    default: "VISALINE — India Visa Online Portal",
    template: "%s | VISALINE — India Visa Online",
  },
  description:
    "The authorized portal for Indian visa applications. Apply for eVisa, Regular Visa, e-Arrival Card, and check your application status. Government of India — Bureau of Immigration.",
  keywords: ["India visa", "eVisa India", "Indian visa online", "visa application", "Bureau of Immigration", "e-Arrival Card"],
  authors: [{ name: "Bureau of Immigration, Ministry of Home Affairs" }],
  openGraph: {
    title: "VISALINE — India Visa Online Portal",
    description: "Apply for Indian eVisa, Regular Visa, e-Arrival Card online. Official Government of India portal.",
    type: "website",
    locale: "en_IN",
  },
  robots: "index, follow",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen w-full overflow-x-hidden flex flex-col bg-background font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <GlobalBackground />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <Chatbot />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
