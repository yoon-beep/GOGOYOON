// server/index.js

const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

// 공통 미들웨어
app.use(express.json())
app.use(cors())

// 공지 라우터 가져오기
const noticesRouter = require('./routes/notices')
const authRouter = require('./routes/auth')

// '/api/notices' 로 시작하는 요청은 모두 noticesRouter로 보냄
app.use('/api/notices', noticesRouter)
app.use('/api/auth', authRouter)

// 간단 상태 체크용
app.get('/', (req, res) => {
  res.send('GOGOYOON 서버 OK')
})

app.listen(PORT, () => {
  console.log(`🚀 GOGOYOON 서버가 http://localhost:${PORT} 에서 실행 중`)
})
