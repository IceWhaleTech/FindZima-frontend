import { shallowMount } from '@vue/test-utils';
import CommonFooter from './CommonFooter.vue';

describe('CommonFooter.vue', () => {
  it('computes the button container width correctly', () => {
    const wrapper = shallowMount(CommonFooter, {
      props: {
        lineStyle: 'border2',
      },
    });

    expect(wrapper.vm.buttonContainerWidth).toEqual({ width: '280px' });
  });
});