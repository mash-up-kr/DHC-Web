# InputField Component

텍스트 입력 필드 컴포넌트입니다.

## Props

### InputFieldProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'text' \| 'number' \| 'date' \| 'email' \| 'tel'` | `'text'` | 입력 필드 타입 |
| label | `string` | - | 라벨 텍스트 |
| placeholder | `string` | - | 플레이스홀더 텍스트 |
| value | `string` | `''` | 입력값 |
| onChange | `(value: string) => void` | - | 입력값 변경 핸들러 |
| disabled | `boolean` | `false` | 비활성화 여부 |
| fullWidth | `boolean` | `true` | 전체 너비 사용 여부 |
| className | `string` | `''` | 추가 CSS 클래스 |
| maxLength | `number` | - | 최대 입력 길이 |

## 상태 (State)

InputField는 세 가지 상태를 조합하여 스타일을 결정합니다:

- **Active**: value가 있으면 True, 없으면 False
- **Focus**: 입력 필드에 포커스되면 True
- **Disable**: disabled prop이 true이면 True

### 상태별 스타일

| Active | Disable | Focus | Border | Text Color |
|--------|---------|-------|--------|------------|
| True | False | True | 1px solid neutral-500 | text.highlightsSecondary |
| True | False | False | none | text.highlightsSecondary |
| True | True | - | none | neutral-300 |
| False | - | - | none | highlightsSecondary (20% alpha) |

## 사용 예시

### 기본 사용

```tsx
import { InputField } from '@/design-system/components/InputField/InputField';

function Example() {
  const [value, setValue] = useState('');

  return (
    <InputField
      label="이름"
      placeholder="이름을 입력하세요"
      value={value}
      onChange={setValue}
    />
  );
}
```


### 날짜 입력

```tsx
<InputField
  label="생년월일"
  type="date"
  value={birthdate}
  onChange={setBirthdate}
/>
```

### 비활성화 상태

```tsx
<InputField
  label="이름"
  value="홍길동"
  disabled
/>
```

## 공통 스타일

- **배경색**: `colors.neutral[700]`
- **Corner Radius**: `8px`
- **텍스트 Typography**: `typography.title.h6`
- **Padding**: `12px 16px`

## 상태별 스타일 상세

### Active=True, Disable=False
- Focus=True: Border `1px solid neutral-500`, 텍스트 `text.highlightsSecondary`
- Focus=False: Border 없음, 텍스트 `text.highlightsSecondary`

### Active=True, Disable=True
- Border 없음
- 텍스트 `neutral-300`

### Active=False
- Border 없음
- 텍스트 `highlightsSecondary` with 20% alpha

## TODO

- [ ] 접근성(a11y) 개선
- [ ] 아이콘 지원 추가
- [ ] 헬퍼 텍스트 추가
