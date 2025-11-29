# Badge Component

상태, 카테고리, 레벨 등을 표시하는 배지 컴포넌트입니다.

## Figma

[Design - Flifin v3.0.0 > Badge](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=541-33903)

## 사용 방법

```tsx
import { Badge } from '@/design-system/components/Badge';

// 카테고리 배지
<Badge type="spendType">식음료</Badge>

// 날짜 배지
<Badge type="date">2025년 5월 20일</Badge>

// 레벨 배지
<Badge type="levelEasy">Easy</Badge>
<Badge type="levelMedium">Mid</Badge>
<Badge type="levelHard">Hard</Badge>

// D-day 배지
<Badge type="dDay">D-12</Badge>

// 완료 상태 배지
<Badge type="complete" total={3}>2</Badge>

// 비활성화 상태
<Badge type="levelEasy" status="disabled">Easy</Badge>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `BadgeType` | - | 배지 타입 (필수) |
| status | `'active' \| 'disabled'` | `'active'` | 배지 상태 |
| children | `React.ReactNode` | - | 배지에 표시할 텍스트 (필수) |
| total | `number` | - | complete 타입에서 전체 값 (예: 2/3에서 3) |
| className | `string` | `''` | 커스텀 클래스명 |

## 배지 타입

### spendType
카테고리를 표시하는 배지입니다.
- **배경**: `glassEffect` (rgba(123, 134, 150, 0.15))
- **텍스트**: `violet-200` (#B5BAEB)
- **모서리**: pill (999px)
- **높이**: 27px
- **폰트**: Head/H8 (13px, 600)

### date
날짜를 표시하는 배지입니다.
- **배경**: `glassEffect` (rgba(123, 134, 150, 0.15))
- **텍스트**: `neutral-100` (#D7E1EE)
- **모서리**: pill (999px)
- **높이**: 24px
- **폰트**: Body/B6 (13px, 400)

### levelEasy
Easy 레벨을 표시하는 배지입니다.
- **배경**: `badgePrimary` (rgba(94, 105, 212, 0.2))
- **텍스트**: `#70A2FF`
- **모서리**: 12px
- **높이**: 24px
- **폰트**: Body/B6 (13px, 400)

### levelMedium
Medium 레벨을 표시하는 배지입니다.
- **배경**: `badgePrimary` (rgba(94, 105, 212, 0.2))
- **텍스트**: `violet-200` (#B5BAEB)
- **모서리**: 12px
- **높이**: 24px
- **폰트**: Body/B6 (13px, 400)

### levelHard
Hard 레벨을 표시하는 배지입니다.
- **배경**: `badgePrimary` (rgba(94, 105, 212, 0.2))
- **텍스트**: `#E293A4`
- **모서리**: 12px
- **높이**: 24px
- **폰트**: Body/B6 (13px, 400)

### dDay
D-day를 표시하는 배지입니다.
- **배경**: `badgePrimary` (rgba(94, 105, 212, 0.2))
- **텍스트**: `violet-200` (#B5BAEB)
- **모서리**: 12px
- **높이**: 24px
- **폰트**: Body/B6 (13px, 400)

### complete
완료 상태를 표시하는 배지입니다. (예: 2/3)
- **배경**: `glassEffect` (rgba(123, 134, 150, 0.15))
- **텍스트**: `neutral-30` (#F4F4F5) / 분모는 20% opacity
- **모서리**: pill (999px)
- **높이**: 24px
- **폰트**: Head/H8 (13px, 600) / 분모는 Body/B6

## 상태

### active (기본값)
활성화된 상태로, 각 타입별 고유 색상이 적용됩니다.

### disabled
비활성화된 상태입니다.
- **배경**: `neutral-500` (#3D424B)
- **텍스트**: `neutral-300` (#7B8696)

## 디자인 토큰

### Colors
- `colors.background.glassEffect`: 카테고리/날짜/완료 배지 배경
- `colors.background.badgePrimary`: 레벨/D-day 배지 배경
- `colors.violet[200]`: spendType, levelMedium, dDay 텍스트
- `colors.neutral[100]`: date 텍스트
- `colors.neutral[30]`: complete 텍스트
- `colors.neutral[300]`: disabled 텍스트
- `colors.neutral[500]`: disabled 배경

### Typography
- `typography.title.h8`: spendType, complete 타입 (13px, 600)
- `typography.body.body6`: 그 외 타입 (13px, 400)

## 레이아웃

- **패딩**: 4px 12px
- **높이**: 24px (spendType은 27px)
- **정렬**: 가로/세로 중앙 정렬
