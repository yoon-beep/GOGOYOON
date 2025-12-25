// src/store/modules/auth.js

//현재 쓰지않아 주석처리
// import Vue from 'vue'

// 🔹 앱 시작할 때 sessionStorage에서 유저 정보 복구
let initialUser = null
const saved = sessionStorage.getItem('gogoyoonUser')
if (saved) {
  try {
    initialUser = JSON.parse(saved)
  } catch (e) {
    // console.error('세션 유저 파싱 실패', e)
  }
}

export default {
  namespaced: true,  // ✅ 모듈 이름 공간 사용 (auth/...)
  state: {
    user: initialUser,  // 로그인한 유저 정보 (없으면 null)
  },
  getters: {
    isLoggedIn (state) {
      return !!state.user
    },
    userName (state) {
      return (state.user && state.user.name) || '손님'
    },
    user (state) {
      return state.user
    },
  },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    CLEAR_USER (state) {
      state.user = null
    },
  },
  actions: {
    // 로그인 성공했을 때 호출
    loginSuccess ({ commit }, user) {
      sessionStorage.setItem('gogoyoonUser', JSON.stringify(user))
      commit('SET_USER', user)
    },
    // 로그아웃
    logout ({ commit }) {
      sessionStorage.removeItem('gogoyoonUser')
      commit('CLEAR_USER')
    },
  },
}
