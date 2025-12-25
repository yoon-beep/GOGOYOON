// routes/notices.js

const express = require('express')
// 작은 expree API하나 만들게요 라고 이해하면됨
const router = express.Router()
const db = require('../db') // 방금 만든 db.js 가져오기

// 📌 GET /api/notices
// 공지 목록 전체 조회
router.get('/', async (req, res) => {
  try {
    // 1) page, limit 쿼리 파라미터 읽기 (없으면 기본값)
    const page = Number(req.query.page) || 1      // 현재 페이지 (기본 1)
    const limit = Number(req.query.limit) || 10   // 한 페이지에 몇 개 (기본 10)
    const offset = (page - 1) * limit             // DB에서 건너뛸 개수
    
    const [rows] = await db.query(
      `SELECT
         id,
         title,
         writer,
         is_important AS isImportant,
         DATE_FORMAT(created_at, '%Y-%m-%d') AS createdAt
       FROM notices
       ORDER BY is_important DESC, id DESC
       LIMIT ? OFFSET ?`,
       [limit, offset]
    )
     // 3) 전체 개수도 따로 구하기 (페이지 수 계산용)
    const [countRows] = await db.query(
      'SELECT COUNT(*) AS total FROM notices'
    )

    const total = countRows[0].total

    res.json({
      ok: true,
      data: rows,   // 지금 페이지에 보여줄 공지 목록
      total,        // 전체 공지 개수
      page,         // 현재 페이지
      limit,        // 한 페이지에 몇 개
    })
  } catch (err) {
    console.error('GET /api/notices error:', err)
    res.status(500).json({
      ok: false,
      message: '공지사항 목록 조회 중 오류가 발생했습니다.',
    })
  }
})

// 📌 GET /api/notices/:id
// 공지 상세 조회
router.get('/:id', async (req, res) => {
  const noticeId = req.params.id   // URL에서 :id 부분 가져오기

  try {
    const [rows] = await db.query(
      `SELECT
         id,
         title,
         content,
         writer,
         is_important AS isImportant,
         DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS createdAt
       FROM notices
       WHERE id = ?`,
      [noticeId] // ? 자리 바인딩 (SQL Injection 방지)
    )

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: '해당 공지사항을 찾을 수 없습니다.',
      })
    }

    res.json({
      ok: true,
      data: rows[0], // 하나만 있을 테니까 0번 인덱스
    })
  } catch (err) {
    console.error('GET /api/notices/:id error:', err)
    res.status(500).json({
      ok: false,
      message: '공지사항 조회 중 오류가 발생했습니다.',
    })
  }
})

// 📌 POST /api/notices
// 새 공지 등록
router.post('/', async (req, res) => {
  try {
    const { title, content, writer, isImportant } = req.body

    // 1) 간단한 유효성 검사 (필수값 체크)
    if (!title || !content) {
      return res.status(400).json({
        ok: false,
        message: '제목과 내용은 필수입니다.',
      })
    }

    // 작성자가 없으면 기본값 '관리자'
    const finalWriter = writer && writer.trim() ? writer : '관리자'
    const importantFlag = isImportant ? 1 : 0

    // 2) DB INSERT
    const [result] = await db.query(
      `INSERT INTO notices (title, content, writer, is_important)
       VALUES (?, ?, ?, ?)`,
      [title, content, finalWriter, importantFlag]
    )

    // result.insertId 에 새로 생성된 id가 들어있음
    const insertedId = result.insertId

    // 3) 방금 생성된 공지 다시 SELECT 해서 반환해 줄 수도 있음
    const [rows] = await db.query(
      `SELECT
         id,
         title,
         content,
         writer,
         is_important AS isImportant,
         DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS createdAt
       FROM notices
       WHERE id = ?`,
      [insertedId]
    )

    res.status(201).json({
      ok: true,
      message: '공지사항이 등록되었습니다.',
      data: rows[0],
    })
  } catch (err) {
    console.error('POST /api/notices error:', err)
    res.status(500).json({
      ok: false,
      message: '공지사항 등록 중 오류가 발생했습니다.',
    })
  }
})

router.put('/:id', async (req, res) => {
  const noticeId = req.params.id
  const { title, content, writer, isImportant } = req.body

  try {
    // 1) 필수값 검사
    if (!title || !content) {
      return res.status(400).json({
        ok: false,
        message: '제목과 내용은 필수입니다.',
      })
    }

    const finalWriter = writer && writer.trim() ? writer : '관리자'
    const importantFlag = isImportant ? 1 : 0

    // 2) UPDATE 실행
    const [result] = await db.query(
      `UPDATE notices
       SET
         title = ?,
         content = ?,
         writer = ?,
         is_important = ?
       WHERE id = ?`,
      [title, content, finalWriter, importantFlag, noticeId]
    )

    // 영향 받은 행이 0이면 → 해당 id 없음
    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: '해당 공지사항을 찾을 수 없습니다.',
      })
    }

    // 3) 수정된 내용 다시 SELECT 해서 보내주기
    const [rows] = await db.query(
      `SELECT
         id,
         title,
         content,
         writer,
         is_important AS isImportant,
         DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS createdAt
       FROM notices
       WHERE id = ?`,
      [noticeId]
    )

    res.json({
      ok: true,
      message: '공지사항이 수정되었습니다.',
      data: rows[0],
    })
  } catch (err) {
    console.error('PUT /api/notices/:id error:', err)
    res.status(500).json({
      ok: false,
      message: '공지사항 수정 중 오류가 발생했습니다.',
    })
  }
}),

router.delete('/:id', async (req, res) => {
  const noticeId = req.params.id

  try {
    // 1) 해당 id 삭제 시도
    const [result] = await db.query(
      'DELETE FROM notices WHERE id = ?',
      [noticeId]
    )

    // 2) 영향을 받은 행이 없으면 → 그런 공지가 없는 것
    if (result.affectedRows === 0) {
      return res.status(404).json({
        ok: false,
        message: '해당 공지사항을 찾을 수 없습니다.',
      })
    }

    // 3) 정상 삭제
    res.json({
      ok: true,
      message: '공지사항이 삭제되었습니다.',
    })
  } catch (err) {
    console.error('DELETE /api/notices/:id error:', err)
    res.status(500).json({
      ok: false,
      message: '공지사항 삭제 중 오류가 발생했습니다.',
    })
  }
})
module.exports = router