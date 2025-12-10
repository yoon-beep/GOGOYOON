import Vue from 'vue'
import VueRouter from 'vue-router'

// 1) 각 페이지 컴포넌트 import
import MainPage from '@/views/MainPage.vue'
import NoticePage from '@/views/NoticePage.vue'
import NoticeDetail from '@/pages/NoticeDetail.vue'
import NoticeWrite from '@/pages/NoticeWrite.vue'
import MailPage from '@/views/MailPage.vue'
import ApprovalPage from '@/views/ApprovalPage.vue'
import OrgPage from '@/views/OrgPage.vue'
import CompanyPage from '@/views/CompanyPage.vue'

// 2) Vue에 라우터 플러그인을 등록, 전역 등록
Vue.use(VueRouter)

// 3) URL(경로)별로 어떤 컴포넌트를 보여줄지 설정
const routes = [
  {
    path: '/',          // http://localhost:8080/
    name: 'Main',
    component: MainPage,
  },
  {
    path: '/notice',    // http://localhost:8080/notice
    name: 'Notice',
    component: NoticePage,
  },
  {
    path: '/notice/write',
    name: 'NoticeWrite',
    component: NoticeWrite,
  },
  {
    path: '/notice/:id',
    name: 'NoticeDetail',
    component: NoticeDetail,
    props: true,  // 나중에 원하면 props 방식도 써볼 수 있음
  },
  {
    path: '/mail',      // http://localhost:8080/mail
    name: 'Mail',
    component: MailPage,
  },
  {
    path: '/approval',  // http://localhost:8080/approval
    name: 'Approval',
    component: ApprovalPage,
  },
  {
    path: '/org',       // http://localhost:8080/org
    name: 'Org',
    component: OrgPage,
  },
  {
    path: '/company',   // http://localhost:8080/company
    name: 'Company',
    component: CompanyPage,
  },
]

// 4) 라우터 인스턴스 생성
const router = new VueRouter({
  mode: 'history',              // 주소 예쁘게: /notice 이런 형식
  base: process.env.BASE_URL,   // 배포 시 기본 경로
  routes,                       // 위에서 정의한 routes 배열
})

// 5) main.js에서 쓸 수 있도록 export
export default router
