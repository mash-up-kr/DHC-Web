# InputFieldGroup Component

입력 필드 그룹 컴포넌트입니다.

## Figma

[Design - Flifin v3.0.0 > Input](https://www.figma.com/design/7xHHLZb5X78nH2Is3CIpFC/Design---Flifin-v3.0.0?node-id=5075-12748)

## 사용 방법

```tsx
import { InputFieldGroup } from '@/design-system/components/InputFieldGroup';

// 단일 입력 필드 (이름 등)
<InputFieldGroup
  type="single"
  size="md"
  label="내 이름"
  items={[
    { key: 'name', value: name, placeholder: '홍길동' },
  ]}
  onChange={(key, value) => setName(value)}
/>

// 다중 입력 필드 (날짜)
<InputFieldGroup
  type="multi"
  size="md"
  label="생년월일"
  items={[
    { key: 'year', value: year, placeholder: '2000', suffix: '년', maxLength: 4 },
    { key: 'month', value: month, placeholder: '1', suffix: '월', maxLength: 2 },
    { key: 'day', value: day, placeholder: '1', suffix: '일', maxLength: 2 },
  ]}
  onChange={(key, value) => {
    if (key === 'year') setYear(value);
    if (key === 'month') setMonth(value);
    if (key === 'day') setDay(value);
  }}
/>

// 단일 입력 필드 (시간)
<InputFieldGroup
  type="single"
  size="md"
  label="태어난 시간"
  items={[
    { key: 'time', value: time, placeholder: '00 : 00' },
  ]}
  onChange={(key, value) => setTime(value)}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'single' \| 'multi'` | - | 그룹 타입 (필수) |
| size | `'md' \| 'lg'` | - | 그룹 크기 (필수) |
| label | `string` | - | 레이블 텍스트 (필수) |
| items | `InputFieldItem[]` | - | 입력 필드 아이템 목록 (필수) |
| onChange | `(key: string, value: string) => void` | - | 값 변경 핸들러 (필수) |
| className | `string` | `''` | 커스텀 클래스명 |

### InputFieldItem

```typescript
interface InputFieldItem {
  key: string;          // 고유 식별자
  value: string;        // 입력 값
  placeholder?: string; // 플레이스홀더
  suffix?: string;      // 접미사 (년, 월, 일 등)
  type?: 'text' | 'number' | 'tel';
  maxLength?: number;   // 최대 글자 수
  disabled?: boolean;   // 비활성화 여부
}
```

## Variants

### Type=Single
- 단일 입력 필드
- 이름, 시간 등에 사용

### Type=Multi
- 다중 입력 필드 (가로 배치)
- 날짜 (년/월/일) 등에 사용

### Size=Md
- 레이블: `typography.body.body5` (14px, Medium)
- 레이블 패딩: 20px 20px 10px

### Size=Lg
- 레이블: `typography.title['h5-1']` (16px, SemiBold)
- 레이블 패딩: 20px 20px 16px

## 디자인 스펙

### Typography
- **레이블 (md)**: `typography.body.body5` (14px, Medium)
- **레이블 (lg)**: `typography.title['h5-1']` (16px, SemiBold)

### Colors
- **레이블**: `colors.neutral[100]` (#D7E1EE)

### Layout
- **입력 필드 간 간격**: 8px
- **입력 컨테이너 패딩**: 0px 20px 20px
