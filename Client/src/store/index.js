// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
  },
  // strict: process.env.NODE_ENV !== 'production' // 개발 때 실수 잡기 좋음(선택)
})
