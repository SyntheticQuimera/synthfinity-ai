"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export default function CrispChat() {
  useEffect(() => {
    Crisp.configure("f55c78b9-8683-473f-bcd9-d51e6ad32b4f");
  }, []);

  return null;
}
