<template>
  <div class="notice-write">
    <h2 class="page-title">공지사항 작성</h2>

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
          placeholder="작성자 이름 (예: 관리자)"
        />
      </div>

      <!-- 중요 여부 -->
      <div class="form-row form-row-inline">
        <label>
          중요 공지로 설정
          <input
            v-model="form.isImportant"
            type="checkbox"
          />
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

      <!-- 버튼 -->
      <div class="form-actions">
        <button type="submit">작성 완료</button>
        <button type="button" @click="goBack">취소</button>
      </div>
    </form>
  </div>
</template>

<script>
import apiClient from '@/api/apiClient'  // ✅ axios 인스턴스

export default {
  name: 'NoticeWrite',
  data () {
    return {
      form: {
        title: '',
        writer: '관리자',
        isImportant: false,
        content: '',
      },
      loading: false,
      errorMessage: '',
    }
  },
  methods: {
    async onSubmit () {
      // 이 함수에서 이제 실제 서버로 전송할 거야
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

        // 📌 POST http://localhost:3000/api/notices
        const res = await apiClient.post('/notices', payload)

        if (res.data && res.data.ok) {
          alert('공지사항이 등록되었습니다!')
          // 성공하면 공지 목록으로 이동
          this.$router.push('/notice')
        } else {
          this.errorMessage = res.data.message || '등록에 실패했습니다.'
        }
      } catch (err) {
        // console.error(err)
        this.errorMessage = '서버 통신 중 오류가 발생했습니다.'
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
.notice-write {
  max-width: 900px;
  margin: 0 auto;
  font-size: 14px;
  border: 1px solid blueviolet;
  padding: 10px;
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

.form-row-inline {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

label {
  font-size: 13px;
  margin-bottom: 4px;
  color: #555;
}

input[type="text"],
textarea {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 6px 8px;
  font-size: 14px;
}

textarea {
  resize: vertical;
}

.form-actions {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}
</style>
