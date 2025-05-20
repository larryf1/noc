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
      users: [
        {
          username: "adminUser",
          partnerIds: ["partner1", "partner2"],
          role: "admin"
        },
        {
          username: "testUser",
          partnerIds: ["partner3"],
          role: "tester"
        },
        {
          username: "supportUser",
          partnerIds: ["partner1"],
          role: "support"
        },
        {
          username: "superAdminUser",
          partnerIds: ["partner1", "partner2", "partner3", "partner4"],
          role: "super admin"
        }
      ]
    };
  },
  methods: {
    handleLogin() {
      // Existing validations for required fields
      if (!this.username || !this.partnerId || !this.role) {
        this.error = 'All fields are required.';
        return;
      }

      // Existing username format validation
      if (!/^[a-zA-Z0-9]{3,20}$/.test(this.username)) {
        this.error = 'Username must be alphanumeric and between 3-20 characters.';
        return;
      }

      const user = this.users.find(u => u.username === this.username);

      if (user) {
        // Validate selected partnerId and role against the found user's data
        if (!user.partnerIds.includes(this.partnerId)) {
          this.error = 'Invalid Partner ID for this user.';
          return;
        }
        if (user.role !== this.role) {
          this.error = 'Invalid Role for this user.';
          return;
        }

        // Emit login-success with found user's details
        this.error = '';
        this.$emit('login-success', {
          username: user.username,
          partnerId: this.partnerId, // Use the selected partnerId
          role: user.role,
        });
      } else {
        // If no user is found
        this.error = 'Invalid username or password.';
      }
    },
  },
};
</script>

<style scoped>
#login-page {
  margin: 20px;
}
</style>
