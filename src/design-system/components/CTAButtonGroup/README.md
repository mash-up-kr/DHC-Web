# CTAButtonGroup Component

CTA 버튼 그룹 컴포넌트입니다.

## Figma

[Design - Flifin v3.0.0 > CTA Button Group](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=560-35610)

## 사용 방법

```tsx
import { CTAButtonGroup } from '@/design-system/components/CTAButtonGroup';

// 버튼 1개 (Secondary)
<CTAButtonGroup
  type="oneButton"
  secondaryButtonText="확인"
  onSecondaryClick={() => console.log('확인 클릭')}
/>

// 버튼 2개 (Primary + Tertiary)
<CTAButtonGroup
  type="twoButton"
  primaryButtonText="확인"
  onPrimaryClick={() => console.log('확인 클릭')}
  tertiaryButtonText="취소"
  onTertiaryClick={() => console.log('취소 클릭')}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'oneButton' \| 'twoButton'` | - | 그룹 타입 (필수) |
| primaryButtonText | `string` | `'확인'` | Primary 버튼 텍스트 (twoButton 타입) |
| onPrimaryClick | `() => void` | - | Primary 버튼 클릭 핸들러 |
| secondaryButtonText | `string` | `'확인'` | Secondary 버튼 텍스트 (oneButton 타입) |
| onSecondaryClick | `() => void` | - | Secondary 버튼 클릭 핸들러 |
| tertiaryButtonText | `string` | `'취소'` | Tertiary 버튼 텍스트 (twoButton 타입) |
| onTertiaryClick | `() => void` | - | Tertiary 버튼 클릭 핸들러 |
| className | `string` | `''` | 커스텀 클래스명 |

## Variants

### Type=one button
- Secondary 버튼 1개
- gap: 10px

### Type=two button
- Primary 버튼 + Tertiary 버튼
- gap: 8px

## 디자인 스펙

### 레이아웃
- **방향**: Column (세로 배치)
- **패딩**: 20px
- **너비**: 100% (full width)

### 버튼 스타일
- 모든 버튼은 `CTAButton` 컴포넌트 사용
- Size: xl
- Full width 적용
