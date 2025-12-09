import Vue from 'vue'
import App from './App.vue'
// router/index.js 가져오기
import router from './router'

Vue.config.productionTip = false

new Vue({
  // 여기서 등록
  router,
  render: h => h(App),
}).$mount('#app')
