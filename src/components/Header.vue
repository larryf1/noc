<template>
  <header class="header">
    <div class="app-title">AI NOC</div>
    <div v-if="username" class="user-info">
      <span>{{ username }}</span>
      <select v-model="selectedPartnerId">
        <option v-for="id in partnerIds" :key="id" :value="id">{{ id }}</option>
      </select>
      <select v-model="selectedRole">
        <option v-for="role in roles" :key="role" :value="role">{{ role }}</option>
      </select>
      <button @click="$emit('logout')">Logout</button>
    </div>
  </header>
</template>

<script>
// eslint-disable-next-line vue/multi-word-component-names, vue/no-reserved-component-names
export default {
  name: 'AppHeader',
  props: {
    username: String,
    partnerIds: Array,
    roles: Array
  },
  data() {
    return {
      selectedPartnerId: this.partnerIds?.[0] || '',
      selectedRole: this.roles?.[0] || ''
    }
  }
}
</script>

<style scoped>
.header {
  /* ...existing code... */
}
.user-info {
  /* ...existing code... */
}
</style>
