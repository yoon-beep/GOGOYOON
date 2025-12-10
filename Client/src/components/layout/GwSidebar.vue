<template>
  <aside class="sidebar">
    <!-- 상단: 유저 정보 + 현재 경로 + X 버튼 -->
    <div class="sidebar-top">
      <div class="user-block">
        <div class="user-name">
          {{ isLoggedIn ? userName + '님' : '홍길동님(예정)' }}
        </div>
        <div class="user-sub">
          {{ isLoggedIn ? '정상 로그인 상태' : '로그인 기능 예정' }}
        </div>
      </div>

      <p class="current-path">현재 경로: {{ currentPath }}</p>

      <!-- 사이드바 닫기(X) -->
      <button class="sidebar-close" @click="$emit('close')">
        🎈
      </button>
    </div>

    <!-- 메뉴 -->
    <nav class="nav">
      <router-link to="/">메인</router-link>
      <router-link to="/notice">공지사항</router-link>
      <router-link to="/mail">메일</router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'GwSidebar',
  props: {
    currentPath: {
      type: String,
      required: true,
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: '홍길동',
    },
  },
}
</script>

<style scoped>
.sidebar {
  width: 240px;
  padding: 16px;
  background: #f5f5f5;
  border-right: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
}

/* 상단 블록 */
.sidebar-top {
  position: relative;
  padding-right: 24px; /* X 버튼 자리 */
  margin-bottom: 16px;
}

/* 유저 정보 */
.user-block {
  margin-bottom: 8px;
}

.user-name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 2px;
}

.user-sub {
  font-size: 12px;
  color: #777;
}

/* 현재 경로 */
.current-path {
  margin: 0;
  font-size: 12px;
  color: #666;
}

/* X 버튼 */
.sidebar-close {
  position: absolute;
  top: 0;
  right: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 20px;
  line-height: 16px;
  text-align: center;
  cursor: pointer;
  padding: 0;
}
/* 메뉴 */
.nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
}

.nav a.router-link-exact-active {
  font-weight: 600;
  color: #007bff;
}
</style>
