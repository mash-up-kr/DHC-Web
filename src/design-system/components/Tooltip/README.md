# Tooltip

행동에서 설명이 필요한 경우에 사용하는 툴팁 컴포넌트입니다.

## Figma

https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=2709-23592

## Usage

```tsx
import { Tooltip } from '@/design-system/components/Tooltip';

// 기본 사용
<Tooltip label="Flip!" />

// 화살표 위치 변경
<Tooltip label="Flip!" arrowPosition="top-center" />

// 닫기 버튼 표시
<Tooltip
  label="Flip!"
  showCloseButton
  onClose={() => console.log('closed')}
/>

// 화살표 없이
<Tooltip label="Flip!" showArrow={false} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | 툴팁에 표시할 텍스트 (필수) |
| `arrowPosition` | `TooltipArrowPosition` | `'bottom-center'` | 화살표 위치 |
| `showArrow` | `boolean` | `true` | 화살표 표시 여부 |
| `showCloseButton` | `boolean` | `false` | 닫기 버튼 표시 여부 |
| `onClose` | `() => void` | - | 닫기 버튼 클릭 핸들러 |
| `className` | `string` | `''` | 커스텀 클래스명 |
| `style` | `React.CSSProperties` | - | 커스텀 스타일 |

## Arrow Positions

```
TooltipArrowPosition:
  - 'top-center'     // 화살표가 위쪽 중앙
  - 'top-start'      // 화살표가 위쪽 왼쪽
  - 'top-end'        // 화살표가 위쪽 오른쪽
  - 'bottom-center'  // 화살표가 아래쪽 중앙 (기본값)
  - 'bottom-start'   // 화살표가 아래쪽 왼쪽
  - 'bottom-end'     // 화살표가 아래쪽 오른쪽
  - 'left-center'    // 화살표가 왼쪽 중앙
  - 'right-center'   // 화살표가 오른쪽 중앙
```

## Design Specs

- **Background**: `tooltipGradient01` (linear-gradient)
- **Text**: `typography.title.h7`, `colors.violet[400]`
- **Border Radius**: 8px
- **Backdrop Filter**: blur(64px)
- **Opacity**: 88%
- **Padding**: 10px 12px
