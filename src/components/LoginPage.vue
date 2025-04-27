<template>
  <div id="login-page">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <label for="username">Username: <span style="color: red;">*</span></label>
      <input type="text" id="username" v-model="username" placeholder="Enter username" required />

      <label for="partnerId">Partner ID: <span style="color: red;">*</span></label>
      <select id="partnerId" v-model="partnerId" required>
        <option value="" disabled selected>Select a partner ID</option>
        <option value="partner1">partner1</option>
        <option value="partner2">partner2</option>
        <option value="partner3">partner3</option>
        <option value="partner4">partner4</option>
      </select>

      <label for="role">Role: <span style="color: red;">*</span></label>
      <select id="role" v-model="role" required>
        <option value="support" selected>support</option>
        <option value="admin">admin</option>
        <option value="super admin">super admin</option>
        <option value="tester">tester</option>
      </select>

      <button type="submit">Login</button>
    </form>
    <p id="login-error" style="color: red;">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      partnerId: '',
      role: 'support',
      error: '',
    };
  },
  methods: {
    handleLogin() {
      if (!this.username || !this.partnerId || !this.role) {
        this.error = 'All fields are required.';
        return;
      }
      if (!/^[a-zA-Z0-9]{3,20}$/.test(this.username)) {
        this.error = 'Username must be alphanumeric and between 3-20 characters.';
        return;
      }
      this.error = '';
      this.$emit('login-success', {
        username: this.username,
        partnerId: this.partnerId,
        role: this.role,
      });
    },
  },
};
</script>

<style scoped>
#login-page {
  margin: 20px;
}
</style>
