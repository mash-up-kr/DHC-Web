"use client";

import { colors } from "@/design-system/foundations/colors";
import { useScreenImpression, ScreenName } from "@/analytics";

export function ResultError() {
  useScreenImpression(ScreenName.RESULT_ERROR);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background.main,
      }}
    />
  );
}
