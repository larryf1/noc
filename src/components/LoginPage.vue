<template>
  <div class="login-page">
    <h2>Sign in</h2>
    <button @click="loginWithMicrosoft">Login with Microsoft</button>
    <div v-if="showMockPrompt" class="mock-prompt">
      <div>
        <label>
          Username:
          <input v-model="mockUsername" type="text" placeholder="Enter username" />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input v-model="mockPassword" type="password" placeholder="Enter password" />
        </label>
      </div>
      <button @click="mockLogin">Submit</button>
      <button @click="cancelMockPrompt" class="cancel-btn">Cancel</button>
    </div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { login } from '../sso/azure'

export default {
  name: 'LoginPage',
  data() {
    return {
      error: null,
      showMockPrompt: false,
      mockUsername: '',
      mockPassword: ''
    }
  },
  methods: {
    async loginWithMicrosoft() {
      if (window.location.hostname === 'localhost') {
        this.showMockPrompt = true
        return
      }
      try {
        await login()
      } catch (e) {
        this.error = e.message || 'Login failed'
      }
    },
    mockLogin() {
      if (!this.mockUsername || !this.mockPassword) {
        this.error = 'Please enter both username and password.'
        return
      }
      // Store mock user info for local SSO
      localStorage.setItem('mock_sso', '1')
      localStorage.setItem('mock_sso_username', this.mockUsername)
      this.showMockPrompt = false
      this.error = null
      this.$emit('mock-login-success')
    },
    cancelMockPrompt() {
      this.showMockPrompt = false
      this.mockUsername = ''
      this.mockPassword = ''
      this.error = null
    }
  }
}
</script>

<style scoped>
.login-page {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background: linear-gradient(90deg, #ff0066 0%, #a259ff 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  box-shadow: 0 2px 8px #a259ff33;
  transition: background 0.2s, color 0.2s;
}
button:hover {
  background: linear-gradient(90deg, #a259ff 0%, #ff0066 100%);
  color: #fff;
}
.mock-prompt {
  margin-top: 20px;
  background: linear-gradient(135deg, #a259ff 0%, #00dbff 100%);
  border: 1px solid #ff0066;
  padding: 16px 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
  box-shadow: 0 4px 16px #a259ff33;
}
.mock-prompt input {
  margin-left: 8px;
  border-radius: 4px;
  border: 1px solid #a259ff;
  padding: 4px 8px;
  background: #fff;
  color: #333;
}
.cancel-btn {
  margin-left: 10px;
  background: #eee;
  color: #a259ff;
  border: 1px solid #bbb;
}
.error {
  color: #ff0066;
  margin-top: 1em;
  font-weight: bold;
}
</style>
