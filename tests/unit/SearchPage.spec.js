import { mount } from '@vue/test-utils';
import SearchPage from '@/components/SearchPage.vue';

// Helper to create a promise-based nextTick
const nextTick = () => new Promise(resolve => setTimeout(resolve, 0));

describe('SearchPage.vue', () => {
  // Mock console.warn to avoid noise from Vue Test Utils about default values for props not being set
  let originalWarn;
  beforeAll(() => {
    originalWarn = console.warn;
    console.warn = jest.fn();
  });

  afterAll(() => {
    console.warn = originalWarn;
  });
  
  it('filters search results by loggedInPartnerId and query', async () => {
    const wrapper = mount(SearchPage, {
      propsData: {
        loggedInPartnerId: 'partner1', // Specific partner ID for this test
      },
      // Mocking the global $t function if your component uses it for i18n
      // mocks: {
      //   $t: (msg) => msg
      // }
    });

    // 1. Initial State (Optional but good practice)
    expect(wrapper.vm.results).toEqual([]);

    // 2. Set query data - using a term that appears in multiple mock items
    // and is at least 3 characters long.
    // The mockResults in SearchPage.vue are:
    // { type: 'Mac Address', value: '001A2B3C4D5E', partnerId: 'partner1' },
    // { type: 'Mac Address', value: '001A2B3C4D5F', partnerId: 'partner2' },
    // { type: 'Serial Number', value: 'SN12345678', partnerId: 'partner1' },
    // { type: 'Account ID', value: 'ACC987654', partnerId: 'partner3' },
    // { type: 'Mac Address', value: 'AA1B2C3D4E5F', partnerId: 'partner2' },
    // { type: 'Serial Number', value: 'SN87654321', partnerId: 'partner3' },
    // { type: 'Account ID', value: 'ACC456789', partnerId: 'partner1' },

    await wrapper.setData({ query: 'ACC' });

    // 3. Call handleSearch directly
    await wrapper.vm.handleSearch();
    // await nextTick(); // Wait for any reactive updates if necessary

    // 4. Assertions on wrapper.vm.results
    const results = wrapper.vm.results;

    // Expected: Only items matching 'ACC' AND partnerId 'partner1'
    expect(results.length).toBe(1);
    expect(results[0]).toEqual(expect.objectContaining({
      value: 'ACC456789',
      partnerId: 'partner1',
    }));

    // Ensure no items from other partners are present
    results.forEach(result => {
      expect(result.partnerId).toBe('partner1');
    });

    // Test with another query to ensure filtering works correctly
    await wrapper.setData({ query: 'SN' });
    await wrapper.vm.handleSearch();
    // await nextTick();

    const resultsSN = wrapper.vm.results;
    expect(resultsSN.length).toBe(1);
    expect(resultsSN[0]).toEqual(expect.objectContaining({
      value: 'SN12345678',
      partnerId: 'partner1',
    }));
     resultsSN.forEach(result => {
      expect(result.partnerId).toBe('partner1');
    });


    // Test with a query that matches no items for 'partner1'
    await wrapper.setData({ query: '001A2B3C4D5F' }); // This item belongs to partner2
    await wrapper.vm.handleSearch();
    // await nextTick();
    expect(wrapper.vm.results.length).toBe(0);

    // Test with a query that matches an item for 'partner1' but also for other partners
     await wrapper.setData({ query: 'Mac' }); // 'Mac Address' type
     await wrapper.vm.handleSearch();
     // await nextTick();
     const resultsMac = wrapper.vm.results;
     // Based on mock data, only '001A2B3C4D5E' for 'partner1' has 'Mac' in its type or value.
     // Let's adjust the mock data in SearchPage to better test this.
     // The current filter is on result.value.toLowerCase().includes(this.query.toLowerCase())
     // So 'Mac' will not match '001A2B3C4D5E'.
     // Let's assume the query is '001A'
    await wrapper.setData({ query: '001A' });
    await wrapper.vm.handleSearch();
    // await nextTick();
    const results001A = wrapper.vm.results;
    expect(results001A.length).toBe(1);
    expect(results001A[0]).toEqual(expect.objectContaining({
        value: '001A2B3C4D5E',
        partnerId: 'partner1'
    }));
    results001A.forEach(result => {
      expect(result.partnerId).toBe('partner1');
    });

  });

  it('shows error message for query less than 3 characters', async () => {
    const wrapper = mount(SearchPage, {
      propsData: { loggedInPartnerId: 'partner1' },
    });
    await wrapper.setData({ query: 'ab' });
    await wrapper.vm.handleSearch();
    // await nextTick();
    expect(wrapper.vm.results.length).toBe(1);
    expect(wrapper.vm.results[0]).toEqual({ type: 'Error', value: 'Enter at least 3 characters to search.' });
  });
});
