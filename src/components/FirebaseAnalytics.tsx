"use client";

import { useEffect } from "react";
import { initAnalytics } from "@/utils/firebase";

export default function FirebaseAnalytics() {
  useEffect(() => {
    initAnalytics();
  }, []);

  return null;
}
