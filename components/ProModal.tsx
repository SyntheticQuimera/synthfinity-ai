"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModalStore } from "@/store/useProModalStore";
import { Badge } from "./ui/badge";
import {
  Check,
  CheckCircle2,
  Code,
  ImageIcon,
  MessagesSquare,
  Music,
  VideoIcon,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";

const tools = [
  {
    label: "Conversation",
    icon: MessagesSquare,
    href: "/conversation",
    color: "text-violet-500",
    bgColor: "bg-violet-50",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-pink-700",
    bgColor: "bg-pink-50",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-green-700",
    bgColor: "bg-green-50",
  },
];

export default function ProModal() {
  const proModal = useProModalStore();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = (await response).data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center font-bold items-center gap-2 mb-4">
            Upgrade to Synthfinity
            <Badge variant="premium" className="uppercase text-sm py-1">
              pro
            </Badge>
          </DialogTitle>
          <DialogDescription className="gap-3 flex flex-col">
            {tools.map((tool) => (
              <Card key={tool.href} className="shadow-none flex items-center">
                <div
                  className={cn(
                    "h-16 w-16 grid place-content-center",
                    tool.bgColor
                  )}
                >
                  <tool.icon size={24} className={tool.color} />
                </div>
                <div className="flex w-full justify-between px-6">
                  <strong>{tool.label}</strong>
                  <Check size={22} className="text-indigo-500" />
                </div>
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            variant="premium"
            size="lg"
            className="w-full group"
          >
            <div className="relative flex w-4 h-4 mr-2">
              <Zap className="absolute w-full h-full fill-white group-hover:animate-ping" />
              <Zap className="w-4 h-4 fill-white" />
            </div>
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
