# Title Component

타이틀 컴포넌트입니다.

## Figma

[Design - Flifin v3.0.0 > Title](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=632-5642)

## 사용 방법

```tsx
import { Title } from '@/design-system/components/Title';

// Intro 타입, 중간 크기
<Title
  type="intro"
  size="md"
  title="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
  description="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
/>

// Intro 타입, 작은 크기
<Title
  type="intro"
  size="sm"
  title="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
  description="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
/>

// Page 타입, 중간 크기
<Title
  type="page"
  size="md"
  title="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
  description="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
/>

// Page 타입, 작은 크기
<Title
  type="page"
  size="sm"
  title="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
  description="매일매일 금전운 미션을 통해\n소비습관을 개선해보세요"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'intro' \| 'page'` | - | 타이틀 타입 (필수) |
| size | `'md' \| 'sm'` | - | 타이틀 크기 (필수) |
| title | `string` | - | 타이틀 텍스트 (필수) |
| description | `string` | - | 설명 텍스트 |
| className | `string` | `''` | 커스텀 클래스명 |

## Variants

### Type=Intro
- 텍스트 중앙 정렬
- 인트로 화면에서 사용

### Type=Page
- 텍스트 좌측 정렬
- 일반 페이지에서 사용

### Size=md
- 타이틀: `typography.title.h2` (24px, 700)
- gap: 16px

### Size=sm
- 타이틀: `typography.title['h4-1']` (18px, 600)
- gap: 16px (Intro), 8px (Page)

## 디자인 스펙

### Typography
- **타이틀 (md)**: `typography.title.h2` (24px, Bold)
- **타이틀 (sm)**: `typography.title['h4-1']` (18px, SemiBold)
- **설명**: `typography.body.body3` (16px, Medium)

### Colors
- **타이틀**: `colors.text.main` (#F4F4F5)
- **설명**: `colors.neutral[300]` (#7B8696)

### Layout
- **패딩**: 24px 20px 0px (대부분), 24px 20px (Page/sm)
- **gap**: 16px (대부분), 8px (Page/sm)
