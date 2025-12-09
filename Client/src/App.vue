<template>
  <div id="app">
    <header class="gw-header">
      <hi class="logo">GOGOYOON 그룹웨어</hi>

      <nav class="top-nav">
        <router-link to="/">메인</router-link>
        <router-link to="/notice">공지사항</router-link>
        <router-link to="/mail">메일</router-link>
        <router-link to="/approval">결재</router-link>
        <router-link to="/org">조직도</router-link>
        <router-link to="/company">회사정보</router-link>
      </nav>

      <main class="gw-main">
        <p>현재 경로: {{ $route.path }}</p>
        <router-view />
      </main>

    </header>

  </div>
</template>

<script>
export default {
  name: 'App',
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
