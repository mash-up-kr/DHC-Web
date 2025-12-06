"use client";

import { useState, useEffect } from "react";
import { ResultLoading, ResultPreview, ResultContent } from "./_components";

type ResultStep = 'loading' | 'preview' | 'content';

export default function Result() {
  const [step, setStep] = useState<ResultStep>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('preview');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleShare = () => {
    setStep('content');
  };

  if (step === 'loading') {
    return <ResultLoading />;
  }

  if (step === 'preview') {
    return <ResultPreview onShare={handleShare} />;
  }

  return <ResultContent />;
}
