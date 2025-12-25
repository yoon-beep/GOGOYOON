import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// 1) 각 페이지 컴포넌트 import
import MainPage from '@/views/MainPage.vue'
import NoticePage from '@/views/NoticePage.vue'
import NoticeDetail from '@/pages/NoticeDetail.vue'
import NoticeWrite from '@/pages/NoticeWrite.vue'
import NoticeEdit from '@/pages/NoticeEdit.vue' 
import MailPage from '@/views/MailPage.vue'
import ApprovalPage from '@/views/ApprovalPage.vue'
import OrgPage from '@/views/OrgPage.vue'
import CompanyPage from '@/views/CompanyPage.vue'
import LoginPage from '@/pages/LoginPage.vue' 

// 2) Vue에 라우터 플러그인을 등록, 전역 등록
Vue.use(VueRouter)

// 3) URL(경로)별로 어떤 컴포넌트를 보여줄지 설정
const routes = [
  {
    path: '/',          // http://localhost:8080/
    name: 'Main',
    component: MainPage,
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/notice',    // http://localhost:8080/notice
    name: 'Notice',
    component: NoticePage,
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/notice/write',
    name: 'NoticeWrite',
    component: NoticeWrite,
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/notice/:id',
    name: 'NoticeDetail',
    component: NoticeDetail,
    props: true,  // 나중에 원하면 props 방식도 써볼 수 있음
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/notice/:id/edit',
    name: 'NoticeEdit',
    component: NoticeEdit,
    props: true,  // 나중에 원하면 props 방식도 써볼 수 있음
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/mail',      // http://localhost:8080/mail
    name: 'Mail',
    component: MailPage,
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/approval',  // http://localhost:8080/approval
    name: 'Approval',
    component: ApprovalPage,
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/org',       // http://localhost:8080/org
    name: 'Org',
    component: OrgPage,
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/company',   // http://localhost:8080/company
    name: 'Company',
    component: CompanyPage,
    meta: { requiresAuth: true },   // ✅ 로그인 필요
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
]

// 4) 라우터 인스턴스 생성
const router = new VueRouter({
  mode: 'history',              // 주소 예쁘게: /notice 이런 형식
  base: process.env.BASE_URL,   // 배포 시 기본 경로
  routes,                       // 위에서 정의한 routes 배열
})

// 🔥 전역 라우터 가드
router.beforeEach((to, from, next) => {
  // 세션에서 로그인 여부 확인
  // ✅ auth 모듈의 isLoggedIn getter 사용
  const isLoggedIn = store.getters['auth/isLoggedIn']

  // 이 라우트가 로그인 필요한지?
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !isLoggedIn) {
    // 🔒 로그인 필요 + 비로그인 → 로그인 페이지로
    next({
      name: 'Login',
      query: { redirect: to.fullPath }, // 나중에 로그인 후 원래 페이지로 보내기용
    })
  } else if (to.name === 'Login' && isLoggedIn) {
    // 이미 로그인했는데 /login 가면 → 공지 목록으로 보내기
    next({ name: 'Notice' })
  } else {
    next()
  }
})

// 5) main.js에서 쓸 수 있도록 export
export default router
