import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { getApiLimitCount } from "@/lib/api-limits";
import { checkSubscription } from "@/lib/subscription";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="relative h-full">
      <div
        className="hidden h-full md:w-64 md:flex md:flex-col 
      md:fixed md:inset-y-0"
      >
        <Sidebar />
      </div>
      <main className="md:pl-64 min-h-screen">
        <Navbar apiLimitCount={apiLimitCount} isPro={isPro} />
        {children}
      </main>
    </div>
  );
}
