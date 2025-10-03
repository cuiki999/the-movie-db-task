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
                                v-for="genre in genreList"
                                :key="`chip_genre_${genre.id}`"
                                :title="genre.name"
                                :is-selected="genre.isSelected"
                                :value="genre.id"
                                @toggle-chip="genre.isSelected = !genre.isSelected"
                            />
                        </div>
                        <button @click="applyFilters">Search</button>
                    </template>
                </FilterPanel>
            </template>
            <template #content>
                <div ref="card-container" class="card-grid">
                    <MediaCard
                        v-for="movie in movieList"
                        :key="movie.id"
                        :image-src="movie.imageSrc"
                        :title="movie.title"
                        :score="movie.score"
                        :release-date="movie.releaseDate"
                    />
                </div>
                <button v-if="areMoreMoviesAvailable" @click="loadMoreMovies">Load more</button>
            </template>
        </SidebarLayout>
    </main>
</template>

<script setup lang="ts">
import BaseSelectableChip from '@/components/base/BaseSelectableChip.vue';
import FilterPanel from '@/components/filters/FilterPanel.vue';
import MediaCard from '@/components/media-cards/MediaCard.vue';
import { useGenres } from '@/composables/useGenres.ts';
import { useMovies } from '@/composables/useMovies.ts';
import SidebarLayout from '@/layout/SidebarLayout.vue';
import type { Ref } from 'vue';
import type { SelectedFilters } from '@/types/selected-filters.ts';
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

// composables
const { movieList, areMoreMoviesAvailable, loadMovies, prepareReload } = useMovies();
const { genreList, selectedGenres, loadGenres } = useGenres();

const cardContainer: Ref = useTemplateRef('card-container');
const enableInfinityScroll = ref(false);

const selectedFilters = computed((): SelectedFilters => {
    return {
        genres: selectedGenres.value,
    };
});

onMounted(() => {
    loadGenres();
    loadMovies();

    window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});

const onScroll = () => {
    // debounce could be introduced here for better performance
    const conditions = cardContainer.value && enableInfinityScroll.value;

    if (!conditions) {
        return;
    }

    const offset = 50;
    const hasReachedBottom =
        cardContainer.value.getBoundingClientRect().bottom - offset < window.innerHeight;

    if (hasReachedBottom) {
        loadMovies(selectedFilters.value);
    }
};

const applyFilters = () => {
    enableInfinityScroll.value = false;

    prepareReload();
    loadMovies(selectedFilters.value);
};

const loadMoreMovies = () => {
    enableInfinityScroll.value = true;

    loadMovies(selectedFilters.value);
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
