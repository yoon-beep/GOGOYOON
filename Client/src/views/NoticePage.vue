<template>
  <div class="notice-page">
    <h2 class="page-title">공지사항</h2>

    <!-- 상단 검색 + 글쓰기 -->
     <div class="notice-actions">
        <input
          v-model="searchText"
          type="text"
          placeholder="제목 검색"
          class="search-input"
        />
        <button class="write-button" @click="onClickWrite">
          글쓰기
        </button>
     </div>

     <!-- 공지 리스트 -->
    <table class="notice-table">
      <thead>
        <tr>
          <th style="width: 70px;">번호</th>
          <th>제목</th>
          <th style="width: 120px;">작성자</th>
          <th style="width: 130px;">등록일</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="notice in filteredNotices"
          :key="notice.id"
          @click="onClickRow(notice)"
        >
          <td>{{ notice.id }}</td>
          <td class="title-cell">
              <span v-if="notice.isImportant" class="badge-important">중요</span>
              {{  notice.title  }}
          </td>
          <td>{{ notice.writer }}</td>
          <td>{{ notice.createdAt }}</td>
        </tr>
    
   <!-- 데이터 없을ㄷ 때 -->
      <tr v-if="filteredNotices.length === 0">
        <td colspan="4" class="empty-row">
          공지사항이 없습니다
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'NoticePage',
  data() {
    return {
      searchText: '',
      // 지금은 더미 데이터. 나중에 API 연동으로 바꿀 예정
      notices: [
        {
          id: 3,
          title: '시스템 점검 안내 (11/30 새벽)',
          writer: '관리자',
          createdAt: '2025-11-29',
          isImportant: true,
        },
        {
          id: 2,
          title: '연말정산 서류 제출 안내',
          writer: '총무팀',
          createdAt: '2025-11-25',
          isImportant: true,
        },
        {
          id: 1,
          title: '11월 사내 식단표 안내',
          writer: '총무팀',
          createdAt: '2025-11-20',
          isImportant: false,
        },
      ],
    }
  },
  computed: {
    //검색어가 있을 경우 제목 기준으로 필터링
    filteredNotices() {
      if (!this.searchText) return this.notices

      const keyword = this.searchText.toLowerCase()
      return this.notices.filter(row =>
        row.title.toLowerCase().includes(keyword)
      )
    }
  },
  methods: {
    onClickWrite() {
      //T0D0: 나중에 글 쓰기 페이지 / 모달로 연결 예정
      alert('여기서 글쓰기 화면으로 이동하게 만들거야!')
    },
    onClickRow(notice) {
      // TODO: 다음 단계에서 /notice/:id 라우트 만들어서 이동
      // this.$router.push(`/notice/${notice.id}`)
      alert(`상세보기로 이동할 자리: [${notice.id}] ${notice.title}`)
    }
  }
} 
</script>

<style scoped>
.notice-page {
  max-width: 900px;
  margin: 0 auto;
}

.page-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
}

.notice-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.search-input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.write-button {
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid #007bff;
  background: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.write-button:hover {
  opacity: 0.9;
}

.notice-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.notice-table th,
.notice-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.notice-table thead {
  background: #f5f5f5;
}

.notice-table tbody tr:hover {
  background: #f9fafb;
  cursor: pointer;
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge-important {
  display: inline-block;
  padding: 2px 6px;
  font-size: 11px;
  border-radius: 4px;
  background: #ff9800;
  color: #fff;
}

.empty-row {
  text-align: center;
  color: #888;
}
</style>