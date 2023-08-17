import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar";
import { useUser } from "@clerk/nextjs";

export default function UserAvatar() {
  const { user } = useUser();
  return (
    <Avatar>
      <AvatarImage
        src={user?.imageUrl}
      />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
