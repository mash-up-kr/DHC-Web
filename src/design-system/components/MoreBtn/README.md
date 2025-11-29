# MoreBtn Component

더보기 버튼 컴포넌트입니다.

## Figma

[Design - Flifin v3.0.0 > More-btn](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=541-33848)

## 사용 방법

```tsx
import { MoreBtn } from '@/design-system/components/MoreBtn';

// 기본 사용
<MoreBtn onClick={() => console.log('더보기 클릭')} />

// 커스텀 텍스트
<MoreBtn onClick={handleClick}>자세히 보기</MoreBtn>

// 아이콘 없이 사용
<MoreBtn showIcon={false}>더보기</MoreBtn>

// 아이콘 없이 + 커스텀 텍스트
<MoreBtn showIcon={false} onClick={handleClick}>
  전체 보기
</MoreBtn>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | `React.ReactNode` | `'더보기'` | 버튼 텍스트 |
| showIcon | `boolean` | `true` | chevron-right 아이콘 표시 여부 |
| onClick | `() => void` | - | 클릭 이벤트 핸들러 |
| className | `string` | `''` | 커스텀 클래스명 |

## 디자인 스펙

### 레이아웃
- **패딩**: 아이콘 있음: `4px 8px 4px 12px` / 아이콘 없음: `4px 12px`
- **gap**: 4px (텍스트와 아이콘 사이)
- **모서리**: pill (999px)

### Colors
- **배경**: `colors.neutral[700]` (#1F2127)
- **텍스트**: `colors.neutral[300]` (#7B8696)
- **아이콘**: `colors.neutral[300]` (#7B8696)

### Typography
- **텍스트**: `typography.body.body6` (13px, 400)

### Icon
- **chevron-right**: 20x20px
