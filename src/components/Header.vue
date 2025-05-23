<template>
  <header class="header">
    <div class="app-title">AI NOC</div>
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
    }
  }
}
</script>

<style scoped>
.header {
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
}

.dropdown-popup {
  position: absolute;
  top: 30px;
  right: 80px;
  background: #222;
  color: #fff;
  border: 1px solid #888;
  border-radius: 4px;
  padding: 8px 16px;
  z-index: 2000;
  min-width: 140px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.dropdown-popup ul {
  margin: 0 0 8px 0;
  padding: 0 0 0 16px;
  list-style: disc;
  font-size: 13px;
}

.dropdown-popup strong {
  font-size: 13px;
}

.logout-btn {
  margin-left: 12px;
  padding: 3px 12px;
  background: #444;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.2s;
}

.logout-btn:hover {
  background: #666;
}
</style>
