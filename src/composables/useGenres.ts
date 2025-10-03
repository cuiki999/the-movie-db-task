import axios from 'axios';
import type { Genre, ResponseGenre } from '@/types/genre.ts';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';

export function useGenres() {
    const genreList: Ref<Genre[]> = ref([]);

    const selectedGenres = computed((): string => {
        const selectedGenreArray: number[] = [];

        genreList.value.forEach((genre: Genre | null) => {
            if (genre?.isSelected) {
                selectedGenreArray.push(genre.id);
            }
        });

        return selectedGenreArray.join(',');
    });

    async function loadGenres(): Promise<void> {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
        const params = {
            api_key: import.meta.env.VITE_API_KEY,
        };

        axios
            .get(url, {
                params,
            })
            .then((res) => {
                const results: ResponseGenre[] = res?.data?.genres;

                genreList.value = results.map((item: ResponseGenre): Genre => {
                    return {
                        id: item.id,
                        name: item.name,
                        isSelected: false,
                    };
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return {
        genreList,
        selectedGenres,
        loadGenres,
    };
}
