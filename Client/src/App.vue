<template>
  <div id="app" class="app-layout">
    <!-- 🔹 헤더: 로그인 페이지일 땐 사이드바 버튼 숨김 -->
    <gw-header />

    <!-- 🔹 가운데 영역: 사이드바 + 메인 컨텐츠 -->
    <div class="content-layout">
     <!-- 사이드바: 로그인 페이지가 아닐 때만 보이게 -->
      <gw-sidebar
        v-if="!isLoginPage && isSidebarOpen"
        :current-path="$route.path"
        :is-logged-in="isLoggedIn"
        :user-name="userName"
        @close="closeSidebar"
        @logout="logout"
      />

      <!-- 오른쪽 메인 영역 -->
      <main class="gw-main">
        <!-- 사이드바가 닫혀 있을 때만 보이는 열기 아이콘 -->
        <button
          v-if="!isLoginPage && !isSidebarOpen"
          class="sidebar-open-in-main"
          @click="openSidebar"
          title="사이드바 열기"
        >
          🎈
        </button>

        <!-- 실제 페이지 화면 -->
        <router-view />
      </main>
    </div>
    <div
  style="
    position: fixed;
    bottom: 8px;
    right: 8px;
    font-size: 11px;
    background: rgba(0,0,0,0.7);
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    z-index: 9999;
  "
>
  path: {{ $route.path }}<br>
  isLoginPage: {{ isLoginPage }}<br>
  isLoggedIn: {{ isLoggedIn }}<br>
  isSidebarOpen: {{ isSidebarOpen }}
</div>
    <!-- 하단 푸터 컴포넌트 -->
    <gw-footer />
  </div>
</template>

<script>
import GwHeader from '@/components/layout/GwHeader.vue'
import GwSidebar from '@/components/layout/GwSidebar.vue'
import GwFooter from '@/components/layout/GwFooter.vue'

export default {
  name: 'App',
  components: {
    GwHeader,
    GwSidebar,
    GwFooter,
  },
  data () {
    return {
      isSidebarOpen: true,
    }
  },
  computed: {
    // 🔍 현재 라우트가 로그인 페이지인지 확인
    isLoginPage () {
      return this.$route.name === 'Login' || this.$route.path === '/login'
    },
    isLoggedIn () {
      return this.$store.getters['auth/isLoggedIn']
    },
    userName () {
      return this.$store.getters['auth/userName']
    }
  },
  watch: {
    // 🔥 라우트가 login으로 바뀔 때 사이드바 닫기
    $route (to) {
      if (to.name === 'Login') {
        this.isSidebarOpen = false
      }
    },
    isLoggedIn (newVal) {
      // console.log('[watch:isLoggedIn]', newVal)
    // 로그인으로 바뀐 순간 + 현재 페이지가 로그인 페이지가 아니면
    if (newVal) {
      this.isSidebarOpen = true
    }
  },
  },
  methods: {
    
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen
    },
    closeSidebar () {
      this.isSidebarOpen = false
    },
    openSidebar () {
      this.isSidebarOpen = true
    },
    // 🔥 로그아웃 메서드
    async logout () {
      await this.$store.dispatch('auth/logout')
      this.isSidebarOpen = false
      this.$router.push('/login')
    },
  },
}
</script>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.content-layout {
  display: flex;
  flex: 1;
  min-height: 0;
}

/* 오른쪽 메인 영역 */
.gw-main {
  flex: 1;
  padding: 24px;
  box-sizing: border-box;
  border-right: 1px solid black;
}

/* 사이드바 열기 아이콘 버튼 */
.sidebar-open-in-main {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  margin-bottom: 12px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
}
.sidebar-open-in-main:hover {
  background: #f0f0f0;
}
</style>
