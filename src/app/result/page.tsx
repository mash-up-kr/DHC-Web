"use client";

import { useState, useEffect } from "react";
import { ResultLoading, ResultPreview } from "./_components";

export default function Result() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <ResultLoading />;
  }

  return <ResultPreview />;
}
