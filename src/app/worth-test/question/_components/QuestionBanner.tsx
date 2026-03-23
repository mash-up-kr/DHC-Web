"use client";

import { useState } from "react";

interface QuestionBannerProps {
  src: string;
  alt: string;
}

export function QuestionBanner({ src, alt }: QuestionBannerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ padding: '0 20px' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '192px',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        {/* Placeholder */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#2E3341',
            borderRadius: '16px',
            opacity: isLoaded ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />

        {/* Image */}
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '16px',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
      </div>
    </div>
  );
}
