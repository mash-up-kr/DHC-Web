"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import worthTestBanner from "../../../public/images/worth-test/main-banner.png";
import { Header } from "@/design-system/components/Header/Header";
import { ScoreText } from "@/design-system/components/ScoreText";
import { MoreBtn } from "@/design-system/components/MoreBtn";
import { CTAButton } from "@/design-system/components/Button/CTAButton";
import { Modal } from "@/design-system/components/Modal/Modal";
import { colors } from "@/design-system/foundations/colors";
import { useTestStore } from "@/store/useTestStore";
import { shareRootUrl } from "@/utils/share";
import { isNativeApp } from "@/utils/device";
import { close } from "@/utils/bridge";
import { postShareComplete } from "@/api/share";
import { getWorthTestStats } from "@/api/worthTest";
import { useScreenImpression, ScreenName } from "@/analytics";

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetAll } = useTestStore();
  const [isApp, setIsApp] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [totalParticipants, setTotalParticipants] = useState<number | null>(null);

  useScreenImpression(ScreenName.HOME);

  useEffect(() => {
    setIsApp(isNativeApp());
  }, []);

  useEffect(() => {
    getWorthTestStats()
      .then((response) => setTotalParticipants(response.totalParticipants))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const token = searchParams.get('shareToken');
    if (token) {
      postShareComplete(token).catch(() => {});
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
          부자 테스트
        </h1>

        <Header
          type="screenInfo"
          title="부자 테스트"
          currentPage={1}
          totalPage={2}
          showBackButton={isApp}
          showIndicator={false}
          className="fixed top-0 left-0 right-0 z-50"
          onBackClick={() => setShowExitModal(true)}
        />


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
            src={worthTestBanner}
            alt="부자 테스트 메인 배너"
            placeholder="blur"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '16px',
            }}
            priority
          />
        </div>

        {/* 20px 공백 */}
        <div style={{ height: '20px' }} />

        {/* ScoreText */}
        <ScoreText
          type="result"
          badgeText="금전운 테스트"
          title="나는 언제쯤 부자될 수 있을까?"
          description={"생년월일을 입력하고\n내 금전운 그래프를 확인해보세요"}
        />

        {/* 하단 고정 영역 높이만큼 여백 */}
        <div style={{ height: '200px' }} />
      </div>

      {/* 하단 고정 영역 */}
      <div className="fixed bottom-0 left-0 right-0 flex flex-col items-center">
        <div className="max-w-md w-full flex flex-col items-center">
          {/* 참여 인원 표시 */}
          <div
            className="relative w-full flex justify-center overflow-visible"
            style={{ paddingBottom: '12px', pointerEvents: 'none' }}
          >
            {/* 그라데이션 배경 */}
            <div
              className="absolute inset-0 w-full h-full"
              style={{
                background: `linear-gradient(to top, ${colors.background.main} 0%, transparent 100%)`,
              }}
            />
            <div className="relative">
            <MoreBtn showIcon={false}>
              지금까지{' '}
              <span style={{ color: '#D8DCE2' }}>
                {(totalParticipants ?? 389).toLocaleString()}
              </span>
              명이 참여했어요
            </MoreBtn>
            </div>
          </div>

          {/* CTA 버튼 그룹 */}
          <div
            className="w-full"
            style={{ backgroundColor: colors.background.main }}
          >
          <div className="flex flex-col gap-2 w-full px-5 pb-8">
            <CTAButton
              buttonType="secondary"
              status="active"
              size="xl"
              fullWidth
              onClick={() => {
                resetAll();
                router.push('/worth-test/question/1');
              }}
            >
              내 부자운 확인하기
            </CTAButton>
            <CTAButton
              buttonType="secondary"
              status="active"
              size="xl"
              fullWidth
              onClick={() => router.push('/worth-test/group/create')}
            >
              랭킹 그룹 만들기
            </CTAButton>
          </div>
          </div>
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
