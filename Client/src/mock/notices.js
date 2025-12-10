// src/mock/notices.js

export const dummyNotices = [
  {
    id: 3,
    title: '시스템 점검 안내 (11/30 새벽)',
    content: '11/30 새벽 2시~4시 시스템 점검이 있습니다. 점검 시간에는 접속이 제한될 수 있습니다.',
    writer: '관리자',
    createdAt: '2025-11-29',
    isImportant: true,
  },
  {
    id: 2,
    title: '연말정산 서류 제출 안내',
    content: '연말정산 서류를 12/10까지 총무팀 메일로 제출해주세요.',
    writer: '총무팀',
    createdAt: '2025-11-25',
    isImportant: true,
  },
  {
    id: 1,
    title: '11월 사내 식단표 안내',
    content: '11월 구내식당 식단표를 안내드립니다. 자세한 내용은 첨부 파일을 참고해주세요.',
    writer: '총무팀',
    createdAt: '2025-11-20',
    isImportant: false,
  },
]
