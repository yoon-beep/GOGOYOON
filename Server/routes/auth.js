// server/routes/auth.js
const express = require('express')
const router = express.Router()
const db = require('../db')

// 📌 POST /api/auth/login
// 이메일 + 비밀번호로 로그인
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // 1) 기본 체크
    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: '이메일과 비밀번호를 입력해주세요.',
      })
    }

    // 2) 해당 이메일 유저 찾기
    const [rows] = await db.query(
      'SELECT id, email, password, name FROM users WHERE email = ?',
      [email]
    )

    if (!rows.length) {
      return res.status(401).json({
        ok: false,
        message: '이메일이 올바르지 않습니다.',
      })
    }

    const user = rows[0]

    // 3) 비밀번호 확인 (지금은 평문 비교)
    if (user.password !== password) {
      return res.status(401).json({
        ok: false,
        message: '비밀번호가 올바르지 않습니다.',
      })
    }

    // 4) 비밀번호는 응답에서 제거
    delete user.password

    // 5) 클라이언트에 유저 정보 전달
    res.json({
      ok: true,
      message: '로그인 성공',
      data: user,  // { id, email, name }
    })
  } catch (err) {
    console.error('POST /api/auth/login error:', err)
    res.status(500).json({
      ok: false,
      message: '로그인 처리 중 오류가 발생했습니다.',
    })
  }
})

module.exports = router
