import type { Genre, ResponseGenre, ResponseGenreData } from '@/types/genre.ts';
import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import { useAxios } from '@/actions/server.ts';

export function useGenres() {
    const genreList: Ref<Genre[]> = ref([]);
    const genreErrorMessage: Ref<string> = ref('');

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
        const url = '/genre/movie/list?language=en';
        const { fetch } = useAxios();

        try {
            await fetch(url).then((data): void => {
                const results: ResponseGenre[] = (data as ResponseGenreData).genres;

                genreList.value = results.map((item: ResponseGenre): Genre => {
                    return {
                        id: item.id,
                        name: item.name,
                        isSelected: false,
                    };
                });

                genreErrorMessage.value = '';
            });
        } catch (error) {
            genreErrorMessage.value = typeof error === 'string' ? error : 'Something went wrong.';
        }
    }

    return {
        genreList,
        selectedGenres,
        genreErrorMessage,
        loadGenres,
    };
}
