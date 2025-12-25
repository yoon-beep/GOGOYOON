<template>
  <div class="notice-write">
    <h2 class="page-title">공지사항 수정</h2>

    <div v-if="loading">
      불러오는 중입니다...
    </div>

    <div v-else>
      <form @submit.prevent="onSubmit">
        <!-- 제목 -->
        <div class="form-row">
          <label>제목</label>
          <input
            v-model="form.title"
            type="text"
            required
            placeholder="제목을 입력하세요"
          />
        </div>

        <!-- 작성자 -->
        <div class="form-row">
          <label>작성자</label>
          <input
            v-model="form.writer"
            type="text"
            placeholder="작성자 (기본: 관리자)"
          />
        </div>

        <!-- 중요 공지 체크 -->
        <div class="form-row form-row-inline">
          <label>
            <input
              type="checkbox"
              v-model="form.isImportant"
            />
            중요 공지로 표시
          </label>
        </div>

        <!-- 내용 -->
        <div class="form-row">
          <label>내용</label>
          <textarea
            v-model="form.content"
            rows="8"
            required
            placeholder="공지 내용을 입력하세요"
          ></textarea>
        </div>

        <!-- 버튼 영역 -->
        <div class="form-actions">
          <button type="submit">수정 완료</button>
          <button type="button" @click="goBack">취소</button>
        </div>
      </form>

      <p v-if="errorMessage" class="error-text">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script>
import apiClient from '@/api/apiClient'

export default {
  name: 'NoticeEdit',
  data () {
    return {
      form: {
        title: '',
        writer: '',
        isImportant: false,
        content: '',
      },
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

        // 기존 공지 상세 조회
        const res = await apiClient.get(`/notices/${id}`)

        if (res.data && res.data.ok) {
          const notice = res.data.data
          // 기존 데이터로 form 세팅
          this.form.title = notice.title
          this.form.writer = notice.writer
          this.form.isImportant = !!notice.isImportant
          this.form.content = notice.content
        } else {
          this.errorMessage = res.data.message || '공지사항을 불러오지 못했습니다.'
        }
      } catch (err) {
        console.error(err)
        this.errorMessage = '공지사항 조회 중 오류가 발생했습니다.'
      } finally {
        this.loading = false
      }
    },

    async onSubmit () {
      const id = this.$route.params.id

      if (!this.form.title || !this.form.content) {
        alert('제목과 내용을 입력해주세요.')
        return
      }

      try {
        this.loading = true
        this.errorMessage = ''

        const payload = {
          title: this.form.title,
          content: this.form.content,
          writer: this.form.writer,
          isImportant: this.form.isImportant,
        }

        // 📌 PUT /api/notices/:id
        const res = await apiClient.put(`/notices/${id}`, payload)

        if (res.data && res.data.ok) {
          alert('공지사항이 수정되었습니다!')
          // 수정 후 상세 페이지로 이동
          this.$router.push({ name: 'NoticeDetail', params: { id } })
        } else {
          this.errorMessage = res.data.message || '수정에 실패했습니다.'
        }
      } catch (err) {
        console.error(err)
        this.errorMessage = '공지사항 수정 중 오류가 발생했습니다.'
      } finally {
        this.loading = false
      }
    },

    goBack () {
      const id = this.$route.params.id
      this.$router.push({ name: 'NoticeDetail', params: { id } })
    },
  },
}
</script>

<style scoped>
/* NoticeWrite.vue 스타일 그대로 복붙해도 됨 */
.notice-write {
  max-width: 700px;
  margin: 0 auto;
}

.page-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
}

.form-row {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
}

.form-row > label {
  font-size: 14px;
  margin-bottom: 4px;
}

.form-row input,
.form-row textarea {
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.form-row-inline {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.form-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.form-actions button {
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid #007bff;
  background: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.form-actions button:nth-child(2) {
  border-color: #ccc;
  background: #fff;
  color: #333;
}

.form-actions button:hover {
  opacity: 0.9;
}

.error-text {
  margin-top: 8px;
  color: #d9534f;
  font-size: 13px;
}
</style>
