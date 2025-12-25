<template>
  <header class="gw-header">
    <!-- 왼쪽: 사이드바 토글 + 로고 + 타이틀 -->
    <div class="header-left">

      <!-- 로고 동그라미 -->
      <div class="logo-circle" @click="$router.push('/notice')">
        <span>G</span>
      </div>

      <!-- 서비스 이름 -->
      <div class="logo-text">
        <p class="logo-title">GOGOYOON 그룹웨어</p>
        <p class="logo-subtitle">사내 업무 포털</p>
      </div>
    </div>

    <!-- 오른쪽은 지금은 비워둠 (나중에 알림/검색 등 넣어도 됨) -->
    <div class="header-right">
      <!-- 지금은 디자인 상 빈 영역 -->
    </div>
  </header>
</template>

<script>
export default {
  name: 'GwHeader',
  // 지금은 로그인 정보 안 쓰니까 props 없어도 됨
}
</script>

<style scoped>
.gw-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  height:70px;
  box-sizing: border-box;

  /* 90deg = 왼→오른, 270deg = 오른→왼 */
background: linear-gradient(
  270deg,
  #608029 0%,
  #3558a3 40%,
  #cfd7f2 100%
);
  color: #fff;

  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.12);
}

/* 왼쪽 영역 */
.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 로고 동그라미 */
.logo-circle {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2f3b5c;
  font-weight: 800;
  font-size: 18px;
  cursor: pointer;
}

.logo-circle span {
  transform: translateY(-1px);
}

/* 텍스트 로고 */
.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.logo-subtitle {
  margin: 0;
  font-size: 11px;
  opacity: 0.9;
}

/* 오른쪽 영역: 나중에 쓸 수 있도록 자리만 */
.header-right {
  min-width: 40px;
}
</style>
