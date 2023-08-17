"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden mr-3">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="text-white p-0 sm:w-64 w-full border-none "
      >
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}
