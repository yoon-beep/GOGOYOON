<template>
  <div id="app">
    <header>
      <h1>GOGOYOON 그룹웨어</h1>

      <!-- 메뉴 -->
      <nav>
        <router-link to="/">메인</router-link>
        <router-link to="/notice">공지사항</router-link>
        <router-link to="/mail">메일</router-link>
      </nav>
    </header>

    <!-- 🔥 이 부분이 라우터가 실제 화면을 바꾸는 자리 -->
      <main class="gw-main">
        <p>현재 경로: {{ $route.path }}</p>
        <router-view />
      </main>

 </div>   
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      serverMessage: '확인 중...', // 처음 기본 문구
    }
  },
  created () {
    // 컴포넌트가 생성될 때 한 번 서버에 요청 보내기
    axios
      .get('http://localhost:3000/api/health')
      .then((res) => {
        // 성공하면 서버가 준 메시지를 화면에 표시
        this.serverMessage = res.data.message
      })
      .catch((err) => {
        console.error(err)
        this.serverMessage = '서버 연결 실패 😢'
      })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 30px;
}
</style>
