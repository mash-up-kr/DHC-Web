"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { CTAButtonGroup } from "@/design-system/components/CTAButtonGroup";
import { ScoreText } from "@/design-system/components/ScoreText";
import { MessageCard } from "@/design-system/components/MessageCard";
import { TipCard } from "@/design-system/components/TipCard";
import { Title } from "@/design-system/components/Title";
import { InputFieldGroup } from "@/design-system/components/InputFieldGroup";
import { InputField } from "@/design-system/components/InputField";
import { Modal } from "@/design-system/components/Modal";
import { colors, gradients } from "@/design-system/foundations/colors";
import { typography } from "@/design-system/foundations/typography";
import { useTestStore } from "@/store/useTestStore";
import { openStore } from "@/utils/storeUrl";
import { shareUrl } from "@/utils/share";
import { isNativeApp } from "@/utils/device";
import { goToMain } from "@/utils/bridge";
import { DangerZoneGraphic, DangerZoneGraphicProps } from "./DangerZoneGraphic";
import { LoveTestResponse } from "@/api/loveTest";

interface ResultContentProps {
  result: LoveTestResponse | null;
}

type Gender = 'male' | 'female';

const namePool = ['이**', '김**', '최**', '박**', '임**', '정**', '장**', '강**'];

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Position = { top?: string; bottom?: string; left?: string; right?: string };

// 중앙(40-60%)을 피하고 서로 겹치지 않는 4개 위치 생성
function generateRandomPositions(): Position[] {
  const zones: Array<{ vertical: 'top' | 'bottom'; horizontal: 'left' | 'right' }> = shuffle([
    { vertical: 'top', horizontal: 'left' },
    { vertical: 'top', horizontal: 'right' },
    { vertical: 'bottom', horizontal: 'left' },
    { vertical: 'bottom', horizontal: 'right' },
  ]);

  return zones.map(zone => {
    // 중앙(50%)에서 최소 30% 이상 떨어지도록 설정
    // top/bottom: 5-20%, left/right: 3-20%
    const vValue = `${randomInRange(5, 20)}%`;
    const hValue = `${randomInRange(3, 20)}%`;

    return {
      [zone.vertical]: vValue,
      [zone.horizontal]: hValue,
    };
  });
}

// 위치를 퍼센트 값(0-100)으로 변환
function getPositionPercent(position: Position): { x: number; y: number } {
  let x = 50, y = 50;

  if (position.left) x = parseFloat(position.left);
  if (position.right) x = 100 - parseFloat(position.right);
  if (position.top) y = parseFloat(position.top);
  if (position.bottom) y = 100 - parseFloat(position.bottom);

  return { x, y };
}

// 중심(50%, 50%)에 가장 가까운 rival 찾기
function getClosestRivalName(rivals: DangerZoneGraphicProps['rivals']): string {
  let closestName = rivals[0].name;
  let minDistance = Infinity;

  rivals.forEach(rival => {
    const pos = getPositionPercent(rival);
    const distance = Math.sqrt(Math.pow(pos.x - 50, 2) + Math.pow(pos.y - 50, 2));
    if (distance < minDistance) {
      minDistance = distance;
      closestName = rival.name;
    }
  });

  return closestName;
}

function getDangerZoneData(gender: Gender): DangerZoneGraphicProps {
  const isMale = gender === 'male';
  const rivalPrefix = isMale ? '/icons/icon-female-rival-' : '/icons/icon-male-rival-';
  const names = shuffle(namePool).slice(0, 4);
  const positions = generateRandomPositions();

  return {
    centerIcon: {
      iconImage: isMale ? '/icons/icon-male-crush.png' : '/icons/icon-female-crush.png',
      name: isMale ? '남자 짝사랑' : '여자 짝사랑',
      padding: '20px',
    },
    rivals: [
      { iconImage: `${rivalPrefix}1.svg`, name: names[0], ...positions[0] },
      { iconImage: `${rivalPrefix}2.svg`, name: names[1], ...positions[1] },
      { iconImage: `${rivalPrefix}3.svg`, name: names[2], ...positions[2] },
      { iconImage: `${rivalPrefix}4.svg`, name: names[3], ...positions[3] },
    ],
  };
}

export function ResultContent({ result }: ResultContentProps) {
  const router = useRouter();
  const { partnerInfo, userInfo, setHasShared } = useTestStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApp, setIsApp] = useState(false);

  // 위험요소 데이터 캐싱 (리렌더링 시 랜덤값 유지)
  const dangerZoneData = useMemo(
    () => getDangerZoneData((partnerInfo.gender as Gender) || 'male'),
    [partnerInfo.gender],
  );
  const closestRivalName = useMemo(
    () => getClosestRivalName(dangerZoneData.rivals),
    [dangerZoneData.rivals],
  );

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
        {result?.fortuneDetail && (
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
              message={result.fortuneDetail}
            />
          </div>
        )}

        {/* 그녀와 사귀기 위한 꿀팁! 섹션 */}
        {result?.fortuneTips && result.fortuneTips.length > 0 && (
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
              {result.fortuneTips.map((tip, index) => (
                <TipCard
                  key={index}
                  icon={<img src={tip.image} alt="" style={{ width: '20px', height: '20px' }} />}
                  title={tip.title}
                  value={tip.description}
                  color={tip.hexColor}
                  width="calc(50% - 6px)"
                />
              ))}
            </div>
          </div>
        )}

        {/* 위험요소 섹션 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '4px',
            padding: '20px 0px 16px 0px',
            width: '100%',
          }}
        >
          <img src="/icons/icon-siren.svg" alt="" width={18} height={18} />
          <span
            style={{
              ...typography.title['h5-1'],
              color: colors.text.main,
              textAlign: 'left',
              flex: 1,
            }}
          >
            위험요소
          </span>
        </div>
        <DangerZoneGraphic {...dangerZoneData} />
        <div
          style={{
            width: '100%',
            padding: '16px 0px 20px 0px',
          }}
        >
          <div
            style={{
              backgroundColor: '#1F2127',
              borderRadius: '8px',
              padding: '12px 16px',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <span
              style={{
                fontFamily: 'Wanted Sans',
                fontWeight: 600,
                fontSize: '15px',
                lineHeight: '1.45em',
                color: '#D7E1EE',
                whiteSpace: 'pre-line',
                display: 'block',
              }}
            >
              그의 마음 근처에 4명의 {partnerInfo.gender === 'male' ? '여자' : '남자'}가 있어요!{'\n'}
              특히 <span style={{ color: colors.violet[200] }}>{closestRivalName}</span> 을 조심해야해요{'\n'}
              지금이 아니면 {partnerInfo.gender === 'male' ? '그를' : '그녀를'} 놓칠 수도 있어요...
            </span>
          </div>
        </div>

        {/* 언제 고백할까? 섹션 */}
        {result?.confessDate && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4px',
                padding: '20px 0px 16px 0px',
                width: '100%',
              }}
            >
              <img src="/icons/icon-alarm-clock.svg" alt="" width={18} height={18} />
              <span
                style={{
                  ...typography.title['h5-1'],
                  color: colors.text.main,
                  textAlign: 'left',
                  flex: 1,
                }}
              >
                언제 고백하면 좋을까?
              </span>
            </div>
            <InputFieldGroup
              type="multi"
              size="md"
              align="start"
              fullWidth
              showLabel={false}
              label="언제 고백할까?"
              items={(() => {
                const [year, month, day] = result.confessDate.split('-');
                return [
                  { key: 'year', value: year ?? '', suffix: '년', type: 'number', maxLength: 4, flex: 175 },
                  { key: 'month', value: month ? String(Number(month)) : '', suffix: '월', type: 'number', maxLength: 2, flex: 73.5 },
                  { key: 'day', value: day ? String(Number(day)) : '', suffix: '일', type: 'number', maxLength: 2, flex: 73.5 },
                ];
              })()}
              onChange={() => {}}
            />
          </>
        )}

        {/* 어디서 고백하면 좋을까? 섹션 */}
        {result?.confessLocation && (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '4px',
                padding: '20px 0px 16px 0px',
                width: '100%',
              }}
            >
              <img src="/icons/icon-map-marker.svg" alt="" width={18} height={18} />
              <span
                style={{
                  ...typography.title['h5-1'],
                  color: colors.text.main,
                  textAlign: 'left',
                  flex: 1,
                }}
              >
                어디서 고백하면 좋을까?
              </span>
            </div>
            <div style={{ paddingBottom: '20px' }}>
              <InputField
                value={result.confessLocation}
              />
            </div>
          </>
        )}

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
          onSecondButtonClick={isApp ? () => goToMain() : handleRestart}
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
