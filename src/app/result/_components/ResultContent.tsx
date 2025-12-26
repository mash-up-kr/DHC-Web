"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { ScoreText } from "@/design-system/components/ScoreText";
import { MessageCard } from "@/design-system/components/MessageCard";
import { TipCard } from "@/design-system/components/TipCard";
import { Title } from "@/design-system/components/Title";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { Modal } from "@/design-system/components/Modal";
import { colors, gradients } from "@/design-system/foundations/colors";
import { typography } from "@/design-system/foundations/typography";
import { useTestStore } from "@/store/useTestStore";
import { openStore } from "@/utils/storeUrl";
import { shareUrl } from "@/utils/share";
import { isNativeApp } from "@/utils/device";
import { close } from "@/utils/bridge";

export function ResultContent() {
  const router = useRouter();
  const { partnerInfo, userInfo, setHasShared } = useTestStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsApp(isNativeApp());
  }, []);

  // 2초 후 모달 자동 열기 (Native App에서만)
  useEffect(() => {
    if (!isApp) return;

    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isApp]);

  // 모달이 열려있을 때 스크롤 방지
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

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
  };

  // 상대방 이름 (없으면 빈 문자열)
  const partnerName = partnerInfo.name || '';
  // 사용자 이름 (없으면 빈 문자열)
  const userName = userInfo.name || '';

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

  return (
    <main
      className="flex min-h-screen flex-col items-center p-6"
      style={{ backgroundColor: colors.background.main }}
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
            alignItems: 'center',
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
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>🍴</span>}
              title="행운의 메뉴"
              value="카레"
              width="calc(50% - 6px)"
            />
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>🍀</span>}
              title="행운의 색상"
              value="연두색"
              color="#23B169"
              width="calc(50% - 6px)"
            />
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>😰</span>}
              title="이건 조심해야해!"
              value="치킨, 닭"
              width="calc(50% - 6px)"
            />
            <TipCard
              icon={<span style={{ fontSize: '20px' }}>😣</span>}
              title="이 색상도 조심해!"
              value="흰색"
              color={colors.text.main}
              width="calc(50% - 6px)"
            />
          </div>
        </div>

        {/* 언제 고백할까? 섹션 */}
        <h2
          style={{
            ...typography.title['h5-1'],
            color: colors.text.main,
            textAlign: 'left',
            width: '100%',
            padding: '24px 20px 16px 20px',
            margin: 0,
          }}
        >
          언제 고백할까?
        </h2>
        <InputFieldGroup
          type="multi"
          size="md"
          align="start"
          fullWidth
          showLabel={false}
          label="언제 고백할까?"
          items={[
            { key: 'year', value: '2000', suffix: '년', type: 'number', maxLength: 4, flex: 175 },
            { key: 'month', value: '1', suffix: '월', type: 'number', maxLength: 2, flex: 73.5 },
            { key: 'day', value: '1', suffix: '일', type: 'number', maxLength: 2, flex: 73.5 },
          ]}
          onChange={() => {}}
        />

        {/* 프로모션 텍스트 */}
        <div style={{ marginBottom: '24px' }}>
          <Title
            type="intro"
            size="sm"
            titleNode={
              <p
                style={{
                  ...typography.title['h4-1'],
                  color: colors.text.main,
                  textAlign: 'center',
                  margin: 0,
                }}
              >
                <span
                  style={{
                    background: gradients.textGradient01,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {partnerName ? `${partnerName} 님의 마음을 사로잡기 위해선` : '마음을 사로잡기 위해선'}
                </span>
                <br />
                지금이 타이밍이에요!
              </p>
            }
            description={`연애 성공률을 높이는 ${userName ? `${userName}님` : '당신'} 만의\n맞춤형 미션을 확인해보세요!`}
          />
        </div>

        {/* 앱 프리뷰 이미지 */}
        <div
          style={{
            width: '100%',
            marginBottom: '40px',
          }}
        >
          <img
            src="/images/app-preview-7e1ca8.png"
            alt="앱 미리보기"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
            }}
          />
        </div>

        {/* CTA 버튼 영역 */}
        <CTAButtonGroup
          type="twoButton"
          primaryButtonText={isApp ? "공유하고 러브미션 받기" : "앱 설치하고 맞춤 미션 확인하기"}
          secondButtonText={isApp ? "메인화면으로 돌아가기" : "테스트 다시하기"}
          secondButtonType={isApp ? "tertiary" : "secondary"}
          onPrimaryClick={isApp ? handleShareConfirm : openStore}
          onSecondButtonClick={isApp ? () => close() : handleRestart}
        />
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
          secondButtonText="테스트 결과 확인하기"
          onSecondButtonClick={handleModalClose}
        />
      )}
    </main>
  );
}
