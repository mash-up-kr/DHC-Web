# Design System

이 프로젝트의 디자인 시스템입니다.

## 구조

```
src/design-system/
├── foundations/          # 기본 디자인 토큰
│   ├── colors/          # 색상 시스템
│   ├── typography/      # 폰트/타이포그래피
│   ├── spacing/         # 간격, border-radius, shadow
│   └── index.ts
├── components/          # 재사용 가능한 컴포넌트
│   └── index.ts
├── assets/              # 디자인 리소스
│   └── icons/           # 아이콘 시스템
│       ├── svg/         # SVG 원본 파일
│       ├── components/  # React 아이콘 컴포넌트
│       ├── types.ts     # 아이콘 타입 정의
│       └── index.ts
├── utils/               # 유틸리티 함수
│   └── index.ts
└── index.ts             # 메인 export
```

## 사용 방법

### Foundations (기본 토큰)

```typescript
import { colors, typography, spacing, borderRadius, shadows } from '@/design-system';

// 색상 사용
const primaryColor = colors.primary[500]; // #ec4899

// 타이포그래피 사용
const fontSize = typography.fontSize.lg; // 1.125rem

// 간격 사용
const padding = spacing[4]; // 1rem

// Border radius 사용
const rounded = borderRadius.lg; // 0.5rem

// Shadow 사용
const shadow = shadows.md;
```

### Tailwind CSS와 함께 사용

`tailwind.config.ts`에 디자인 토큰을 확장할 수 있습니다:

```typescript
import { colors, spacing, borderRadius } from './src/design-system';

export default {
  theme: {
    extend: {
      colors,
      spacing,
      borderRadius,
    },
  },
};
```

### Components

디자인 시스템 컴포넌트를 추가할 때는 `src/design-system/components/` 디렉토리에 생성하고 `components/index.ts`에서 export합니다.

예시:
```typescript
// src/design-system/components/Button/index.tsx
export const Button = () => { ... }

// src/design-system/components/index.ts
export { Button } from './Button';
```

### Icons (아이콘)

아이콘은 React 컴포넌트 형태로 제공됩니다.

```typescript
import { HeartIcon } from '@/design-system';

// 기본 사용
<HeartIcon />

// 크기와 색상 커스터마이징
<HeartIcon size={32} color="#ec4899" />

// 클래스명 추가
<HeartIcon className="hover:opacity-80" />

// 클릭 이벤트
<HeartIcon onClick={() => console.log('clicked')} />
```

#### 새로운 아이콘 추가하기

1. SVG 파일을 `src/design-system/assets/icons/svg/`에 저장
2. `src/design-system/assets/icons/components/`에 React 컴포넌트 생성

```typescript
// src/design-system/assets/icons/components/MyIcon.tsx
import React from 'react';
import { IconProps } from '../types';
import { IconWrapper } from './IconWrapper';

export const MyIcon: React.FC<IconProps> = (props) => {
  return (
    <IconWrapper {...props}>
      {/* SVG path 내용 */}
      <path d="..." stroke="currentColor" />
    </IconWrapper>
  );
};
```

3. `src/design-system/assets/icons/components/index.ts`에 export 추가

```typescript
export { MyIcon } from './MyIcon';
```

### Utils

```typescript
import { cn, cssVar } from '@/design-system';

// 클래스명 결합
const className = cn('base-class', condition && 'conditional-class');

// CSS 변수 사용
const color = cssVar('primary-color'); // var(--primary-color)
```

## 디자인 토큰 확장

### 새로운 색상 추가

`src/design-system/foundations/colors/index.ts`에서 색상을 추가하거나 수정합니다.

### 새로운 타이포그래피 추가

`src/design-system/foundations/typography/index.ts`에서 폰트 관련 설정을 추가합니다.

### 새로운 간격 추가

`src/design-system/foundations/spacing/index.ts`에서 spacing, borderRadius, shadows를 추가합니다.
