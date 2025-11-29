# LabelButton Component

레이블 버튼 컴포넌트입니다.

## Figma

[Design - Flifin v3.0.0 > Label button](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5075-11974)

## 사용 방법

```tsx
import { LabelButton } from '@/design-system/components/LabelButton';

// Select 타입 (md 크기)
<LabelButton
  type="select"
  size="md"
  label="성별"
  options={[
    { label: '남성', value: 'male' },
    { label: '여성', value: 'female' },
  ]}
  selectedValue={gender}
  onSelect={(value) => setGender(value)}
/>

// Select 타입 (sm 크기)
<LabelButton
  type="select"
  size="sm"
  label="생년월일 유형"
  options={[
    { label: '양력', value: 'solar' },
    { label: '음력', value: 'lunar' },
  ]}
  selectedValue={calendarType}
  onSelect={(value) => setCalendarType(value)}
/>

// Check 타입
<LabelButton
  type="check"
  size="sm"
  label="추가 옵션"
  checkLabel="잘 모르겠어요"
  checked={isUnsure}
  onCheck={(checked) => setIsUnsure(checked)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'select' \| 'check'` | - | 버튼 타입 (필수) |
| size | `'md' \| 'sm'` | - | 버튼 크기 (필수) |
| label | `string` | - | 레이블 텍스트 (필수) |
| options | `SelectOption[]` | `[]` | 선택 옵션 (select 타입) |
| selectedValue | `string` | - | 선택된 값 (select 타입) |
| onSelect | `(value: string) => void` | - | 선택 핸들러 (select 타입) |
| checkLabel | `string` | `''` | 체크 버튼 텍스트 (check 타입) |
| checked | `boolean` | `false` | 체크 상태 (check 타입) |
| onCheck | `(checked: boolean) => void` | - | 체크 핸들러 (check 타입) |
| className | `string` | `''` | 커스텀 클래스명 |

### SelectOption

```typescript
interface SelectOption {
  label: string;
  value: string;
}
```

## Variants

### Type=Select
- 2개 옵션 중 하나를 선택
- 선택된 버튼은 violet-400 배경색

### Type=Check
- 단일 체크 버튼
- 체크 아이콘 포함
- 선택 시 violet-400 20% 투명도 배경

### Size=md
- 패딩: 14px 24px
- 테두리 반경: 8px
- 폰트: H6 (15px, Bold)

### Size=sm
- 패딩: 8px 12px (select) / 8px 16px 8px 12px (check)
- 테두리 반경: 4px
- 폰트: H7 (14px, Bold)

## 디자인 스펙

### Typography
- **레이블**: `typography.body.body5` (14px, Medium)
- **버튼 (md)**: `typography.title.h6` (15px, Bold)
- **버튼 (sm)**: `typography.title.h7` (14px, Bold)

### Colors
- **레이블**: `colors.neutral[100]` (#D7E1EE)
- **버튼 비활성**: `colors.background.glassEffect` (rgba(123, 134, 150, 0.15))
- **버튼 활성 (Select)**: `colors.violet[400]` (#5E69D4)
- **버튼 활성 (Check)**: `colors.background.badgePrimary` (rgba(94, 105, 212, 0.2))
- **버튼 텍스트 비활성**: `colors.neutral[100]` (#D7E1EE)
- **버튼 텍스트 활성**: `colors.text.main` (#F4F4F5)

### Layout
- **컨테이너 패딩**: 20px
- **레이블-버튼 간격**: 10px
- **버튼 간 간격**: 8px
