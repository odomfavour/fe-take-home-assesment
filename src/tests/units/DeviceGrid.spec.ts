import { mount } from '@vue/test-utils';
import DeviceGrid from '@/components/DeviceGrid.vue';
import { formatTimestamp } from '@/utils/battery';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-vue-next';
import { mockBatteryData } from '../mockData';

describe('DeviceGrid.vue', () => {
  it('renders heading and summary correctly', () => {
    const wrapper = mount(DeviceGrid, {
      props: { filteredData: mockBatteryData, total: 10 }
    });

    expect(wrapper.text()).toContain('Battery Readings');
    expect(wrapper.text()).toContain(`Showing ${mockBatteryData.length} of 10 readings`);
  });

  it('renders a card for each device', () => {
    const wrapper = mount(DeviceGrid, {
      props: { filteredData: mockBatteryData, total: mockBatteryData.length }
    });

    const cards = wrapper.findAll('[data-test="device-row"]');
    expect(cards).toHaveLength(mockBatteryData.length);

    cards.forEach((card, i) => {
      expect(card.attributes('data-battery')).toBe(String(mockBatteryData[i].batteryLevel));
      expect(card.text()).toContain(mockBatteryData[i].serialNumber);
      expect(card.text()).toContain(`Employee: ${mockBatteryData[i].employeeId}`);
    });
  });

  it('shows correct battery percentage and status text', () => {
    const wrapper = mount(DeviceGrid, {
      props: { filteredData: mockBatteryData, total: mockBatteryData.length }
    });

    const cards = wrapper.findAll('[data-test="device-row"]');

    expect(cards[0].text()).toContain('5.0%');
    expect(cards[0].text().toLowerCase()).toContain('critical');

    expect(cards[1].text()).toContain('15.0%');
    expect(cards[1].text().toLowerCase()).toContain('low');

    expect(cards[2].text()).toContain('80.0%');
    expect(cards[2].text().toLowerCase()).toContain('good');
  });

  it('formats timestamps correctly', () => {
    const wrapper = mount(DeviceGrid, {
      props: { filteredData: mockBatteryData, total: mockBatteryData.length }
    });

    const cards = wrapper.findAll('[data-test="device-row"]');
    expect(cards[0].text()).toContain(formatTimestamp(mockBatteryData[0].timestamp));
  });

  it('renders correct status icon per battery level', () => {
    const wrapper = mount(DeviceGrid, {
      props: { filteredData: mockBatteryData, total: mockBatteryData.length }
    });

    const cards = wrapper.findAll('[data-test="device-row"]');

    expect(cards[0].findComponent(AlertTriangle).exists()).toBe(true);
    expect(cards[1].findComponent(TrendingDown).exists()).toBe(true);
    expect(cards[2].findComponent(TrendingUp).exists()).toBe(true);
  });
});
