import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://bhoot.cam'),
  title: {
    default: 'Bhoot.com - Radio Program Free Download',
    template: '%s | Bhoot.com Download' 
  },
  description: 'Download Bhoot.com by RJ Russell, Sunday Suspense, Bhoot FM, Kuasha, Dor, and Midnight Horror Station. High quality audio horror stories free download.',
  
  // --- EXTRACTED KEYWORDS FROM EPISODEBD ---
  keywords: [
    'bhoot.com download', 
    'bhootdotcom download bangla', 
    'bhoot dot com download', 
    'bhoot.com by rj russell download', 
    'download rasel bhoot.com', 
    'download kuasha', 
    'download Odvootoore by Babu Vai', 
    'download Bhoutiggota by Dr. Aalif', 
    'download radio program', 
    'download bhoot fm', 
    'download dor', 
    'dhownload bhoutik', 
    'download sunday suspense', 
    'download radio mirchi', 
    'download all radio program', 
    'download midnight horror station',
    'Download Prem dot Com', 
    'Download Jibon Golpo rj kebria'
  ],
  
  authors: [{ name: 'RJ Russell' }, { name: 'Bhoot.com Team' }],
  creator: 'Bhoot.com',
  publisher: 'Bhoot.com',
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    title: 'Bhoot.com - Horror Audio Stories Download',
    description: 'Listen and download the scariest horror audio stories and paranormal experiences.',
    url: 'https://bhoot.cam',
    siteName: 'Bhoot.com',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg', 
        width: 1200,
        height: 630,
        alt: 'Bhoot.com Horror Stories',
      },
    ],
  },
  
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
	{/*<head>
        {/* 2. Ads Code Here. 
            'beforeInteractive' ensures it loads as early as possible. */}
      {/*  <Script 
          src="https://pl26421586.effectivegatecpm.com/f9/31/2b/f9312ba0cea69089883ba75ed9df3a42.js" 
          strategy="beforeInteractive" 
        />
      </head> */}
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
             <Navbar />
             <div className="min-h-screen flex flex-col">
                <main className="flex-grow">
                    {children}
                </main>
             </div>
             <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}