import Vue from 'vue'
import App from './App.vue'
// router/index.js 가져오기
import router from './router'
// store/index.js 가져오기
import store from './store'

//개발모드 브라우저 콘솔에 뜨는 "팁메세지" 숨기는 설정 
Vue.config.productionTip = false

new Vue({
  // 여기서 등록
  router,
  store,
  render: h => h(App),
}).$mount('#app')
