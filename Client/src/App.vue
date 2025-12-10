<template>
  <div id="app" class="app-layout">
    <!-- 상단 헤더 컴포넌트 -->
    <gw-header />

    <!-- 가운데: 사이드바 + 메인 -->
    <div class="content-layout">
      <!-- 사이드바: 열려 있을 때만 렌더링 -->
      <gw-sidebar
        v-if="isSidebarOpen"
        :current-path="$route.path"
        :is-logged-in="isLoggedIn"
        :user-name="userName"
        @close="closeSidebar"
      />

      <!-- 오른쪽 메인 영역 -->
      <main class="gw-main">
        <!-- 사이드바가 닫혀 있을 때만 보이는 열기 아이콘 -->
        <button
          v-if="!isSidebarOpen"
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
      isLoggedIn: false,   // 나중에 로그인 기능 붙일 때 true로 바꾸면 됨
      userName: '홍길동',  // 나중에 로그인한 유저 이름으로 교체
    }
  },
  methods: {
    closeSidebar () {
      this.isSidebarOpen = false
    },
    openSidebar () {
      this.isSidebarOpen = true
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
