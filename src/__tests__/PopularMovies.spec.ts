import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import PopularMovies from '@/views/PopularMovies.vue';

describe('App', () => {
    it('mounts renders properly', () => {
        const wrapper = mount(PopularMovies);
        expect(wrapper.text()).toContain('Popular Movies');
    });
});
