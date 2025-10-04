import { useAxios } from '@/actions/server.ts';
import type { Movie, MovieRequestParams, ResponseMovie, ResponseMovieData } from '@/types/movie.ts';
import type { SelectedFilters } from '@/types/selected-filters.ts';
import type { Ref } from 'vue';
import { ref } from 'vue';

export function useMovies() {
    const areMoviesFetching = ref(false);
    const movieList: Ref<Movie[]> = ref([]);
    const movieListErrorMessage: Ref<string> = ref('');
    const areMoreMoviesAvailable = ref(true);

    let currentPage = 0;

    function prepareQueryParams(selectedFilters?: SelectedFilters): MovieRequestParams {
        const params: MovieRequestParams = {
            page: currentPage,
        };

        // dynamic params
        if (selectedFilters && selectedFilters?.genres?.length > 0) {
            params.with_genres = selectedFilters.genres;
        }

        return params;
    }

    function prepareReload(): void {
        currentPage = 0;
        areMoreMoviesAvailable.value = true;
    }

    function incrementPage(): void {
        currentPage++;
    }

    function populateMovieList(newMovies: Movie[]): void {
        if (currentPage === 1) {
            movieList.value = [];
        }

        movieList.value.push(...newMovies);
    }

    async function loadMovies(selectedFilters?: SelectedFilters): Promise<void> {
        if (!areMoreMoviesAvailable.value || areMoviesFetching.value) {
            return;
        }

        areMoviesFetching.value = true;
        incrementPage();

        const url =
            '/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc';
        const params = prepareQueryParams(selectedFilters);
        const { fetch } = useAxios();

        try {
            await fetch(url, params).then((data): void => {
                const results: ResponseMovie[] = (data as ResponseMovieData).results;
                const totalPages = (data as ResponseMovieData).total_pages;

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

                populateMovieList(newMovies);

                if (currentPage >= totalPages) {
                    areMoreMoviesAvailable.value = false;
                }

                movieListErrorMessage.value = '';
            });
        } catch (error) {
            movieListErrorMessage.value =
                typeof error === 'string' ? error : 'Something went wrong.';
        } finally {
            areMoviesFetching.value = false;
        }
    }

    return {
        movieList,
        areMoviesFetching,
        areMoreMoviesAvailable,
        movieListErrorMessage,
        loadMovies,
        prepareReload,
    };
}
