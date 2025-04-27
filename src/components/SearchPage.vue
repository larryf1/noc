<template>
  <div id="search-page">
    <h2>Search</h2>
    <input type="text" id="search-box" v-model="query" placeholder="Search..." />
    <button @click="handleSearch">Search</button>
    <ul id="search-results">
      <li v-for="result in results" :key="result.value">{{ result.type }}: {{ result.value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  data() {
    return {
      query: '',
      results: [],
    };
  },
  methods: {
    handleSearch() {
      if (this.query.length < 3) {
        this.results = [{ type: 'Error', value: 'Enter at least 3 characters to search.' }];
        return;
      }
      const mockResults = [
        { type: 'Mac Address', value: '00:1A:2B:3C:4D:5E' },
        { type: 'Serial Number', value: 'SN12345678' },
        { type: 'Account ID', value: 'ACC987654' },
      ];
      this.results = mockResults.filter((result) =>
        result.value.toLowerCase().includes(this.query.toLowerCase())
      );
    },
  },
};
</script>

<style scoped>
#search-page {
  margin: 20px;
}
</style>
