"use client";

import Footer from "@/components/Landingpage-components/Footer";
import Header from "@/components/Landingpage-components/Header";
import ScrollToTop from "@/components/Landingpage-components/ScrollToTop";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeaderFooter = !pathname.startsWith("/dashboard");
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`bg-[#FCFCFC] ${inter.className}`}>
          {showHeaderFooter && <Header />}
          {children}
          <div id="modal-root" />
          {showHeaderFooter && <Footer />}
          <ScrollToTop />
      </body>
    </html>
  );
}


