"use client";

import { useEffect } from "react";
import { logEvent } from "@/utils/firebase";

export const useScreenImpression = (screenName: string) => {
  useEffect(() => {
    logEvent("screen_view", {
      screen_name: screenName,
    });
  }, [screenName]);
};
