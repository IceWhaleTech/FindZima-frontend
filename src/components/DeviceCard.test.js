import { shallowMount } from '@vue/test-utils';
import DeviceCard from './DeviceCard.vue';

describe('DeviceCard.vue', () => {
    it('renders device name and IP address', () => {
        const device = {
            device_model : '',
            device_name: 'Test Device',
            lan_ipv4: ['192.168.1.100'],
        };
        const wrapper = shallowMount(DeviceCard, {
            propsData: { device },
        });
        expect(wrapper.find('.title').text()).toMatch(device.device_name);
        expect(wrapper.find('.desc').text()).toMatch(device.lan_ipv4[0]);
    });

    it('emits "goto" event when access button is clicked', () => {
        const device = {
            device_model : '',
            device_name: 'Test Device',
            lan_ipv4: ['192.168.1.100'],
        };
        const wrapper = shallowMount(DeviceCard, {
            propsData: { device },
        });
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted().goto).toBeTruthy();
    });
});