"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  LogOutIcon,
  MessagesSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Montserrat } from "next/font/google";

const font = Montserrat({ weight: "600", subsets: ["latin"] });

export default function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      color: "text-sky-500",
      active: "bg-sky-500",
      hover: "hover:bg-sky-500",
    },
    {
      label: "Conversation",
      icon: MessagesSquare,
      href: "/conversation",
      color: "text-violet-500",
      active: "bg-violet-500",
      hover: "hover:bg-violet-500",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-700",
      active: "bg-pink-700",
      hover: "hover:bg-pink-700",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-700",
      active: "bg-orange-700",
      hover: "hover:bg-orange-700",
    },
    {
      label: "Music Generation",
      icon: Music,
      href: "/music",
      color: "text-emerald-500",
      active: "bg-emerald-500",
      hover: "hover:bg-emerald-500",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-700",
      active: "bg-green-700",
      hover: "hover:bg-green-700",
    },
  ];

  const supportRoutes = [
    {
      label: "Settings",
      icon: Settings,
      href: "/settings",
      color: "text-gray-600",
      active: "bg-gray-600",
      hover: "hover:bg-gray-600",
    },
  ];

  return (
    <div className="flex flex-col h-screen text-white bg-foreground">
      <div className="flex-1">
        <div className="text-center py-4 mb-6 bg-primary">
          <Link
            href="/dashboard"
            className="flex h-8 items-center justify-center relative"
          >
            <div className="relative h-9 w-9 mr-2">
              <Image fill alt="Logo" src="/logo.svg" />
            </div>
            <p className={cn("text-xl font-bold", font.className)}>
              Synthfinity
            </p>
          </Link>
          <small className="text-muted-foreground text-xs">
            Powered with AI technology
          </small>
        </div>
        <div>
          <div className="pb-2 px-6 w-full uppercase text-muted-foreground">
            <small>Main menu</small>
          </div>
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex py-3 px-6 w-full justify-start font-medium cursor-pointer hover:text-white transition-all duration-500 ease-in-out",
                route.hover,
                pathname === route.href
                  ? `text-white ${route.active}`
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    "h-5 w-5 mr-3 group-hover:text-white transition-all duration-500 ease-in-out",
                    pathname === route.href ? `text-white` : route.color
                  )}
                />
                {route.label}
              </div>
            </Link>
          ))}
          <div className="py-2 px-6 w-full uppercase text-muted-foreground">
            <small>Help & Support</small>
          </div>
          {supportRoutes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex py-3 px-6 w-full justify-start font-medium cursor-pointer hover:text-white transition-all duration-500 ease-in-out",
                route.hover,
                pathname === route.href
                  ? `text-white ${route.active}`
                  : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon
                  className={cn(
                    "h-5 w-5 mr-3 group-hover:text-white transition-all duration-500 ease-in-out",
                    pathname === route.href ? `text-white` : route.color
                  )}
                />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="h-3 w-full bg-primary" />
    </div>
  );
}
