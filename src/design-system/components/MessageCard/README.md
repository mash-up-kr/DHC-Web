# MessageCard Component

메시지 카드 컴포넌트입니다. 운세 메시지 등을 표시할 때 사용합니다.

## Figma

[Design - Flifin v3.0.0 > Message card](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=560-13383)

## 사용 방법

```tsx
import { MessageCard } from '@/design-system/components/MessageCard';

<MessageCard
  title="금전운"
  message={`오늘은 지갑을 더 단단히 쥐고 계셔야겠어요.
괜히 시선 가는 거 많고, 충동구매가 살짝 걱정되는 날이에요.

행운의 색인 연두색이 들어간 소품을 곁에 두면
조금 더 차분한 하루가 될지도 몰라요.`}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | `string` | - | 카드 타이틀 (필수) |
| message | `string` | - | 본문 메시지 (필수) |
| className | `string` | `''` | 커스텀 클래스명 |

## 디자인 스펙

### Layout
- **배경색**: `colors.neutral[700]` (#1F2127)
- **border-radius**: 12px
- **padding**: 20px 16px 16px 16px
- **width**: 100%
- **타이틀-본문 간격**: 4px
- **컨텐츠 하단 패딩**: 12px

### Typography
- **타이틀**: `typography.body.body5` (14px, Medium)
- **본문**: `typography.body.body3` (16px, Medium)

### Colors
- **타이틀**: `colors.neutral[400]` (#5D6470)
- **본문**: `colors.neutral[100]` (#D7E1EE)

### 특징
- `message`에 줄바꿈(`\n`)이 포함되면 그대로 표시됩니다 (`white-space: pre-line`)
