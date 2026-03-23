"use client";

import { useParams } from "next/navigation";
import { colors } from "@/design-system/foundations/colors";

export default function WorthTestGroup() {
  const { groupNo } = useParams<{ groupNo: string }>();

  return (
    <div
      style={{ backgroundColor: colors.background.main, minHeight: "100vh" }}
      className="flex flex-col items-center"
    >
      <div className="max-w-md w-full flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Group {groupNo}</h1>
      </div>
    </div>
  );
}
