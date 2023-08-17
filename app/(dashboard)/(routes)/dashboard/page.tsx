"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessagesSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

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

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-5 text-center">
        <h3 className="font-bold">Explore the power of AI</h3>
        <small className="text-muted-foreground font-light">
          Chat with the smartest AI - Experience the power of AI
        </small>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4 h-screen">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="border-border flex items-center hover:shadow-md transition cursor-pointer"
          >
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
              <ArrowRight size={22} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
