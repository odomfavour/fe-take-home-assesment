import { mount } from '@vue/test-utils';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('emits update:viewMode when toggled', async () => {
    const wrapper = mount(Header, {
      props: { viewMode: 'grid' }
    });

    const tableButton = wrapper.findAll('button').find((btn) => btn.text() === 'Table');
    expect(tableButton).toBeTruthy();

    await tableButton!.trigger('click');

    expect(wrapper.emitted()['update:viewMode'][0]).toEqual(['table']);
  });
});
