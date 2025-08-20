import FilterSection from '@/components/FilterSection.vue';
import { mount } from '@vue/test-utils';

describe('FilterBar.vue', () => {
  it('renders with initial props', () => {
    const wrapper = mount(FilterSection, {
      props: {
        filter: 'all',
        sortBy: 'timestamp',
        searchTerm: 'T100'
      }
    });

    const input = wrapper.find('input[type="text"]');
    expect((input.element as HTMLInputElement).value).toBe('T100');

    const filterSelect = wrapper.find('[data-test="filter-select"]');
    expect((filterSelect.element as HTMLSelectElement).value).toBe('all');

    const sortSelect = wrapper.findAll('select')[1];
    expect((sortSelect.element as HTMLSelectElement).value).toBe('timestamp');
  });

  it('emits update:searchTerm when typing', async () => {
    const wrapper = mount(FilterSection, {
      props: { filter: 'all', sortBy: 'timestamp', searchTerm: '' }
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('abc123');

    expect(wrapper.emitted('update:searchTerm')).toBeTruthy();
    expect(wrapper.emitted('update:searchTerm')![0]).toEqual(['abc123']);
  });

  it('emits update:filter when selecting a filter', async () => {
    const wrapper = mount(FilterSection, {
      props: { filter: 'all', sortBy: 'timestamp', searchTerm: '' }
    });

    const filterSelect = wrapper.find('[data-test="filter-select"]');
    await filterSelect.setValue('low');

    expect(wrapper.emitted('update:filter')).toBeTruthy();
    expect(wrapper.emitted('update:filter')![0]).toEqual(['low']);
  });

  it('emits update:sortBy when selecting a sort option', async () => {
    const wrapper = mount(FilterSection, {
      props: { filter: 'all', sortBy: 'timestamp', searchTerm: '' }
    });

    const sortSelect = wrapper.findAll('select')[1];
    await sortSelect.setValue('employeeId');

    expect(wrapper.emitted('update:sortBy')).toBeTruthy();
    expect(wrapper.emitted('update:sortBy')![0]).toEqual(['employeeId']);
  });
});
