<template>
  <aside class="sidebar">
    <!-- 🔹 프로필 영역 -->
    <div class="profile-card">
      <div class="profile-avatar">
        <!-- 1) 간단 버전: 이니셜 / 이모지 -->
        <span v-if="!profileImageUrl">{{ userInitial }}</span>

        <!-- 2) 나중에 진짜 이미지 쓰고 싶으면 아래 img에 src 넣으면 됨 -->
        <img
          v-else
          :src="profileImageUrl"
          alt="프로필"
        >
      </div>

      <div class="profile-info">
        <p class="profile-label">내 프로필</p>

        <template v-if="isLoggedIn">
          <p class="profile-name">{{ userName }}님</p>
          <p class="profile-status">상태: 온라인</p>

          <button class="profile-logout-btn" @click="$emit('logout')">
            로그아웃
          </button>
        </template>

        <template v-else>
          <p class="profile-name">로그인하지 않음</p>
          <router-link to="/login" class="profile-login-link">
            로그인 하러가기
          </router-link>
        </template>
      </div>
    </div>

    <!-- 🔹 현재 경로 -->
    <p class="current-path">현재 경로: {{ currentPath }}</p>

    <!-- 🔹 메뉴 영역 -->
    <nav class="nav">
      <p class="nav-label">메뉴</p>
      <router-link to="/">메인</router-link>
      <router-link to="/notice">공지사항</router-link>
      <router-link to="/mail">메일</router-link>
    </nav>

    <!-- 🔹 아래 여백 + 닫기 버튼 -->
    <button class="sidebar-close" @click="$emit('close')">
      사이드바 닫기
    </button>
  </aside>
</template>

<script>
export default {
  name: 'GwSidebar',
  props: {
    currentPath: {
      type: String,
      default: '/',
    },
    isLoggedIn: {
      type: Boolean,
      default: false,
    },
    userName: {
      type: String,
      default: '손님',
    },
  },
  computed: {
    // 이름 첫 글자 따서 이니셜로 쓰기 (로그인 안했으면 😊)
    userInitial () {
      if (!this.isLoggedIn || !this.userName) return '😊'
      return this.userName.charAt(0)
    },
    // 나중에 진짜 프로필 이미지 쓰고 싶으면 여기서 관리
    profileImageUrl () {
      // 예시1) 아직 이미지 없음 → null (이니셜 사용)
      return null

      // 예시2) 고정 이미지 쓰고 싶으면:
      // return require('@/assets/profile-default.png')
    },
  },
}
</script>

<style scoped>
/* 🔹 사이드바 전체 */
.sidebar {
  /* 반응형 너비: 화면의 20% 정도, 최소/최대 폭 제한 */
  width: 20vw;
  min-width: 180px;
  max-width: 260px;

  padding: 16px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 16px;

  /* 🔹 배경 색 + 그라데이션 예시 */
  background: linear-gradient(180deg, #f0f4ff, #ffffff);
  border-right: 1px solid #d0d7e2;

  /* 전체 레이아웃에서 높이 쭉 차지할 수 있게 */
  /* (부모가 flex:1; 로 되어 있으니 자연스럽게 늘어남) */
}

/* 🔹 나중에 배경 이미지 쓰고 싶으면 이렇게 교체
.sidebar {
  background-image: url('https://via.placeholder.com/300x600'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
*/

/* 반응형: 화면이 많이 좁아졌을 때 사이드바도 살짝 줄이기 */
@media (max-width: 768px) {
  .sidebar {
    width: 40vw;
    min-width: 160px;
    padding: 12px;
  }
}

/* 🔹 프로필 카드 영역 */
.profile-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}

/* 프로필 아바타 동그라미 */
.profile-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #d0e2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #2f3b5c;
  flex-shrink: 0;
  overflow: hidden;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 프로필 텍스트 영역 */
.profile-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.profile-label {
  margin: 0 0 2px;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: #8a8fa3;
}

.profile-name {
  margin: 0 0 2px;
  font-size: 14px;
  font-weight: 600;
  color: #2f3b5c;
}

.profile-status {
  margin: 0 0 6px;
  font-size: 12px;
  color: #68b56b; /* 온라인 느낌 초록색 */
}

.profile-logout-btn {
  align-self: flex-start;
  padding: 3px 8px;
  font-size: 11px;
  border-radius: 999px;
  border: 1px solid #d0d7e2;
  background: #ffffff;
  cursor: pointer;
}

.profile-logout-btn:hover {
  background: #f0f4ff;
}

.profile-login-link {
  font-size: 12px;
  color: #007bff;
  text-decoration: none;
}

.profile-login-link:hover {
  text-decoration: underline;
}

/* 🔹 현재 경로 */
.current-path {
  margin: 0;
  font-size: 11px;
  color: #7a8298;
}

/* 🔹 메뉴 영역 */
.nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-top: 8px;
  border-top: 1px solid #dde2ec;
}

.nav-label {
  margin: 0 0 4px;
  font-size: 11px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #9aa0b5;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 4px;
}

.nav a:hover {
  background: rgba(0,0,0,0.03);
}

.nav a.router-link-exact-active {
  font-weight: 600;
  color: #007bff;
  background: rgba(0, 123, 255, 0.08);
}

/* 🔹 닫기 버튼은 맨 아래로 */
.sidebar-close {
  margin-top: auto;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  cursor: pointer;
}

.sidebar-close:hover {
  background: #f5f5f5;
}
</style>
