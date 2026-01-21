"use client";

import { useEffect } from "react";
import { logEvent } from "@/utils/firebase";
import { getPlatform, getUserAgent } from "@/utils/device";
import { ScreenNameType } from "./screenNames";

export const useScreenImpression = (screenName: ScreenNameType) => {
  useEffect(() => {
    logEvent("screen_view", {
      screen_name: screenName,
      platform: getPlatform(),
      user_agent: getUserAgent(),
    });
  }, [screenName]);
};
