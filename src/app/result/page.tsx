"use client";

import { useState, useEffect } from "react";
import { ResultLoading, ResultReady, ResultPreview, ResultContent } from "./_components";

type ResultStep = 'loading' | 'ready' | 'preview' | 'content';

export default function Result() {
  const [step, setStep] = useState<ResultStep>('loading');

  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('ready');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleConfirm = () => {
    setStep('preview');
  };

  const handleShare = () => {
    setStep('content');
  };

  if (step === 'loading') {
    return <ResultLoading />;
  }

  if (step === 'ready') {
    return <ResultReady onConfirm={handleConfirm} />;
  }

  if (step === 'preview') {
    return <ResultPreview onShare={handleShare} />;
  }

  return <ResultContent />;
}
