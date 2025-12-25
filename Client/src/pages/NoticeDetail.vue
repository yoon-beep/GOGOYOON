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
        <button @click="editNotice">수정</button>
        <button @click="deleteNotice">삭제</button>
      </div>
    </div>

    <div v-else>
      <p>해당 공지사항을 찾을 수 없습니다.</p>
      <button @click="goBack">목록으로</button>
    </div>
  </div>
</template>

<script>
import apiClient from '@/api/apiClient'

export default {
  name: 'NoticeDetail',
  data () {
    return {
      notice: null,
      loading: false,
      errorMessage: '',
    }
  },
  created () {
    this.fetchNotice()
  },
  methods: {
    async fetchNotice () {
      const id = this.$route.params.id

      try {
        this.loading = true
        this.errorMessage = ''

        // GET http://localhost:3000/api/notices/:id
        const res = await apiClient.get(`/notices/${id}`)

        if (res.data && res.data.ok) {
          this.notice = res.data.data
        } else {
          this.errorMessage = res.data.message || '공지사항을 찾을 수 없습니다.'
        }
      } catch (err) {
        // console.error(err)
        this.errorMessage = '공지사항 조회 중 오류가 발생했습니다.'
      } finally {
        this.loading = false
      }
    },
    editNotice () {
      const id = this.$route.params.id || (this.notice && this.notice.id)
      this.$router.push({
        name: 'NoticeEdit',
        params: { id },
      })
    },
    async deleteNotice () {
      const id = this.$route.params.id || (this.notice && this.notice.id)

      // 1) 한번 더 사용자에게 확인
      const ok = window.confirm('정말 이 공지사항을 삭제할까요?')
      if (!ok) return

      try {
        this.loading = true
        this.errorMessage = ''

        // 2) DELETE /api/notices/:id 요청
        const res = await apiClient.delete(`/notices/${id}`)

        if (res.data && res.data.ok) {
          alert('공지사항이 삭제되었습니다.')
          // 3) 삭제 후 목록으로 이동
          this.$router.push('/notice')
        } else {
          this.errorMessage = res.data.message || '삭제에 실패했습니다.'
        }
      } catch (err) {
        // console.error(err)
        this.errorMessage = '공지사항 삭제 중 오류가 발생했습니다.'
      } finally {
        this.loading = false
      }
    },
    goBack () {
      this.$router.push('/notice')
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
