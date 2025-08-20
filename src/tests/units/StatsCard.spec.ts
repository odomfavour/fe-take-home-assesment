import { mount } from '@vue/test-utils';
import StatsCard from '@/components/StatsCard.vue';
import { Smartphone } from 'lucide-vue-next';

describe('StatsCard.vue', () => {
  it('renders title and value correctly', () => {
    const wrapper = mount(StatsCard, {
      props: {
        title: 'Total Devices',
        value: 42
      }
    });

    expect(wrapper.text()).toContain('Total Devices');
    expect(wrapper.text()).toContain('42');
  });

  it('renders an icon component', () => {
    const wrapper = mount(StatsCard, {
      props: {
        title: 'Devices',
        value: 10,
        icon: Smartphone,
        color: 'text-blue-600'
      }
    });

    const svg = wrapper.find('svg');
    expect(svg.exists()).toBe(true);
    expect(svg.classes()).toContain('text-blue-600');
  });

  it('renders numeric and string values', () => {
    const wrapper1 = mount(StatsCard, { props: { title: 'Count', value: 100 } });
    const wrapper2 = mount(StatsCard, { props: { title: 'Status', value: 'Active' } });

    expect(wrapper1.text()).toContain('100');
    expect(wrapper2.text()).toContain('Active');
  });

  it('does not fail if no icon is provided', () => {
    const wrapper = mount(StatsCard, {
      props: {
        title: 'No Icon',
        value: 0
      }
    });

    expect(wrapper.text()).toContain('No Icon');
    expect(wrapper.text()).toContain('0');
  });
});
