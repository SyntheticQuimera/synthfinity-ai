"use client";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export default function SubscriptionButton({
  isPro = false,
}: SubscriptionButtonProps) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.log("BILLING_ERROR", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      disabled={loading}
      className={!isPro ? "hover:scale-105 group" : ""}
      variant={isPro ? "default" : "premium"}
      onClick={onClick}
    >
      {!isPro && (
        <div className="relative flex w-4 h-4 mr-2">
          <Zap className="absolute w-full h-full fill-white group-hover:animate-ping" />
          <Zap className="w-4 h-4 fill-white" />
        </div>
      )}
      {isPro ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
}
