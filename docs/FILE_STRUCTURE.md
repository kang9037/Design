# StudyCare Next.js 파일 구조

## 📁 프로젝트 개요

**프로젝트 경로**: `C:\Users\kangd\OneDrive - 부산광역시교육청\바탕 화면\cursor\design\studycare-nextjs`

**프레임워크**: Next.js 15.5.4 + React 19.1.0 + TypeScript

**스타일링**: CSS Modules + Global CSS

---

## 📂 전체 파일 구조

```
studycare-nextjs/
├── src/
│   ├── app/                      # Next.js App Router 디렉토리
│   │   ├── browntheme.css        # BrownDarkblue 테마 스타일 (66KB)
│   │   ├── favicon.ico           # 파비콘
│   │   ├── globals.css           # 글로벌 스타일 (CSS 변수, 리셋 등)
│   │   ├── layout.tsx            # 루트 레이아웃 (공통 구조)
│   │   ├── page.tsx              # 메인 홈페이지 (/)
│   │   ├── login/                # 로그인 페이지 디렉토리
│   │   │   └── page.tsx          # 로그인 페이지 (/login)
│   │   └── roadmap/              # 로드맵 생성 페이지 디렉토리
│   │       ├── page.tsx          # 로드맵 페이지 (/roadmap)
│   │       └── roadmap.module.css # 로드맵 전용 스타일
│   └── components/               # 재사용 가능한 컴포넌트
│       ├── Header.tsx            # 헤더 컴포넌트
│       └── Header.module.css     # 헤더 전용 스타일
├── public/                       # 정적 파일 (이미지, 폰트 등)
├── package.json                  # 패키지 의존성 및 스크립트
├── tsconfig.json                 # TypeScript 설정
├── next.config.ts                # Next.js 설정
└── tailwind.config.ts            # Tailwind CSS 설정
```

---

## 🔍 주요 파일 상세 설명

### 1. **로그인 페이지** 📍

**위치**: `src/app/login/page.tsx`

**경로**: `/login`

**기능**:
- 학생/관리자 탭 전환
- 아이디/비밀번호 입력 폼
- 아이디 찾기 모달
- 비밀번호 찾기 모달
- 테스트 계정: `test` / `1111` → `/roadmap` 리다이렉트

**스타일**: BrownDarkblue 테마 (styled-jsx 인라인 스타일)

**컴포넌트 타입**: Client Component (`'use client'`)

---

### 2. **메인 홈페이지** 🏠

**위치**: `src/app/page.tsx`

**경로**: `/`

**기능**:
- Hero 섹션 (영상 플레이어)
- Why Choose Us (6개 SVG 아이콘 카드)
- How It Works (4단계 타임라인)
- Features (11개 기능 카드)
- Reviews (자동 스크롤 슬라이더)
- Comparison Table (비교표)
- FAQ (6개 아코디언)
- Partners (6개 파트너 로고)
- Pricing (3개 요금제)
- Contact Form (문의 폼)
- Footer

**스타일**: `globals.css` + `browntheme.css`

**컴포넌트 타입**: Client Component (`'use client'`)

---

### 3. **로드맵 생성 페이지** 🗺️

**위치**: `src/app/roadmap/page.tsx`

**경로**: `/roadmap`

**기능**:
- 3단계 폼 시스템
  - Step 1: 학생 정보 입력
  - Step 2: AI 분석 로딩 (2.5초)
  - Step 3: 프리미엄 문서 출력 (PDF 다운로드)

**스타일**: `roadmap/roadmap.module.css` (Purple 테마)

**컴포넌트 타입**: Client Component (`'use client'`)

---

### 4. **헤더 컴포넌트** 🎯

**위치**: `src/components/Header.tsx`

**사용 위치**: 모든 페이지 (layout.tsx에서 import)

**기능**:
- 고정 헤더 (스크롤 시 스타일 변경)
- 네비게이션 메뉴 (7개 링크)
- 모바일 반응형 햄버거 메뉴
- 골드 그라디언트 효과

**스타일**: `components/Header.module.css`

**네비게이션 항목**:
1. 🏠 홈 (`/`)
2. 기능 (`/#features`)
3. 선택 이유 (`/#why-choose`)
4. 가격 (`/#pricing`)
5. 후기 (`/#reviews`)
6. 문의 (`/#contact`)
7. **시작하기** (`/login`) - 골드 버튼

---

## 🎨 스타일 시스템

### CSS 파일 구조

| 파일 | 역할 | 크기 |
|------|------|------|
| `globals.css` | 글로벌 스타일, CSS 변수, 리셋 | ~300줄 |
| `browntheme.css` | BrownDarkblue 전체 테마 스타일 | 66KB |
| `Header.module.css` | 헤더 전용 CSS Module | ~185줄 |
| `roadmap.module.css` | 로드맵 페이지 전용 CSS Module | ~563줄 |

### CSS 변수 시스템

```css
/* 메인 컬러 */
--primary-900: #0f172a;          /* Deep Navy */
--accent-600: #ca8a04;           /* Gold */
--success-500: #52a378;          /* Sage Green */

/* 그라디언트 */
--gradient-gold: linear-gradient(135deg, #f59e0b 0%, #ca8a04 50%, #a16207 100%);

/* 그림자 */
--shadow-gold: 0 10px 30px -5px rgba(202, 138, 4, 0.25), 0 0 0 1px rgba(202, 138, 4, 0.10);
```

---

## 🚀 라우팅 구조

### Next.js App Router

```
/ (홈)
├── /login (로그인)
└── /roadmap (로드맵 생성)
```

### 파일 기반 라우팅

| URL 경로 | 파일 위치 | 설명 |
|----------|-----------|------|
| `/` | `src/app/page.tsx` | 메인 홈페이지 |
| `/login` | `src/app/login/page.tsx` | 로그인 페이지 |
| `/roadmap` | `src/app/roadmap/page.tsx` | 로드맵 생성 페이지 |

---

## 🔧 개발 서버 실행

```bash
# 프로젝트 디렉토리로 이동
cd "C:\Users\kangd\OneDrive - 부산광역시교육청\바탕 화면\cursor\design\studycare-nextjs"

# 개발 서버 실행
npm run dev

# 접속 URL
http://localhost:3005
```

**Note**: 포트 3000이 사용 중이므로 자동으로 3005 포트 사용

---

## 📦 주요 의존성

```json
{
  "dependencies": {
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "next": "15.5.4"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@tailwindcss/postcss": "^4",
    "tailwindcss": "^4",
    "eslint": "^9",
    "eslint-config-next": "15.5.4"
  }
}
```

---

## 🎯 주요 기능별 파일 위치

### 로그인 관련
- **페이지**: `src/app/login/page.tsx`
- **스타일**: 인라인 styled-jsx
- **기능**: 탭 전환, 모달, 테스트 로그인

### 로드맵 생성 관련
- **페이지**: `src/app/roadmap/page.tsx`
- **스타일**: `src/app/roadmap/roadmap.module.css`
- **기능**: 3단계 폼, AI 분석, PDF 다운로드

### 공통 헤더 관련
- **컴포넌트**: `src/components/Header.tsx`
- **스타일**: `src/components/Header.module.css`
- **기능**: 네비게이션, 모바일 메뉴, 스크롤 효과

### 홈페이지 섹션 관련
- **페이지**: `src/app/page.tsx`
- **스타일**: `src/app/browntheme.css`
- **기능**: 11개 섹션, 애니메이션, 인터랙션

---

## 📝 코드 컨벤션

### 컴포넌트 타입
- 모든 주요 페이지는 **Client Component** (`'use client'`)
- 인터랙션이 필요한 컴포넌트는 Client Component 사용

### 스타일링 방식
- **CSS Modules**: 컴포넌트 전용 스타일 (Header, Roadmap)
- **Global CSS**: 전역 스타일, CSS 변수 (globals.css)
- **Theme CSS**: BrownDarkblue 테마 (browntheme.css)
- **Styled JSX**: 페이지별 인라인 스타일 (Login)

### 파일 명명 규칙
- 페이지: `page.tsx`
- 컴포넌트: `PascalCase.tsx`
- CSS Module: `ComponentName.module.css`
- 글로벌 CSS: `lowercase.css`

---

## 🔄 최근 업데이트

### 2025-10-08 업데이트 내역

1. **BrownDarkblue 디자인 완벽 구현** (b1b4ad5)
   - 메인 페이지 11개 섹션 완성
   - 로그인 페이지 BrownDarkblue 테마 적용
   - browntheme.css 66KB 추가

2. **헤더 섹션 완벽 구현** (993a2a9)
   - 골드 그라디언트 및 그림자 적용
   - 프리미엄 디자인 효과
   - 모바일 반응형 완성

3. **헤더 네비게이션 개선** (5b8b2a1)
   - 🏠 홈 버튼 추가
   - 레이아웃 구조 개선

4. **CSS Module 글로벌 클래스 수정** (c996863)
   - `:global(.container)` 문법 적용
   - 레이아웃 정렬 문제 해결

---

## 🌐 배포 정보

**Git 브랜치**: `design`

**원격 저장소**: origin/design (3커밋 앞섬)

**빌드 명령어**:
```bash
npm run build
npm run start
```

---

## 📞 문의

프로젝트 관련 문의사항은 프로젝트 README를 참조하세요.

**마지막 업데이트**: 2025-10-08
