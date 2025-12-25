GOGOYOON 프로젝트 정리 (Vue2 + Node/Express + MySQL)
0. 프로젝트 목표

그룹웨어 만들기 (프론트 + 백엔드 + DB)

메인

공지사항 (목록 / 상세 / 작성 / 수정 / 삭제 / 페이지네이션)

메일 (추가 예정)

결재, 조직도, 회사정보 (추가 예정)

이후에 직원 멤버샵(마일리지로 상품 사고파는 기능)도 붙일 계획

1. 폴더 구조 개요
1-1. 프론트엔드 (Vue2 / CLI)

프로젝트 루트 예시:

Client/             # (예전 이름: groupware-front)
 ├─ node_modules/
 ├─ public/
 │   └─ index.html          # SPA 진입 HTML
 ├─ src/
 │   ├─ main.js             # Vue 앱 진입점
 │   ├─ App.vue             # 최상위 레이아웃 (헤더/사이드바/푸터 + router-view)
 │   ├─ router/
 │   │   └─ index.js        # vue-router 설정, 라우트 가드
 │   ├─ pages/
 │   │   ├─ MainPage.vue
 │   │   ├─ NoticePage.vue
 │   │   ├─ NoticeWrite.vue
 │   │   ├─ NoticeDetail.vue
 │   │   ├─ NoticeEdit.vue
 │   │   └─ LoginPage.vue
 │   ├─ components/
 │   │   └─ layout/
 │   │       ├─ GwHeader.vue
 │   │       ├─ GwSidebar.vue
 │   │       └─ GwFooter.vue
 │   └─ api/
 │       └─ client.js       # axios 인스턴스 (apiClient)
 ├─ package.json
 └─ vue.config.js

 . App.vue 레이아웃 구조
2-1. 전체 화면 구성

헤더(GwHeader) : 상단 고정, 사이드바 토글 버튼(☰), 로고, 제목

사이드바(GwSidebar) : 좌측 메뉴, 프로필, 현재 경로 표시

메인 영역 : router-view로 각 페이지 화면 표시

푸터(GwFooter) : 하단 저작권 텍스트

3-1. GwHeader.vue

상단 바

왼쪽: ☰ 버튼 + 로고 동그라미 + “GOGOYOON 그룹웨어”

오른쪽: 여백 (나중에 알림, 검색, 프로필 등 넣을 수 있음)

props: hideSidebarToggle (로그인 페이지일 때 토글 버튼 숨김)

3-2. GwSidebar.vue

프로필 영역 (이름, 이니셜 프로필 이미지, 상태 텍스트)

메뉴 링크(메인, 공지사항, 메일 등)

props:

currentPath : 현재 경로 문자열

isLoggedIn

userName

이벤트:

@logout : 로그아웃 요청

@close : 사이드바 닫기 (지금은 거의 안 쓰거나 모바일용)

(코드는 생략해도 되지만, 핵심 포인트만 기억)

4. Notice (공지) 기능
4-1. NoticePage.vue (목록 + 검색 + 페이지네이션)

서버에서 GET /api/notices 호출해서 공지 목록 가져오기

searchText로 제목 검색

테이블로 번호/제목/작성자/등록일 표시

페이지네이션: page, limit, total, lastPage 계산
4-2. NoticeWrite.vue (공지 작성)

<form @submit.prevent="onSubmit"> 로 새로고침 막고 JS로 처리

v-model로 입력값과 data.form 연결

apiClient.post('/notices', form) 으로 서버에 새 공지 등록

성공 시 → alert + 공지 목록으로 라우터 이동

핵심 포인트:

required 속성: 브라우저 수준에서 필수 입력 체크

.trim()으로 양쪽 공백 제거

서버 응답의 res.data.ok / res.data.data / res.data.message 사용

4-3. NoticeDetail.vue / NoticeEdit.vue / 삭제

this.$route.params.id 로 공지 id 가져오기

GET /api/notices/:id 로 상세 조회

수정:

PUT /api/notices/:id 로 제목/내용/isImportant 수정

affectedRows === 0 이면 없는 공지 or 실패 처리

삭제:

DELETE /api/notices/:id

성공 시 목록으로 이동

5-1. 기본 구조
server/
 ├─ index.js          # Express 서버 진입
 ├─ db.js             # MySQL2 Pool 생성
 └─ routes/
     └─ notices.js    # /api/notices 관련 라우터
