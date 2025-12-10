<template>
  <div class="notice-detail">
    <div v-if="notice">
      <!-- 제목 영역 -->
      <h2 class="detail-title">
        <span v-if="notice.isImportant" class="badge-important">중요</span>
        {{ notice.title }}
      </h2>

      <!-- 메타 정보 -->
      <div class="detail-meta">
        <span>작성자: {{ notice.writer }}</span>
        <span>등록일: {{ notice.createdAt }}</span>
      </div>

      <hr />

      <!-- 내용 -->
      <div class="detail-content">
        <p>{{ notice.content }}</p>
      </div>

      <!-- 버튼 영역 -->
      <div class="detail-actions">
        <button @click="goBack">목록으로</button>
        <button @click="editNotice">수정(예정)</button>
      </div>
    </div>

    <div v-else>
      <p>해당 공지사항을 찾을 수 없습니다.</p>
      <button @click="goBack">목록으로</button>
    </div>
  </div>
</template>

<script>
import { dummyNotices } from '@/mock/notices'

export default {
  name: 'NoticeDetail',
  data () {
    return {
      notice: null,
    }
  },
  created () {
    // URL에서 /notice/:id 중 id 값 가져오기
    const id = Number(this.$route.params.id)

    // 더미 데이터에서 해당 id 찾기
    this.notice = dummyNotices.find(row => row.id === id) || null
  },
  methods: {
    goBack () {
      this.$router.push('/notice')
    },
    editNotice () {
      alert('나중에 수정 페이지로 이동하게 만들 거야!')
    },
  },
}
</script>

<style scoped>
.notice-detail {
  max-width: 900px;
  margin: 0 auto;
  font-size: 14px;
  border: 1px solid blueviolet;
  padding: 10px;
}

.detail-title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 600;
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

.detail-meta {
  display: flex;
  gap: 12px;
  font-size: 12px;
  color: #666;
  margin-bottom: 12px;
}

.detail-content {
  min-height: 120px;
  white-space: pre-line; /* 나중에 줄바꿈 처리용 */
  margin-bottom: 16px;
}

.detail-actions {
  display: flex;
  gap: 8px;
}
</style>
