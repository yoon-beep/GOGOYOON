// MySQL 연결 설정 (커넥션 풀 방식)

// mysql2패키지, promise 버전 사용
const mysql = require('mysql2/promise')

// mysql.createPool => DB에 접속할 연결 Pool을 만듬
// 매번 접속/끊기 반복 안하고, 미리 여러 개 만들어 놓고 재사용하는 개념
const pool = mysql.createPool({
  host: 'localhost',      // DB 서버 주소 (보통 로컬은 localhost)
  user: 'root',           // MySQL 유저명
  password: 'whddbs123', // MySQL 비밀번호
  database: 'gogoyoon',   // 아까 만든 DB 이름
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

module.exports = pool
