import type { SelectedFilters } from '@/types/selected-filters.ts';
import type { Movie, ResponseMovie } from '@/types/movie.ts';
import type { Ref } from 'vue';
import axios from 'axios';
import { ref } from 'vue';

export function useMovies() {
    let currentPage = 0;

    const areMoviesFetching = ref(false);
    const movieList: Ref<Movie[]> = ref([]);
    const areMoreMoviesAvailable = ref(true);

    async function loadMovies(selectedFilters?: SelectedFilters): Promise<void> {
        if (!areMoreMoviesAvailable.value || areMoviesFetching.value) {
            return;
        }

        currentPage++;
        areMoviesFetching.value = true;

        const url =
            'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc';

        interface MovieRequestParams {
            api_key: string;
            page: number;
            with_genres?: string;
        }

        const params: MovieRequestParams = {
            api_key: import.meta.env.VITE_API_KEY,
            page: currentPage,
        };

        // dynamic params
        if (selectedFilters && selectedFilters.genres.length > 0) {
            params.with_genres = selectedFilters.genres;
        }

        axios
            .get(url, {
                params,
            })
            .then((res) => {
                const results: ResponseMovie[] = res?.data?.results;
                const totalPages = res?.data?.total_pages;

                const newMovies: Movie[] = results.map((item: ResponseMovie): Movie => {
                    return {
                        id: item.id,
                        title: item.title,
                        score: item.vote_average,
                        releaseDate: item.release_date ? new Date(item.release_date) : undefined,
                        imageSrc: item.poster_path,
                        overview: item.overview,
                    };
                });

                if (currentPage === 1) {
                    movieList.value = [];
                }

                movieList.value.push(...newMovies);

                if (currentPage >= totalPages) {
                    areMoreMoviesAvailable.value = false;
                }

                console.log(movieList.value);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                areMoviesFetching.value = false;
            });
    }

    function prepareReload(): void {
        currentPage = 0;
        areMoreMoviesAvailable.value = true;
    }

    return {
        movieList,
        areMoviesFetching,
        areMoreMoviesAvailable,
        loadMovies,
        prepareReload,
    };
}
