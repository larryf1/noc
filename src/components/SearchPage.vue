<template>
  <div id="search-page">
    <h2>Search</h2>
    <input
      type="text"
      id="search-box"
      v-model="query"
      placeholder="Search..."
      @input="debouncedSearch"
    />
    <button @click="handleSearch">Search</button>
    <ul id="search-results">
      <li v-for="result in results" :key="result.value">{{ result.type }}: {{ result.value }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'SearchPage',
  props: {
    loggedInPartnerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      query: '',
      results: [],
      debounceTimeout: null,
    };
  },
  methods: {
    handleSearch() {
      if (this.query.length < 3) {
        this.results = [{ type: 'Error', value: 'Enter at least 3 characters to search.' }];
        return;
      }
      const mockResults = [
        { type: 'Mac Address', value: '001A2B3C4D5E', partnerId: 'partner1' },
        { type: 'Mac Address', value: '001A2B3C4D5F', partnerId: 'partner2' },
        { type: 'Serial Number', value: 'SN12345678', partnerId: 'partner1' },
        { type: 'Account ID', value: 'ACC987654', partnerId: 'partner3' },
        { type: 'Mac Address', value: 'AA1B2C3D4E5F', partnerId: 'partner2' },
        { type: 'Serial Number', value: 'SN87654321', partnerId: 'partner3' },
        { type: 'Account ID', value: 'ACC456789', partnerId: 'partner1' },
      ];

      // Filter by query
      let filteredResults = mockResults.filter((result) =>
        result.value.toLowerCase().includes(this.query.toLowerCase())
      );

      // Filter by loggedInPartnerId
      if (this.loggedInPartnerId) {
        filteredResults = filteredResults.filter(
          (result) => result.partnerId === this.loggedInPartnerId
        );
      }

      this.results = filteredResults;
    },
    debouncedSearch() {
      clearTimeout(this.debounceTimeout);
      this.debounceTimeout = setTimeout(() => {
        this.handleSearch();
      }, 300);
    },
  },
};
</script>

<style scoped>
#search-page {
  margin: 20px;
}
</style>
