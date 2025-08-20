import { mount } from '@vue/test-utils';
import Home from '@/views/Home.vue';
import deviceData from '@/data/battery.json';

describe('Home Page Integration', () => {
  it('shows correct analytics in StatsCards', async () => {
    const wrapper = mount(Home);

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Total Devices');
    expect(wrapper.text()).toContain(String(deviceData.length));

    const highCount = deviceData.filter((d) => d.batteryLevel > 0.5).length;
    expect(wrapper.text()).toContain(String(highCount));
  });

  it('filters data by "low" battery', async () => {
    const wrapper = mount(Home, {
      props: {
        filter: 'all',
        sortBy: 'timestamp',
        searchTerm: ''
      }
    });

    await wrapper.vm.$nextTick();

    const select = wrapper.find('[data-test="filter-select"]');
    await select.setValue('low');

    await wrapper.vm.$nextTick();

    const rendered = wrapper.findAll('[data-test="device-row"]');
    expect(rendered.length).toBeGreaterThan(0);
    expect(rendered.every((row) => Number(row.attributes('data-battery')) <= 0.2)).toBe(true);
  });

  it('switches between grid and table view', async () => {
    const wrapper = mount(Home);
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="device-grid"]').exists()).toBe(true);

    await wrapper.find('[data-test="toggle-table"]').trigger('click');
    expect(wrapper.find('[data-test="battery-table"]').exists()).toBe(true);
  });

  it('paginates results correctly', async () => {
    const wrapper = mount(Home);
    await wrapper.vm.$nextTick();

    const firstPage = wrapper.findAll('[data-test="device-row"]');
    expect(firstPage.length).toBeLessThanOrEqual(10);

    const page2Button = wrapper.find('[data-test="page-2"]');
    expect(page2Button.exists()).toBe(true);

    await page2Button.trigger('click');

    const secondPage = wrapper.findAll('[data-test="device-row"]');
    expect(secondPage).not.toEqual(firstPage);
  });
});
