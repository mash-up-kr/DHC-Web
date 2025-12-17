"use client";

import { useState, useEffect } from "react";
import { ResultLoading, ResultReadyIntro, ResultReady, ResultPreview, ResultContent } from "./_components";
import { useTestStore } from "@/store/useTestStore";

type ResultStep = 'loading' | 'readyIntro' | 'ready' | 'preview' | 'content';

export default function Result() {
  const [step, setStep] = useState<ResultStep>('loading');
  const { hasShared } = useTestStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasShared) {
        setStep('content');
      } else {
        setStep('readyIntro');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasShared]);

  const handleIntroComplete = () => {
    setStep('ready');
  };

  const handleConfirm = () => {
    setStep('preview');
  };

  const handleShare = () => {
    setStep('content');
  };

  if (step === 'loading') {
    return <ResultLoading />;
  }

  if (step === 'readyIntro') {
    return <ResultReadyIntro onNext={handleIntroComplete} />;
  }

  if (step === 'ready') {
    return <ResultReady onConfirm={handleConfirm} />;
  }

  if (step === 'preview') {
    return <ResultPreview onShare={handleShare} />;
  }

  return <ResultContent />;
}
