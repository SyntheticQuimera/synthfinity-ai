import { cn } from "@/lib/utils";
import React from "react";

interface LoaderProps {
  className?: string;
}

export default function Loader({ className }: LoaderProps) {
  return (
    <div className="h-full flex gap-1 items-center justify-center">
      <span
        className={cn("loading-infinity w-10 bg-foreground", className)}
      ></span>
      <small>Loading...</small>
    </div>
  );
}
