# Design Project

프리미엄 웹 디자인 테마 프로젝트

## 📦 배포 정보

- **GitHub Repository**: https://github.com/kang9037/Design
- **배포 브랜치**: `design` (프로덕션 브랜치)
- **웹사이트**: https://www.devssemgong.store/
- **Vercel 프로젝트 ID**: `prj_rGqPtahzKpqDdDJ50UFzc9DcE4X4`
- **프로덕션 URL**: https://design-4aj9hxijg-kangdongwons-projects.vercel.app

## 🎨 포함된 테마

### 1. BrownDarkblue (최신) ⭐
프리미엄 골드 & 네이비 테마 - 고급스럽고 전문적인 디자인
- **HTML 버전**: `/BrownDarkblue`
- **Next.js 버전**: `/studycare-nextjs` ← **메인 프로젝트**
- 메인 파일: `index.html`, `login.html`, `roadmap.html`
- **상세 문서**: [`FILE_STRUCTURE.md`](./FILE_STRUCTURE.md)

### 2. DarkYellow
다크 옐로우 테마 - 세련되고 모던한 디자인
- 위치: `/DarkYellow`
- 메인 파일: `index.html`

### 3. WhiteBlue
화이트 블루 테마 - 깔끔하고 전문적인 디자인
- 위치: `/whiteblue`
- 메인 파일: `index.html`

### 4. Other
추가 디자인 버전들 및 실험적 레이아웃
- 위치: `/other`
- 버전 3 포함: `index-v3.html`

## 📁 프로젝트 구조

```
design/
├── studycare-nextjs/    # 🎯 메인 Next.js 프로젝트 (최신)
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx           # 홈페이지
│   │   │   ├── login/page.tsx     # 로그인 페이지 ← 여기!
│   │   │   ├── roadmap/page.tsx   # 로드맵 페이지
│   │   │   ├── globals.css        # 글로벌 스타일
│   │   │   └── browntheme.css     # BrownDarkblue 테마
│   │   └── components/
│   │       └── Header.tsx         # 공통 헤더
│   ├── package.json
│   └── next.config.ts
├── BrownDarkblue/       # HTML 프로토타입 (참조용)
│   ├── index.html
│   ├── login.html       # 로그인 HTML 원본
│   ├── roadmap.html
│   ├── styles.css
│   └── script.js
├── DarkYellow/          # 다크 옐로우 테마
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── login.html
│   └── ...
├── whiteblue/           # 화이트 블루 테마
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   ├── login.html
│   └── ...
├── other/               # 기타 디자인 버전
│   ├── index.html
│   ├── index-v3.html
│   └── ...
├── assets/              # 스크린샷 및 이미지
└── docs/                # 프로젝트 문서
    ├── README.md        # 이 문서
    └── FILE_STRUCTURE.md # 상세 파일 구조 문서
```

## 🚀 배포 방법

### 자동 배포 (GitHub Push)
모든 변경사항은 `design` 브랜치에 커밋 및 푸시하면 자동으로 배포됩니다.

```bash
git add .
git commit -m "커밋 메시지"
git push origin design
```

### 수동 배포 (Vercel CLI)
Vercel CLI를 사용한 직접 배포:

```bash
# design 브랜치로 이동
git checkout design

# 프로덕션 배포
vercel --prod
```

**참고**: `design` 브랜치가 프로덕션 브랜치로 설정되어 있습니다. `main` 브랜치는 사용하지 않습니다.

## 🔧 로컬 개발

각 테마 폴더의 `index.html` 파일을 브라우저에서 직접 열어 확인할 수 있습니다.

## 🚀 Next.js 프로젝트 실행

### 로컬 개발 서버

```bash
# 프로젝트 디렉토리로 이동
cd studycare-nextjs

# 개발 서버 실행
npm run dev

# 브라우저에서 접속
http://localhost:3005
```

### 로그인 페이지 접속

**URL**: `http://localhost:3005/login`

**위치**: `src/app/login/page.tsx`

**테스트 계정**:
- 아이디: `test`
- 비밀번호: `1111`
- 로그인 시 `/roadmap`으로 이동

---

## 📝 업데이트 로그

- **2025-10-08**:
  - ✨ **BrownDarkblue Next.js 버전 완성**
  - 메인 홈페이지 11개 섹션 완벽 구현
  - 로그인 페이지 BrownDarkblue 테마 적용 (탭, 모달)
  - 로드맵 생성 페이지 3단계 폼 시스템
  - 헤더 컴포넌트 골드 그라디언트 완성
  - 프리미엄 디자인 시스템 적용
  - **상세 문서**: `FILE_STRUCTURE.md` 추가

- **2025-10-05**:
  - 초기 배포 - 3가지 테마 포함 (DarkYellow, WhiteBlue, Other)
  - 루트 index.html에 테마 선택 랜딩 페이지 추가
  - Vercel 배포 설정 완료 (vercel.json)
  - design 브랜치를 프로덕션 브랜치로 설정
  - Vercel CLI를 통한 직접 배포 설정
