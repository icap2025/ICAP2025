import dynamic from "next/dynamic";

const DashboardClient = dynamic(() => import("./DashboardClient"));

export default function DashboardPage() {
  return <DashboardClient />;
}