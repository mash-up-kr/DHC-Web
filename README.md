# Flif'n Web

## 프로젝트 개요
- **프로젝트명**: DHC-Web
- **목적**: 모바일 웹 애플리케이션
- **타겟 사용자**: 모바일 디바이스 사용자

## 기술 스택

### 코어 기술
- **프레임워크**: Next.js 15.5.6 (App Router)
- **언어**: TypeScript 5.9.3
- **런타임**: React 19.2.0
- **스타일링**: Tailwind CSS 3.4.18

### 패키지 매니저
- **pnpm**: 10.22.0

### 주요 라이브러리
- **zustand**: 5.0.8 - 상태 관리 (검사 진행률, 답변 저장)
- **framer-motion**: 12.23.24 - 애니메이션 및 페이지 전환
- **react-hook-form**: 7.66.1 - 폼 관리
- **zod**: 4.1.12 - 스키마 검증
- **@hookform/resolvers**: 5.2.2 - React Hook Form과 Zod 통합

### 개발 도구
- **ESLint**: 9.39.1 - 코드 린팅
- **PostCSS**: 8.5.6 - CSS 후처리
- **Autoprefixer**: 10.4.22 - CSS 벤더 접두사 자동 추가

## 프로젝트 구조

```
DHC-Web/
├── src/
│   └── app/
│       ├── globals.css        # 전역 스타일
│       ├── layout.tsx          # 루트 레이아웃
│       └── page.tsx            # 홈 페이지
├── .eslintrc.json              # ESLint 설정
├── .gitignore                  # Git 무시 파일 목록
├── next.config.ts              # Next.js 설정
├── package.json                # 프로젝트 의존성
├── postcss.config.mjs          # PostCSS 설정
├── tailwind.config.ts          # Tailwind CSS 설정
├── tsconfig.json               # TypeScript 설정
└── README.md                   # 이 파일
```

## 설정 파일 상세

### TypeScript 설정 (tsconfig.json)
- **타겟**: ES2017
- **모듈 해석**: bundler
- **경로 별칭**: `@/*` → `./src/*`
- **엄격 모드**: 활성화

### Tailwind CSS 설정
- **컨텐츠 경로**: src/pages, src/components, src/app
- **다크 모드**: 시스템 환경 설정 기반
- **커스텀 색상**: background, foreground (CSS 변수 기반)

### Next.js 설정
- **App Router**: 사용
- **이미지 최적화**: 자동
- **SSR/SSG**: 지원

## 개발 명령어

### 개발 서버 실행
```bash
pnpm dev
```
- 로컬: http://localhost:3000
- 네트워크: http://192.168.0.29:3000

### 프로덕션 빌드
```bash
pnpm build
```

### 프로덕션 서버 실행
```bash
pnpm start
```

### 린트 실행
```bash
pnpm lint
```

## 설치 과정

### 1. pnpm 설치
```bash
npm install -g pnpm
```

### 2. 의존성 설치
```bash
pnpm install
```

### 3. 개발 서버 실행
```bash
pnpm dev
```

## 주요 기능 (예정)

- [ ] 진행률 표시
- [ ] 답변 저장 및 상태 관리
- [ ] 결과 페이지
- [ ] 결과 공유 기능
- [ ] 모바일 최적화 UI/UX

## 개발 가이드라인

### 코딩 스타일
- Trailing comma 사용
- TypeScript strict mode 준수
- ESLint 규칙 준수

### 모바일 우선 설계
- 반응형 디자인 (Tailwind CSS 활용)
- 터치 인터페이스 최적화
- 성능 최적화 (Next.js 이미지 최적화, Code Splitting)

### 상태 관리
- Zustand를 활용한 전역 상태 관리
- 검사 진행 상태, 사용자 답변 저장

### 폼 관리
- React Hook Form + Zod를 활용한 타입 안전 폼 처리
- 유효성 검증
