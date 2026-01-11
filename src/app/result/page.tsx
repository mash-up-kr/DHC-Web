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
  userBirth: { year: string; month: string; day: string },
  partnerInfo: { gender: string; name: string },
  partnerBirth: { year: string; month: string; day: string },
  loveDate: { year: string; month: string; day: string },
): boolean {
  // userInfo 검증
  if (!userInfo.gender || !userInfo.name) return false;

  // userBirth 검증
  if (!userBirth.year || !userBirth.month || !userBirth.day) return false;

  // partnerInfo 검증
  if (!partnerInfo.gender || !partnerInfo.name) return false;

  // partnerBirth 검증
  if (!partnerBirth.year || !partnerBirth.month || !partnerBirth.day) return false;

  // loveDate 검증
  if (!loveDate.year || !loveDate.month || !loveDate.day) return false;

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

  // ResultLoading 진입 시 API 호출 및 최소 로딩 시간 타이머
  useEffect(() => {
    if (step !== 'loading' || hasCalledApi.current) return;

    // store 값 검증 - 필수 값이 없으면 error 페이지로 이동
    const isValid = validateStoreData(userInfo, userBirth, partnerInfo, partnerBirth, loveDate);
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
      try {
        const request = mapStoreToRequest({
          userInfo,
          userBirth,
          partnerInfo,
          partnerBirth,
          loveDate,
        });
        const response = await postLoveTest(request);
        setApiResult(response);
      } catch (error) {
        console.error('LoveTest API Error:', error);
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
