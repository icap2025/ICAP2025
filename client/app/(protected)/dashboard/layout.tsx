import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Dashboard | ICAP 2025',
  description: 'Dashboard',
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
  
}) {
  return <>{children}</>;
}