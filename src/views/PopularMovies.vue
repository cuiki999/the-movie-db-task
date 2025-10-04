<template>
    <main>
        <SidebarLayout>
            <template #title>Popular Movies</template>
            <template #sidebar>
                <FilterPanel>
                    <template #title>Filters</template>
                    <template #genres>
                        <BaseErrorMessage v-if="genreErrorMessage" :text="genreErrorMessage" />
                        <div v-else class="chip-container">
                            <BaseSelectableChip
                                v-for="genre in genreList"
                                :key="`chip_genre_${genre.id}`"
                                :title="genre.name"
                                :is-selected="genre.isSelected"
                                :value="genre.id"
                                @toggle-chip="onToggleChip(genre)"
                            />
                        </div>
                    </template>
                </FilterPanel>
                <BaseButton
                    text="Search"
                    :isInactive="areFiltersPristine"
                    @press-button="applyFilters"
                ></BaseButton>
            </template>
            <template #content>
                <BaseErrorMessage v-if="movieListErrorMessage" :text="movieListErrorMessage" />
                <template v-else>
                    <div ref="card-container" class="card-grid">
                        <MediaCard
                            v-for="movie in movieList"
                            :key="movie.id"
                            :image-src="movie.imageSrc"
                            :title="movie.title"
                            :score="movie.score"
                            :release-date="movie.releaseDate"
                            :overview="movie.overview"
                        />
                    </div>
                    <BaseButton
                        v-if="areMoreMoviesAvailable"
                        text="Load More"
                        additionalClasses="load-button"
                        @press-button="loadMoreMovies"
                    ></BaseButton>
                </template>
            </template>
        </SidebarLayout>
    </main>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseErrorMessage from '@/components/base/BaseErrorMessage.vue';
import BaseSelectableChip from '@/components/base/BaseSelectableChip.vue';
import FilterPanel from '@/components/filters/FilterPanel.vue';
import MediaCard from '@/components/media-cards/MediaCard.vue';
import { useGenres } from '@/composables/useGenres.ts';
import { useMovies } from '@/composables/useMovies.ts';
import SidebarLayout from '@/layout/SidebarLayout.vue';
import type { Genre } from '@/types/genre.ts';
import type { Ref } from 'vue';
import type { SelectedFilters } from '@/types/selected-filters.ts';
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

// composables
const { movieList, areMoreMoviesAvailable, movieListErrorMessage, loadMovies, prepareReload } =
    useMovies();
const { genreList, selectedGenres, genreErrorMessage, loadGenres } = useGenres();

const cardContainer: Ref = useTemplateRef('card-container');
const enableInfinityScroll = ref(false);
const areFiltersPristine = ref(true);

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

const onToggleChip = (genre: Genre) => {
    areFiltersPristine.value = false;

    genre.isSelected = !genre.isSelected;
};
</script>

<style scoped lang="scss">
@use '@/assets/scss/abstracts';
</style>
