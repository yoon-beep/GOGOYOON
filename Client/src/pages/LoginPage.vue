<template>
  <div class="login-page">
    <h2 class="page-title">로그인</h2>

    <form @submit.prevent="onSubmit" class="login-form">
      <div class="form-row">
        <label>이메일</label>
        <input
          v-model="form.email"
          type="email"
          required
          placeholder="이메일을 입력하세요"
        />
      </div>

      <div class="form-row">
        <label>비밀번호</label>
        <input
          v-model="form.password"
          type="password"
          required
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <div class="form-actions">
        <button type="submit" :disabled="loading">
          {{ loading ? '로그인 중...' : '로그인' }}
        </button>
      </div>

      <p v-if="errorMessage" class="error-text">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script>
import apiClient from '@/api/apiClient'

export default {
  name: 'LoginPage',
  data () {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
      errorMessage: '',
    }
  },
  methods: {
    async onSubmit () {
      this.errorMessage = ''
      this.loading = true

      try {
        const res = await apiClient.post('/auth/login', {
          email: this.form.email,
          password: this.form.password,
        })

        if (res.data && res.data.ok) {
          const user = res.data.data   // { id, email, name }

          // ✅ Vuex auth 모듈에 로그인 성공 알리기
          await this.$store.dispatch('auth/loginSuccess', user)

          // redirect 쿼리가 있으면 그쪽으로, 없으면 기본 페이지로
          const redirectPath = this.$route.query.redirect || '/notice'
          this.$router.push(redirectPath)
        } else {
          this.errorMessage = res.data.message || '로그인에 실패했습니다.'
        }
      } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        this.errorMessage = err.response.data.message
      } else {
        this.errorMessage = '서버와 통신 중 오류가 발생했습니다.'
      }
    } finally {
      this.loading = false
    }
    },
  },
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 40px auto;
}

.page-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

.login-form {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: #fafafa;
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

.form-row input {
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.form-actions {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.form-actions button {
  min-width: 120px;
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid #007bff;
  background: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.form-actions button:disabled {
  opacity: 0.7;
  cursor: default;
}

.form-actions button:hover:not(:disabled) {
  opacity: 0.9;
}

.error-text {
  margin-top: 8px;
  color: #d9534f;
  font-size: 13px;
  text-align: center;
}
</style>
