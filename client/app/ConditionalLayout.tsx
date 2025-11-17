"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Landingpage-components/Footer";
import Header from "@/components/Landingpage-components/Header";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}