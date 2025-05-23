<template>
  <div class="login-page">
    <h2>Sign in</h2>
    <button @click="loginWithMicrosoft">Login with Microsoft</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
import { login } from '../sso/azure'

export default {
  name: 'LoginPage',
  data() {
    return {
      error: null
    }
  },
  methods: {
    async loginWithMicrosoft() {
      try {
        await login()
      } catch (e) {
        this.error = e.message || 'Login failed'
      }
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
}
.error {
  color: red;
  margin-top: 1em;
}
</style>
