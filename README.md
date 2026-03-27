
  # Bread-Themed MBTI Test Screen

  This is a code bundle for Bread-Themed MBTI Test Screen. The original project is available at https://www.figma.com/design/Epk7XIAp4nHFJY5jfnVcpZ/Bread-Themed-MBTI-Test-Screen.
https://breadbti.vercel.app
  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## 프로젝트 구조 (그래프 + 주석)

  ```text
  Bread-MBTI/
  ├─ ATTRIBUTIONS.md                # 사용한 리소스/저작권 표기
  ├─ index.html                     # Vite 엔트리 HTML
  ├─ package.json                   # 스크립트/의존성 정의
  ├─ postcss.config.mjs             # PostCSS 설정
  ├─ vite.config.ts                 # Vite 빌드/개발 서버 설정
  ├─ README.md                      # 프로젝트 안내 문서
  ├─ guidelines/
  │  └─ Guidelines.md               # 과제/작업 가이드 문서
  └─ src/
    ├─ main.tsx                    # React 앱 마운트 시작점
    ├─ app/
    │  ├─ App.tsx                  # 앱 루트 컴포넌트
    │  ├─ routes.ts                # 화면 전환/흐름 라우팅 정의
    │  └─ components/
    │     ├─ Landing.tsx           # 시작(랜딩) 화면
    │     ├─ Loading.tsx           # 로딩 화면
    │     ├─ Question.tsx          # 질문 진행 화면
    │     ├─ Result.tsx            # 결과 화면
    │     ├─ figma/
    │     │  └─ ImageWithFallback.tsx
    │     │                            # 이미지 로드 실패 시 대체 처리 컴포넌트
    │     └─ ui/                  # 재사용 가능한 UI 컴포넌트(shadcn 계열)
    │        ├─ accordion.tsx      # 아코디언
    │        ├─ alert-dialog.tsx   # 알림 다이얼로그
    │        ├─ ...                # 버튼/폼/모달/탭 등 공통 UI 컴포넌트 다수
    │        └─ utils.ts           # UI 유틸리티 함수
    ├─ assets/                     # 이미지/정적 리소스
    └─ styles/
      ├─ fonts.css                # 폰트 선언
      ├─ index.css                # 전역 스타일 엔트리
      ├─ tailwind.css             # Tailwind 레이어/유틸 스타일
      └─ theme.css                # 테마 변수/토큰
  ```

  ### 구조 요약

  - 화면 흐름: `Landing` -> `Question` -> `Loading` -> `Result`
  - 핵심 로직 위치: `src/app/routes.ts`, `src/app/components/`
  - 스타일 관리: `src/styles/`에서 전역/테마/유틸리티 CSS를 분리 관리
  
