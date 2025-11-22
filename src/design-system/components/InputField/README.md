# InputField Component

텍스트 입력 필드 컴포넌트입니다.

## Props

### InputFieldProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | `'text' \| 'number' \| 'date' \| 'email' \| 'tel'` | `'text'` | 입력 필드 타입 |
| label | `string` | - | 라벨 텍스트 |
| placeholder | `string` | - | 플레이스홀더 텍스트 |
| value | `string` | - | 입력값 |
| onChange | `(value: string) => void` | - | 입력값 변경 핸들러 |
| errorMessage | `string` | - | 에러 메시지 |
| disabled | `boolean` | `false` | 비활성화 여부 |
| fullWidth | `boolean` | `true` | 전체 너비 사용 여부 |
| className | `string` | `''` | 추가 CSS 클래스 |
| maxLength | `number` | - | 최대 입력 길이 |

## 상태 (Status)

- **default**: 기본 상태
- **focused**: 포커스된 상태
- **error**: 에러 상태 (errorMessage가 있을 때)
- **disabled**: 비활성화 상태

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

### 에러 상태

```tsx
<InputField
  label="이메일"
  type="email"
  placeholder="이메일을 입력하세요"
  value={email}
  onChange={setEmail}
  errorMessage="올바른 이메일 형식이 아닙니다"
/>
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

## 스타일

- **배경색**: `colors.background.main`
- **테두리**: 상태에 따라 변경
  - default: `colors.neutral[500]`
  - focused: `colors.violet[400]`
  - error: `#FF6B6B`
  - disabled: `colors.neutral[600]`
- **텍스트**: `typography.body.body3`
- **에러 메시지**: `typography.body.body6`, `#FF6B6B`

## TODO

- [ ] 실제 디자인 스펙에 맞게 스타일 수정
- [ ] 접근성(a11y) 개선
- [ ] 아이콘 지원 추가
- [ ] 헬퍼 텍스트 추가
