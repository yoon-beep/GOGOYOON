// server/index.js

const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

// 공통 미들웨어
app.use(express.json())
app.use(cors())

// 🔹 헬스 체크용 API
app.get('/api/health', (req, res) => {
  res.json({ ok: true, message: 'GOGOYOON API 서버 살아있음!' })
})

// 🔹 임시 공지사항 데이터 (나중에 DB로 교체 예정)
const notices = [
  {
    id: 3,
    title: '시스템 점검 안내 (11/30 새벽)',
    writer: '관리자',
    createdAt: '2025-11-29',
    isImportant: true,
    content: '11/30 새벽 02:00 ~ 04:00 시스템 점검이 예정되어 있습니다.',
  },
  {
    id: 2,
    title: '연말정산 서류 제출 안내',
    writer: '총무팀',
    createdAt: '2025-11-25',
    isImportant: true,
    content: '연말정산 관련 서류를 12/10까지 총무팀으로 제출해주세요.',
  },
  {
    id: 1,
    title: '11월 사내 식단표 안내',
    writer: '총무팀',
    createdAt: '2025-11-20',
    isImportant: false,
    content: '11월 한 달간의 사내 식단표를 안내드립니다.',
  },
]

// 🔹 공지사항 목록 조회 API
app.get('/api/notices', (req, res) => {
  res.json({
    ok: true,
    data: notices,
  })
})

// 🔹 공지사항 상세 조회 API
app.get('/api/notices/:id', (req, res) => {
  const id = Number(req.params.id)
  const notice = notices.find((row) => row.id === id)

  if (!notice) {
    return res
      .status(404)
      .json({ ok: false, message: '공지사항을 찾을 수 없습니다.' })
  }

  res.json({
    ok: true,
    data: notice,
  })
})

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 GOGOYOON 서버가 http://localhost:${PORT} 에서 실행 중`)
})
