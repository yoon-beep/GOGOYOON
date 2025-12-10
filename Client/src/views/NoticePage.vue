<template>
  <div class="notice-page">
    <h2 class="page-title">공지사항</h2>

    <!-- 로딩 / 에러 상태 표시 -->
    <p v-if="loading">불러오는 중...</p>
    <p v-else-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

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
  </div>
</template>

<script>
// import axios from 'axios';
import { dummyNotices } from '@/mock/notices';

export default {
  name: 'NoticePage',
  data () {
    return {
        searchText: '',
        notices: dummyNotices
      }
  },
  computed: {
    filteredNotices () {
      if (!this.searchText) return this.notices

      const keyword = this.searchText.toLowerCase()
      return this.notices.filter(row =>
        row.title.toLowerCase().includes(keyword)
      )
    }
  },
  methods: {
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
    },
  },
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
</style>
