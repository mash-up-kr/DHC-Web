"use client";

import { useEffect, useState, useRef } from "react";
import { ScoreText } from "@/design-system/components/ScoreText";
import { isNativeApp } from "@/utils/device";

export function ResultLoading() {
  const [isApp, setIsApp] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsApp(isNativeApp());
  }, []);

  const handleVideoCanPlay = () => {
    setIsVideoLoaded(true);
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
            {/* 썸네일 이미지 - 비디오 로딩 전까지 표시 */}
            {!isVideoLoaded && (
              <img
                src="/videos/result-loading-video-thumbnail.png"
                alt="Loading"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            )}
            {/* 비디오 - 로딩 완료 후 자동재생 */}
            <video
              ref={videoRef}
              src="/videos/result-loading-video.mp4"
              muted
              loop
              playsInline
              onCanPlayThrough={handleVideoCanPlay}
              style={{
                width: '100%',
                height: 'auto',
                display: isVideoLoaded ? 'block' : 'none',
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
