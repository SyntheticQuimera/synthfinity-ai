"use client";
import React from "react";
import Typewriter from "typewriter-effect";
import { Button } from "./ui/button";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function LandingHero() {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5 ">
      <div className="space-y-5 font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        <h1>AI-powered creations for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-600 h-10 sm:h-12 md:h-[3.75rem] lg:h-[4.5rem]">
          <Typewriter
            options={{
              strings: [
                "Text Generation.",
                "Code Generation.",
                "Photo Generation.",
                "Music Generation.",
                "Video Generation.",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div>
        <small className="text-muted-foreground">
          Powered by OpenAi & Replicate
        </small>
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="premium" size="lg">
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div>
        <small className="text-muted-foreground">No credit card required</small>
      </div>
    </div>
  );
}
