"use client";

import { useEffect, useState, useRef } from "react";
import { ScoreText } from "@/design-system/components/ScoreText";
import { isNativeApp } from "@/utils/device";
import { useScreenImpression, ScreenName } from "@/analytics";

export function ResultLoading() {
  const [isApp, setIsApp] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useScreenImpression(ScreenName.RESULT_LOADING);

  useEffect(() => {
    setIsApp(isNativeApp());
  }, []);

  const handleVideoCanPlay = () => {
    videoRef.current?.play();
  };

  return (
    <div style={{ position: 'relative', height: '100dvh', backgroundColor: '#010105' }}>
      <main
        className="flex flex-col items-center"
        style={{
          backgroundColor: '#000000',
          backgroundSize: 'auto 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
        }}
      >
        {/* ScoreText - 상단 여백 (모바일: 64px, 웹: 26px) */}
        <div style={{ paddingTop: isApp ? '64px' : '26px', width: '100%' }}>
          <ScoreText
            type="loading"
            badgeText="me 🩷 her"
            loadingText={`당신과 그녀의\n궁합을 살펴보는 중이에요...`}
          />
        </div>

        {/* 로딩 비디오/썸네일 - 화면 중앙 */}
        <div
          style={{
            flex: 1,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            marginTop: '-140px',
            background: 'radial-gradient(circle 300px 150px at 50% 66%, rgba(94, 105, 212, 0.4) 23%, rgba(94, 105, 212, 0.12) 51%, rgba(94, 105, 212, 0.04) 75%, rgba(94, 105, 212, 0.02) 88%, rgba(94, 105, 212, 0) 100%)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '375px',
            }}
          >
            {/* 비디오 - poster로 썸네일 노출 후 자동재생 */}
            <video
              ref={videoRef}
              src="/videos/love-test/result-loading-video.mp4"
              poster="/videos/love-test/result-loading-video-thumbnail.png"
              muted
              loop
              playsInline
              onCanPlayThrough={handleVideoCanPlay}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
