// src/api/apiClient.js
// axios 기본 설정 파일

import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // 우리 Express 서버의 기본 URL
  timeout: 5000,                        // (선택) 5초 넘으면 에러
})

// (선택) 요청/응답 인터셉터도 나중에 여기서 추가 가능

export default apiClient
