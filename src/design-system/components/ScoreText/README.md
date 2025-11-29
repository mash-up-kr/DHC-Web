# ScoreText Component

점수 및 결과를 표시하는 컴포넌트입니다.

## Figma

[Design - Flifin v3.0.0 > Scoretext](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5098-17185)

## 사용 방법

```tsx
import { ScoreText } from '@/design-system/components/ScoreText';

// 결과 표시
<ScoreText
  type="result"
  badgeText="2025년 5월 20일"
  score={35}
  description="마음이 들뜨는 날이에요,
한템포 쉬어가요."
/>

// 점수 단위 변경
<ScoreText
  type="result"
  badgeText="2025년 5월 20일"
  score={85}
  scoreUnit="%"
  description="좋은 결과입니다!"
/>

// 로딩 상태
<ScoreText
  type="loading"
  badgeText="로딩 서브 텍스트"
  loadingText="결과를 분석중이에요..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'result' \| 'loading'` | - | 컴포넌트 타입 (필수) |
| badgeText | `string` | - | 배지에 표시할 텍스트 (필수) |
| score | `number` | - | 점수 (result 타입에서 사용) |
| scoreUnit | `string` | `'점'` | 점수 단위 |
| description | `string` | - | 설명 텍스트 (result 타입에서 사용) |
| loadingText | `string` | - | 로딩 텍스트 (loading 타입에서 사용) |
| className | `string` | `''` | 커스텀 클래스명 |

## 타입별 설명

### result
점수 결과를 표시하는 타입입니다.

**구성:**
1. **Badge** (date 타입): 날짜 등 부가 정보
2. **점수 텍스트**: 그라데이션 스타일
3. **설명 텍스트**: 결과에 대한 설명

**레이아웃:**
- 세로 정렬, 중앙 정렬
- gap: 12px

### loading
로딩 상태를 표시하는 타입입니다.

**구성:**
1. **Badge** (date 타입): 로딩 서브 텍스트
2. **로딩 텍스트**: 로딩 메시지

**레이아웃:**
- 세로 정렬, 중앙 정렬
- gap: 8px
- padding: 0 20px
- 전체 너비 사용

## 디자인 토큰

### Typography
- **점수 텍스트**: `typography.title.h0` (32px, 700)
- **설명 텍스트**: `typography.body.body3` (16px, 500)
- **로딩 텍스트**: `typography.title.h4` (18px, 700)

### Colors
- **점수 텍스트**: `gradients.textGradient02` (violet-200 → neutral-30, 180deg)
- **설명 텍스트**: `colors.neutral[300]` (#7B8696)
- **로딩 텍스트**: `colors.neutral[100]` (#D7E1EE)

### Components
- **Badge**: `date` 타입 사용

## 의존성

이 컴포넌트는 다음 디자인 시스템 컴포넌트를 사용합니다:
- `Badge` 컴포넌트 (date 타입)
