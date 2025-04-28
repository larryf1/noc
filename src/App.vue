<template>
  <div id="app">
    <header>
      <h1>AI NOC</h1>
      <div id="user-dropdown" v-if="isLoggedIn">
        <span id="logged-in-user">Logged in as: {{ username }}</span>
        <select id="user-details-dropdown">
          <option :value="`Partner ID: ${partnerId}`">Partner ID: {{ partnerId }}</option>
          <option :value="`Role: ${role}`">Role: {{ role }}</option>
        </select>
        <button id="logout-button" @click="logout">Logout</button>
      </div>
    </header>

    <main>
      <LoginPage v-if="!isLoggedIn" @login-success="handleLoginSuccess" />
      <SearchPage v-else />
    </main>

    <footer>
      <p>Version 1.0.0</p>
    </footer>
  </div>
</template>

<script>
import LoginPage from './components/LoginPage.vue';
import SearchPage from './components/SearchPage.vue';

export default {
  name: 'App',
  components: {
    LoginPage,
    SearchPage,
  },
  data() {
    return {
      isLoggedIn: false,
      username: '',
      partnerId: '',
      role: '',
    };
  },
  methods: {
    handleLoginSuccess({ username, partnerId, role }) {
      this.isLoggedIn = true;
      this.username = username;
      this.partnerId = partnerId;
      this.role = role;
    },
    logout() {
      this.isLoggedIn = false;
      this.username = '';
      this.partnerId = '';
      this.role = '';
    },
  },
};
</script>

<style scoped>
header {
  background-color: #333;
  color: white;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 50px;
}

main {
  flex: 1;
  padding: 70px 20px 20px;
  overflow-y: auto;
}

footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 5px 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  font-size: 12px; /* Added to make the font size smaller */
}
</style>
