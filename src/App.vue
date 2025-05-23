<template>
  <div id="app">
    <AppHeader
      v-if="isAuthenticated"
      :username="userInfo?.username"
      :partnerIds="userInfo?.partnerIds"
      :roles="userInfo?.roles"
      :selectedPartnerId="selectedPartnerId"
      :selectedRole="selectedRole"
      @update-partner="onPartnerChange"
      @update-role="onRoleChange"
      @logout="logout"
    />
    <main>
      <LoginPage v-if="!isAuthenticated" @mock-login-success="updateAuthState" />
      <SearchPage
        v-else
        :loggedInPartnerId="selectedPartnerId"
        :loggedInRole="selectedRole"
      />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'
import LoginPage from './components/LoginPage.vue'
import SearchPage from './components/SearchPage.vue'
import { handleRedirect, isAuthenticated, getUserInfo, logout as ssoLogout } from './sso/azure'

export default {
  name: 'App',
  components: { AppHeader, AppFooter, LoginPage, SearchPage },
  data() {
    return {
      isAuthenticated: false,
      userInfo: null,
      selectedPartnerId: '',
      selectedRole: ''
    }
  },
  async created() {
    await handleRedirect()
    this.updateAuthState()
  },
  methods: {
    updateAuthState() {
      this.isAuthenticated = isAuthenticated()
      this.userInfo = this.isAuthenticated ? getUserInfo() : null
      if (this.userInfo) {
        this.selectedPartnerId = this.userInfo.partnerIds?.[0] || ''
        this.selectedRole = this.userInfo.roles?.[0] || ''
      } else {
        this.selectedPartnerId = ''
        this.selectedRole = ''
      }
    },
    logout() {
      ssoLogout()
      // Ensure state is reset and LoginPage is shown
      this.isAuthenticated = false
      this.userInfo = null
      this.selectedPartnerId = ''
      this.selectedRole = ''
    },
    onPartnerChange(partnerId) {
      this.selectedPartnerId = partnerId
    },
    onRoleChange(role) {
      this.selectedRole = role
    }
  }
}
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
  height: 35px;
}

main {
  flex: 1;
  padding: 45px 20px 20px;
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
  height: 25px;
  font-size: 10px;
}
</style>
