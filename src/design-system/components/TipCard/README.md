# TipCard Component

팁 카드 컴포넌트입니다. 추천 메뉴, 행운의 색상 등을 표시할 때 사용합니다.

## Figma

[Design - Flifin v3.0.0 > TipCard](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=560-13376)

## 사용 방법

```tsx
import { TipCard } from '@/design-system/components/TipCard';

// 색상 없는 경우 (메뉴 스타일)
<TipCard
  icon={<KnifeIcon />}
  title="오늘의 추천메뉴"
  value="카레"
/>

// 색상 있는 경우 (행운의 색상)
<TipCard
  icon={<CloverIcon />}
  title="행운의 색상"
  value="연두색"
  color="#23B169"
/>

// 색상 있는 경우 (피해야 할 색상)
<TipCard
  icon={<FaceRedIcon />}
  title="피해야 할 색상"
  value="흰색"
  color="#F4F4F5"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | `ReactNode` | - | 아이콘 (24x24) (필수) |
| title | `string` | - | 카드 타이틀 (필수) |
| value | `string` | - | 메인 값 텍스트 (필수) |
| color | `string` | - | 색상 hex값 (선택) |
| className | `string` | `''` | 커스텀 클래스명 |

## Variants

### 색상 없는 경우 (Menu Style)
- 메뉴 추천, 피해야 할 음식 등에 사용
- `value` 텍스트가 기본 색상(`neutral[100]`)으로 표시

### 색상 있는 경우 (Color Style)
- 행운의 색상, 피해야 할 색상 등에 사용
- 색상 dot(8x8 원형)이 `value` 앞에 표시
- `value` 텍스트가 해당 `color`로 표시

## 디자인 스펙

### Layout
- **배경색**: `colors.neutral[700]` (#1F2127)
- **border-radius**: 12px
- **padding**: 16px
- **width**: 160px (고정)
- **헤더-값 간격**: 8px
- **아이콘-타이틀 간격**: 4px
- **색상dot-값 간격**: 8px

### Typography
- **타이틀**: `typography.body.body5` (14px, Medium)
- **값**: `typography.title.h3` (20px, SemiBold)

### Colors
- **타이틀**: `colors.neutral[400]` (#5D6470)
- **값 (기본)**: `colors.neutral[100]` (#D7E1EE)
- **값 (색상 있음)**: `color` prop 값

### Icon
- **크기**: 24x24px
