<template>
    <main>
        <h1>Popular Movies</h1>
        <SidebarLayout>
            <template #sidebar>
                <FilterPanel>
                    <template #title>Filters</template>
                    <template #genres>
                        <div class="chip-container">
                            <BaseSelectableChip
                                v-for="(chip, index) in chips"
                                :key="`chip_${index}`"
                                :title="chip.title"
                                :is-selected="chip.isSelected"
                                :value="chip.value"
                            />
                        </div>
                    </template>
                </FilterPanel>
            </template>
            <template #content>
                <CardGridLayout>
                    <BaseMediaCard
                        v-for="mediaCard in mediaCards"
                        :key="mediaCard.id"
                        :data="mediaCard"
                    />
                </CardGridLayout>
            </template>
        </SidebarLayout>
    </main>
</template>

<script setup lang="ts">
import BaseSelectableChip from '@/components/base/BaseSelectableChip.vue';
import FilterPanel from '@/components/filters/FilterPanel.vue';
import BaseMediaCard from '@/components/media-cards/BaseMediaCard.vue';
import CardGridLayout from '@/layout/CardGridLayout.vue';
import SidebarLayout from '@/layout/SidebarLayout.vue';
import type { MediaCard } from '@/types/media-card.ts';
import { ref } from 'vue';

const chips = ref([
    {
        isSelected: false,
        title: 'Test',
        value: 1,
    },
]);

const mediaCards = ref<MediaCard[]>([
    {
        id: 1,
        title: 'Test 1',
        score: 77,
        image: '',
        releaseDate: new Date('1970-10-10'),
    },
    {
        id: 2,
        title: 'Test 2',
        score: 77,
        image: '',
        releaseDate: new Date('1970-10-10'),
    },
    {
        id: 3,
        title: 'Test 3',
        score: 77,
        image: '',
        releaseDate: new Date('1970-10-10'),
    },
    {
        id: 4,
        title: 'Test 4',
        score: 77,
        image: '',
        releaseDate: new Date('1970-10-10'),
    },
    {
        id: 5,
        title: 'Test 5',
        score: 77,
        image: '',
        releaseDate: new Date('1970-10-10'),
    },
]);
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
