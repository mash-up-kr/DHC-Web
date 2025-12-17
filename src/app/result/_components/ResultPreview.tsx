"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScoreText } from "@/design-system/components/ScoreText";
import { MessageCard } from "@/design-system/components/MessageCard";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { Modal } from "@/design-system/components/Modal";
import { colors, gradients } from "@/design-system/foundations/colors";
import { typography } from "@/design-system/foundations/typography";
import { openStore } from "@/utils/storeUrl";
import { shareUrl } from "@/utils/share";
import { useTestStore } from "@/store/useTestStore";

interface ResultPreviewProps {
  onShare?: () => void;
}

export function ResultPreview({ onShare }: ResultPreviewProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setHasShared } = useTestStore();

  // 2초 후 모달 자동 열기
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // 임시 궁합 점수 (나중에 실제 계산 로직으로 대체)
  const compatibilityScore = 85;

  const getScoreMessage = (score: number) => {
    if (score >= 90) return "천생연분이에요!\n지금 바로 고백하세요!";
    if (score >= 80) return "결혼까지 꿈꿔볼 수 있을것같아요\n놓치기전에 먼저 고백해보세요!";
    if (score >= 70) return "좋은 궁합이에요!\n서로를 더 알아가 보세요";
    if (score >= 60) return "노력하면 잘 될 수 있어요!\n서로 이해하는 시간이 필요해요";
    return "서로를 이해하는 시간이 필요해요\n천천히 알아가 보세요";
  };

  const handleRestart = () => {
    router.push("/");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleShareConfirm = async () => {
    setIsModalOpen(false);
    const result = await shareUrl();
    if (result.success && result.method === 'clipboard') {
      alert('링크가 클립보드에 복사되었습니다!');
    }
    if (result.success) {
      setHasShared(true);
    }
    onShare?.();
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <main
        className="flex min-h-screen flex-col items-center p-6"
        style={{ backgroundColor: colors.background.main, paddingBottom: '140px' }}
      >
        <div className="text-center max-w-md w-full">
          {/* ScoreText - 최상단 26px 여백, 하단 24px 여백 */}
          <div style={{ paddingTop: '26px', paddingBottom: '24px' }}>
            <ScoreText
              type="result"
              badgeText="궁합점수"
              score={compatibilityScore}
              description={getScoreMessage(compatibilityScore)}
            />
          </div>

          {/* Orb Graphic */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '40px',
            }}
          >
            <div
              style={{
                width: '160px',
                height: '160px',
                borderRadius: '50%',
                backgroundColor: '#2E3341',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'Wanted Sans',
                  fontSize: '16px',
                  fontWeight: 500,
                  color: 'white',
                  opacity: 0.4,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                그래픽 (변경예정)
              </span>
            </div>

            {/* FortuneCard Shadow */}
            <div
              style={{
                width: '132px',
                height: '32px',
                marginTop: '52px',
                background: gradients.cardBottomGradient01,
                borderRadius: '50%',
                opacity: '0.2',
              }}
            />
          </div>

          {/* 궁합 상세보기 섹션 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'flex-start',
              padding: '24px 0',
              width: '100%',
            }}
          >
            <h2
              style={{
                ...typography.title['h5-1'],
                color: colors.text.main,
                width: '100%',
                textAlign: 'left',
              }}
            >
              궁합 상세보기
            </h2>
            <MessageCard
              title="궁합운"
              message="궁합운 관련 설명"
            />
          </div>

          {/* 그녀와 사귀기 위한 꿀팁! 섹션 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'flex-start',
              width: '100%',
            }}
          >
            <h2
              style={{
                ...typography.title['h5-1'],
                color: colors.text.main,
                width: '100%',
                textAlign: 'left',
              }}
            >
              그녀와 사귀기 위한 꿀팁!
            </h2>
            <div
              style={{
                width: '100%',
                height: '212px',
              borderRadius: '12px',
              backgroundImage: 'url(/images/tip-background.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px',
              padding: '62px 76px',
            }}
          >
            <p
              style={{
                ...typography.title['h5-1'],
                background: gradients.textGradient01,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textAlign: 'center',
                margin: 0,
                whiteSpace: 'pre-line',
              }}
            >
              자세한 꿀팁{'\n'}무료로 확인해보세요!
            </p>
            <button
              onClick={handleShareConfirm}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px 8px 16px',
                backgroundColor: 'rgba(123, 134, 150, 0.15)',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontFamily: 'Wanted Sans',
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#D7E1EE',
                }}
              >
                공유하고 내용 확인하기
              </span>
              <img
                src="/images/share-icon.svg"
                alt="공유"
                style={{ width: '16px', height: '16px' }}
              />
            </button>
            </div>
          </div>

          {/* 언제 고백할까? 섹션 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'flex-start',
              width: '100%',
              marginTop: '24px',
            }}
          >
            <h2
              style={{
                ...typography.title['h5-1'],
                color: colors.text.main,
                width: '100%',
                textAlign: 'left',
              }}
            >
              언제 고백할까?
            </h2>
            <img
              src="/images/confession-date.png"
              alt="언제 고백할까?"
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '12px',
              }}
            />
          </div>
        </div>
      </main>

      {/* CTA 버튼 영역 - 하단 고정 */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#0F1114',
        }}
      >
        <div style={{ maxWidth: '448px', margin: '0 auto' }}>
          <CTAButtonGroup
            type="twoButton"
            primaryButtonText="앱 설치하기"
            onPrimaryClick={openStore}
            secondButtonType="secondary"
            secondButtonText="테스트 다시하기"
            onSecondButtonClick={handleRestart}
          />
        </div>
      </div>

      {/* 공유 모달 */}
      {isModalOpen && (
        <Modal
          showOverlay
          onOverlayClick={handleModalClose}
          onClose={handleModalClose}
          showBorder
          badgeText="테스트 완료"
          titleNode={
            <>
              <span
                style={{
                  ...typography.title.h4,
                  background: gradients.textGradient01,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textAlign: 'center',
                }}
              >
                테스트 공유하고
              </span>
              <span
                style={{
                  ...typography.title.h4,
                  color: colors.neutral[30],
                  textAlign: 'center',
                }}
              >
                자세한 내용 확인해보세요!
              </span>
            </>
          }
          graphicHeight={138}
          buttonText="테스트 공유하기"
          onButtonClick={handleShareConfirm}
        />
      )}
    </div>
  );
}
