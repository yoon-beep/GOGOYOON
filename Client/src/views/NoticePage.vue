<template>
  <div class="notice-page">
    <h2 class="page-title">공지사항</h2>

    <!-- 로딩 / 에러 상태 표시 -->
    <div v-if="loading">불러오는 중...</div>
    <div v-else-if="errorMessage" style="color: red;">
      {{ errorMessage }}
    </div>

    <!-- 상단 검색 + 글쓰기 -->
    <div class="notice-actions">
      <input
        v-model="searchText"
        type="text"
        placeholder="제목 검색"
        class="search-input"
      />
      <button 
        v-if="isLoggedIn"
        class="write-button" 
        @click="onClickWrite"
      >
        글쓰기
      </button>
    </div>

    <!-- 공지 리스트 -->
    <table class="notice-table">
      <!-- ✅ 여기가 추가된 부분 -->
      <colgroup>
        <col style="width: 50px;">   <!-- 번호 -->
        <col>                        <!-- 제목 (나머지 공간 꽉 차게) -->
        <col style="width: 100px;">  <!-- 작성자 -->
        <col style="width: 120px;">  <!-- 등록일 -->
      </colgroup>
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
            {{ notice.title }}
          </td>
          <td>{{ notice.writer }}</td>
          <td>{{ notice.createdAt }}</td>
        </tr>

        <!-- 데이터 없을 때 -->
        <tr v-if="!loading && !errorMessage && filteredNotices.length === 0">
          <td colspan="4" class="empty-row">
            공지사항이 없습니다
          </td>
        </tr>
      </tbody>
    </table>
    <!-- ✅ 페이지네이션 -->
      <div class="pagination">
        <button
          @click="changePage(page - 1)"
          :disabled="page === 1"
        >
          이전
        </button>

        <button
          v-for="p in lastPage"
          :key="p"
          @click="changePage(p)"
          :class="['page-btn', { active: p === page }]"
        >
          {{ p }}
        </button>

        <button
          @click="changePage(page + 1)"
          :disabled="page === lastPage"
        >
          다음
        </button>
      </div>
  </div>
</template>

<script>
// import axios from 'axios';
import apiClient from '@/api/apiClient'; // 새로 추가

export default {
  name: 'NoticePage',
  data () {
    return {
      searchText: '',
      loading: false,
      errorMessage: '',
      notices: [],    // 현재 페이지의 공지 목록
      // ✅ 페이지네이션용 상태
      page: 1,       // 현재 페이지
      limit: 10,     // 한 페이지에 몇 개
      total: 0,      // 전체 공지 개수 (서버에서 받아옴)
    }
  },
  created () {
    // 컴포넌트가 만들어질 때 목록을 한 번 불러온다
    this.fetchNotices(1)
  }, 
  computed: {
    filteredNotices () {
      if (!this.searchText) return this.notices

      const keyword = this.searchText.toLowerCase()
      return this.notices.filter(row =>
        row.title.toLowerCase().includes(keyword)
      )
    },
    isLoggedIn () {
      return !!sessionStorage.getItem('gogoyoonUser')
    },
    // ✅ 마지막 페이지 번호
    lastPage () {
      if (!this.total) return 1
      return Math.max(1, Math.ceil(this.total / this.limit))
    },
  },
  methods: {
    async fetchNotices (page = 1) {
      try {
        this.loading = true
        this.errorMessage = ''
        this.page = page

        // GET http://localhost:3000/api/notices
        const res = await apiClient.get('/notices',{
          params:{
            page: this.page,
            limit: this.limit
          }
        })

        if (res.data && res.data.ok) {
          this.notices = res.data.data
          this.total = res.data.total
        } else {
          this.errorMessage = res.data.message || '공지 목록을 가져오지 못했습니다.'
        }
      } catch (err) {
        console.error(err)
        this.errorMessage = '서버 통신 중 오류가 발생했습니다.'
      } finally {
        this.loading = false
      }
    },
    // ✅ 페이지 이동
    changePage (page) {
      if (page < 1 || page > this.lastPage) return
      this.fetchNotices(page)
    },
    onClickWrite () {
      // 글쓰기 페이지로 이동
      this.$router.push({ name: 'NoticeWrite' })
    },
    onClickRow (notice) {
      // 상세 페이지로 이동: /notice/:id
      this.$router.push({
        name: 'NoticeDetail',
        params: { id: notice.id },
      })
    }
  }
}
</script>

<style scoped>
/* (스타일은 기존이랑 동일) */
.notice-page {
  max-width: 900px;
  height: 700px;
  margin: 0 auto;
  border: 1px solid blue;
}

.page-title {
  margin: 0 0 0px 60px;
  font-size: 20px;
  font-weight: 600;
  /* border: 1px solid blue; */
}

.notice-actions {
  display: flex;
  gap: 8px;
  width: 90%;
  margin-bottom: 12px;
  margin: 0 auto 12px;
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
  width: 90%;
  margin: 0px auto;
  border-collapse: separate;
  font-size: 14px;
  border: 1px solid red;
  table-layout: fixed; 
}

.notice-table th,
.notice-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.notice-table thead {
  background: #f5f5f5;
}

/* .notice-table tbody {
  text-align: center;
} */

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
.pagination {
  margin-top: 12px;
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
}

.pagination button {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}
</style>
