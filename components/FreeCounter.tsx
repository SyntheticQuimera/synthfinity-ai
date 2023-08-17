"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import { useProModalStore } from "@/store/useProModalStore";

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function FreeCounter({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) {
  const proModal = useProModalStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="space-x-3 flex items-center ml-auto">
      <div className="text-center space-y-1 text-sm font-bold">
        <small>
          {apiLimitCount}/{MAX_FREE_COUNTS} Free Generations
        </small>
        <Progress
          className="h-3 border-border border"
          value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
        />
      </div>
      <Button
        onClick={proModal.onOpen}
        variant="premium"
        className="hidden md:flex hover:scale-105 group"
      >
        <div className="relative flex w-4 h-4 mr-2">
          <Zap className="absolute w-full h-full fill-white group-hover:animate-ping" />
          <Zap className="w-4 h-4 fill-white" />
        </div>
        Upgrade
      </Button>
      <Button
        onClick={proModal.onOpen}
        variant="premium"
        className="md:hidden flex hover:scale-105 focus-visible:scale-105"
      >
        <div className="relative flex w-4 h-4">
          <Zap className="absolute w-full h-full fill-white animate-ping" />
          <Zap className="w-4 h-4 fill-white" />
        </div>
      </Button>
    </div>
  );
}
