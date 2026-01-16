import type { Metadata } from "next";
// import { Inter } from "next/font/google"; // Using system fonts for now to avoid download issues if offline
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Care.xyz - Reliable Care Services",
  description: "Find trusted caretakers for baby sitting, elderly care, and special needs.",
};

import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main style={{ minHeight: '80vh', paddingTop: '80px' }}>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
