"use client";
import React from "react";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./MobileSidebar";
import FreeCounter from "./FreeCounter";

interface NavbarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function Navbar({
  apiLimitCount = 0,
  isPro = false,
}: NavbarProps) {
  return (
    <div className="flex items-center h-[4.5rem] mb-4 px-4 lg:px-8 border-b border-border md:border-none">
      <MobileSidebar />
      <div className="flex w-full items-center">
        <UserButton afterSignOutUrl="/" />
        <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
    </div>
  );
}
