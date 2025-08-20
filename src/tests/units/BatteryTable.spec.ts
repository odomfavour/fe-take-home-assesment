import { mount } from '@vue/test-utils';
import BatteryTable from '@/components/BatteryTable.vue';
import { formatTimestamp } from '@/utils/battery';
import { mockBatteryData } from '../mockData';

describe('BatteryTable.vue', () => {
  it('renders table headers', () => {
    const wrapper = mount(BatteryTable, {
      props: { filteredData: [], total: 0 }
    });

    const headers = wrapper.findAll('th').map((h) => h.text());
    expect(headers).toEqual(['Device', 'Employee', 'Battery Level', 'Status', 'Timestamp']);
  });

  it('renders correct summary count', () => {
    const wrapper = mount(BatteryTable, {
      props: { filteredData: mockBatteryData, total: 5 }
    });

    expect(wrapper.text()).toContain('Showing 3 of 5 readings');
  });

  it('renders a row for each device', () => {
    const wrapper = mount(BatteryTable, {
      props: { filteredData: mockBatteryData, total: 3 }
    });

    const rows = wrapper.findAll('[data-test="device-row"]');
    expect(rows).toHaveLength(mockBatteryData.length);

    rows.forEach((row, idx) => {
      expect(row.attributes('data-battery')).toBe(String(mockBatteryData[idx].batteryLevel));
    });
  });

  it('displays correct battery percentage and status', () => {
    const wrapper = mount(BatteryTable, {
      props: { filteredData: mockBatteryData, total: 3 }
    });

    const rows = wrapper.findAll('[data-test="device-row"]');

    expect(rows[0].text()).toContain('5.0%');
    expect(rows[0].text().toLowerCase()).toContain('critical');

    expect(rows[1].text()).toContain('15.0%');
    expect(rows[1].text().toLowerCase()).toContain('low');

    expect(rows[2].text()).toContain('80.0%');
    expect(rows[2].text().toLowerCase()).toContain('good');
  });

  it('formats timestamp correctly', () => {
    const wrapper = mount(BatteryTable, {
      props: { filteredData: mockBatteryData, total: 3 }
    });

    const rows = wrapper.findAll('[data-test="device-row"]');
    expect(rows[0].text()).toContain(formatTimestamp(mockBatteryData[0].timestamp));
  });
});
