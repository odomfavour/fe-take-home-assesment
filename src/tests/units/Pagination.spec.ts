import { mount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';

describe('Pagination.vue', () => {
  const factory = (props = {}) =>
    mount(Pagination, {
      props: {
        totalItems: 50,
        rowsPerPage: 10,
        currentPage: 1,
        ...props
      }
    });

  it('renders with correct initial props', () => {
    const wrapper = factory();
    expect(wrapper.find('select').element.value).toBe('10');
    expect(wrapper.text()).toContain('out of 50');
    expect(wrapper.find('[data-test="page-1"]').exists()).toBe(true);
  });

  it('emits update:rowsPerPage when selecting new rows', async () => {
    const wrapper = factory();
    const select = wrapper.find('select');
    await select.setValue('20');
    expect(wrapper.emitted('update:rowsPerPage')).toBeTruthy();
    expect(wrapper.emitted('update:rowsPerPage')![0]).toEqual([20]);

    expect(wrapper.emitted('update:currentPage')![0]).toEqual([1]);
  });

  it('emits update:currentPage when clicking next', async () => {
    const wrapper = factory({ currentPage: 1 });
    const next = wrapper.find('button:last-child');
    await next.trigger('click');
    expect(wrapper.emitted('update:currentPage')).toBeTruthy();
    expect(wrapper.emitted('update:currentPage')![0]).toEqual([2]);
  });

  it('emits update:currentPage when clicking a page number', async () => {
    const wrapper = factory({ currentPage: 1 });
    const page2 = wrapper.find('[data-test="page-2"]');
    await page2.trigger('click');
    expect(wrapper.emitted('update:currentPage')![0]).toEqual([2]);
  });

  it('disables Prev button on first page', () => {
    const wrapper = factory({ currentPage: 1 });
    const prev = wrapper.find('button');
    expect(prev.attributes('disabled')).toBeDefined();
  });

  it('disables Next button on last page', () => {
    const wrapper = factory({ currentPage: 5 });
    const next = wrapper.find('button:last-child');
    expect(next.attributes('disabled')).toBeDefined();
  });

  it('renders ellipses when there are many pages', () => {
    const wrapper = factory({ totalItems: 200, rowsPerPage: 10, currentPage: 10 });
    expect(wrapper.text()).toContain('...');
  });
});
