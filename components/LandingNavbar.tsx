"use client";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
const font = Montserrat({ weight: "600", subsets: ["latin"] });

export default function LandingNavbar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/" className="flex h-8 items-center justify-center relative">
        <div className="relative h-9 w-9 mr-2">
          <Image fill alt="Logo" src="/logo.svg" />
        </div>
        <p className={cn("text-xl font-bold text-white", font.className)}>
          Synthfinity
        </p>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline">Get Started</Button>
        </Link>
      </div>
    </nav>
  );
}
