import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function BotAvatar() {
  return (
    <Avatar className="bg-primary p-1">
      <AvatarImage src="/logo.svg" />
    </Avatar>
  );
}
