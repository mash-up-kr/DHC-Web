"use client";

import { useState, useEffect, useRef } from "react";
import { ResultLoading, ResultReadyIntro, ResultReady, ResultPreview, ResultContent, ResultError } from "./_components";
import { useTestStore } from "@/store/useTestStore";
import { isNativeApp } from "@/utils/device";
import { postLoveTest, mapStoreToRequest, LoveTestResponse } from "@/api/loveTest";

type ResultStep = 'loading' | 'readyIntro' | 'ready' | 'preview' | 'content' | 'error';

const MIN_LOADING_TIME = 3000;

// store 필수 값 검증 함수
function validateStoreData(
  userInfo: { gender: string; name: string },
  userBirth: { year: string; month: string },
  partnerInfo: { gender: string; name: string },
): boolean {
  if (!userInfo.gender || !userInfo.name) return false;
  if (!userBirth.year || !userBirth.month) return false;
  if (!partnerInfo.gender || !partnerInfo.name) return false;
  return true;
}

export default function Result() {
  const [step, setStep] = useState<ResultStep>('loading');
  const { userInfo, userBirth, partnerInfo, partnerBirth, loveDate, hasShared } = useTestStore();
  const [isApp, setIsApp] = useState(false);
  const [apiResult, setApiResult] = useState<LoveTestResponse | null>(null);
  const [isApiLoaded, setIsApiLoaded] = useState(false);
  const [isMinTimeElapsed, setIsMinTimeElapsed] = useState(false);
  const hasCalledApi = useRef(false);

  useEffect(() => {
    setIsApp(isNativeApp());
  }, []);

  // step 변경 시 로그
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Result] step: ${step}`);
    }
  }, [step]);

  // ResultLoading 진입 시 API 호출 및 최소 로딩 시간 타이머
  useEffect(() => {
    if (step !== 'loading' || hasCalledApi.current) return;

    // store 값 검증 - 필수 값이 없으면 error 페이지로 이동
    const isValid = validateStoreData(userInfo, userBirth, partnerInfo);
    if (!isValid) {
      setStep('error');
      return;
    }

    hasCalledApi.current = true;

    // 최소 로딩 시간 타이머
    const timer = setTimeout(() => {
      setIsMinTimeElapsed(true);
    }, MIN_LOADING_TIME);

    // API 호출
    const fetchResult = async () => {
      const request = mapStoreToRequest({
        userInfo,
        userBirth,
        partnerInfo,
        partnerBirth,
        loveDate,
      });
      try {
        const response = await postLoveTest(request);
        setApiResult(response);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('[Result] LoveTest API Error:', error);
          console.error('[Result] Request:', request);
        }
        setStep('error');
        return;
      }
      setIsApiLoaded(true);
    };

    fetchResult();

    return () => clearTimeout(timer);
  }, [step]);

  // API 응답 완료 + 최소 로딩 시간 경과 시 다음 step으로 이동
  useEffect(() => {
    if (step !== 'loading') return;
    if (!isApiLoaded || !isMinTimeElapsed) return;

    if (hasShared) {
      setStep('content');
    } else {
      setStep('readyIntro');
    }
  }, [step, isApiLoaded, isMinTimeElapsed, hasShared]);

  const handleIntroComplete = () => {
    setStep('ready');
  };

  const handleConfirm = () => {
    if (isApp) {
      setStep('content');
    } else {
      setStep('preview');
    }
  };

  const handleShare = () => {
    setStep('content');
  };

  if (step === 'loading') {
    return <ResultLoading />;
  }

  if (step === 'error') {
    return <ResultError />;
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

  return <ResultContent result={apiResult} />;
}
