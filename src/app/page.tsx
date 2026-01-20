"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Header } from "@/design-system/components/Header/Header";
import { ScoreText } from "@/design-system/components/ScoreText";
import { MoreBtn } from "@/design-system/components/MoreBtn";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { Modal } from "@/design-system/components/Modal/Modal";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";
import { shareRootUrl } from "@/utils/share";
import { isNativeApp } from "@/utils/device";
import { close } from "@/utils/bridge";
import { postShareComplete } from "@/api/share";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetAll } = useTestStore();
  const [isApp, setIsApp] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    setIsApp(isNativeApp());
  }, []);

  useEffect(() => {
    const token = searchParams.get('shareToken');
    if (token) {
      postShareComplete(token)
        .then((response) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('[Home] ShareComplete API Success:', response);
          }
        })
        .catch((error) => {
          if (process.env.NODE_ENV === 'development') {
            console.error('[Home] ShareComplete API Error:', error);
          }
        });
    }
  }, [searchParams]);

  const handleShare = async () => {
    const result = await shareRootUrl();
    if (result.success && result.method === 'clipboard') {
      alert('링크가 클립보드에 복사되었습니다!');
    }
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center p-6"
      style={{ backgroundColor: colors.background.main }}
    >
      <div className="max-w-md w-full flex flex-col items-center">
        {/* SEO를 위한 숨겨진 H1 */}
        <h1 className="sr-only">
          연애 궁합 테스트 - 내 짝사랑은 나한테 관심이 있을까?
        </h1>

        <Header
          type="screenInfo"
          title="그 사람과 나의 궁합은?!"
          currentPage={1}
          totalPage={4}
          showBackButton={isApp}
          showIndicator={false}
          className="fixed top-0 left-0 right-0 z-50"
          onBackClick={() => setShowExitModal(true)}
        />

        {/* 종료 확인 모달 */}
        {showExitModal && (
          <Modal
            title={`지금 테스트를 종료하면\n입력된 정보가 모두 사라져요!`}
            description="정말 나가시겠어요?"
            buttonText="이전으로 돌아가기"
            onButtonClick={() => setShowExitModal(false)}
            secondButtonText="테스트 종료하기"
            onSecondButtonClick={() => close()}
            showCloseButton={true}
            onClose={() => setShowExitModal(false)}
            showOverlay={true}
            onOverlayClick={() => setShowExitModal(false)}
            graphicNode={<></>}
            graphicHeight={0}
          />
        )}

        {/* Header 높이(52px) + 40px 공백 */}
        <div style={{ height: '92px' }} />

        {/* 메인 배너 */}
        <div
          className="w-full flex items-center justify-center -mx-6"
          style={{
            width: 'calc(100% + 48px)',
            padding: '0 20px',
          }}
        >
          <Image
            src="/images/main-banner.png"
            alt="연애 궁합 테스트 메인 배너 - 짝사랑 상대와의 궁합을 확인하세요"
            width={335}
            height={335}
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority
          />
        </div>

        {/* 20px 공백 */}
        <div style={{ height: '20px' }} />

        {/* ScoreText */}
        <ScoreText
          type="result"
          badgeText="짝사랑 하는 그 사람... 나와 잘될 수 있을까?"
          title="그 사람과 나의 연애궁합은?!"
          description={"짝사랑 상대의 생일을 입력하고\n나와의 궁합을 쉽게 확인해보세요!"}
        />
      </div>

      {/* 하단 고정 영역 */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center">
        <div className="max-w-md w-full flex flex-col items-center">
          {/* 참여 인원 표시 */}
          <div style={{ marginBottom: '12px', pointerEvents: 'none' }}>
            <MoreBtn showIcon={false}>
              지금까지 <span style={{ color: '#D8DCE2' }}>389</span>명이 참여했어요
            </MoreBtn>
          </div>

          {/* CTA 버튼 그룹 */}
          <CTAButtonGroup
            type="twoButton"
            primaryButtonText="테스트 시작하기"
            onPrimaryClick={() => {
              resetAll();
              router.push('/test/question/1');
            }}
            secondButtonType="tertiary"
            secondButtonText="공유하기"
            onSecondButtonClick={handleShare}
          />
        </div>
      </div>

    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
