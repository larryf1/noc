<template>
  <header class="header">
    <div class="app-title" @click="goHome" style="cursor:pointer;">AI NOC</div>
    <div v-if="username" class="user-info">
      <span class="username" @click="toggleDropdown">{{ username }}</span>
      <div v-if="showDropdown" class="dropdown-popup" @mouseleave="showDropdown = false">
        <div>
          <strong>Partners:</strong>
          <ul>
            <li v-for="id in partnerIds" :key="id">{{ id }}</li>
          </ul>
        </div>
        <div>
          <strong>Roles:</strong>
          <ul>
            <li v-for="role in roles" :key="role">{{ role }}</li>
          </ul>
        </div>
      </div>
      <button class="logout-btn" @click="$emit('logout')">Logout</button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  props: {
    username: String,
    partnerIds: Array,
    roles: Array,
    selectedPartnerId: String,
    selectedRole: String
  },
  data() {
    return {
      showDropdown: false
    }
  },
  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
    },
    goHome() {
      // Emit a custom event to parent to show the search page
      this.$emit('go-home')
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(90deg, #ff0066 0%, #a259ff 50%, #00dbff 100%);
  color: #fff;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  height: 25px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
}

.app-title {
  font-weight: bold;
  font-size: 1.2em;
  letter-spacing: 1px;
  text-shadow: 0 1px 8px #a259ff44;
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.username {
  margin-right: 10px;
  font-weight: bold;
  cursor: pointer;
  position: relative;
  color: #fff;
  transition: color 0.2s;
}
.username:hover {
  color: #ffb6e6;
}

.dropdown-popup {
  position: absolute;
  top: 35px;
  right: 80px;
  background: linear-gradient(135deg, #a259ff 0%, #00dbff 100%);
  color: #fff;
  border: 1px solid #ff0066;
  border-radius: 8px;
  padding: 12px 20px;
  z-index: 2000;
  min-width: 160px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  animation: fadeIn 0.2s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px);}
  to { opacity: 1; transform: translateY(0);}
}

.dropdown-popup ul {
  margin: 0 0 8px 0;
  padding: 0 0 0 18px;
  list-style: disc;
  font-size: 14px;
}

.dropdown-popup strong {
  font-size: 14px;
  color: #ffb6e6;
}

.logout-btn {
  margin-left: 12px;
  padding: 5px 16px;
  background: linear-gradient(90deg, #ff0066 0%, #a259ff 100%);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 8px #a259ff33;
  transition: background 0.2s, color 0.2s;
}
.logout-btn:hover {
  background: linear-gradient(90deg, #a259ff 0%, #ff0066 100%);
  color: #fff;
}
</style>
