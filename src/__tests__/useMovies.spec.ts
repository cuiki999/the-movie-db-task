import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useAxios } from '../actions/server';
import { useMovies } from '../composables/useMovies';
import type { Movie, ResponseMovie } from '../types/movie';

// Mock the API composable
vi.mock('../actions/server');
const mockUseApi = vi.mocked(useAxios);

const results: ResponseMovie[] = [
    {
        id: 123,
        overview: 'Overview 1',
        poster_path: '/nydROKumZe9oFZNiSn792MDDA1v.jpg',
        release_date: '2023-10-21',
        title: 'Miraculous World: Paris, Tales of Shadybug and Claw Noir',
        vote_average: 7.251,
    },
    {
        id: 456,
        overview: 'Overview 2',
        poster_path: '/6tNldk2zPUzXVKkU9aeirM9Wotu.jpg',
        release_date: '',
        title: 'Tinker Bell and the Lost Treasure',
        vote_average: 6.799,
    },
    {
        id: 789,
        overview: 'Overview 3',
        poster_path: '/41XxSsJc5OrulP0m7TrrUeO2hoz.jpg',
        release_date: '1986-08-02',
        title: 'Castle in the Sky',
        vote_average: 7.97,
    },
];

describe('useMovies', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should handle empty response', async () => {
        mockUseApi.mockReturnValue({
            fetch: vi.fn().mockResolvedValue({ results: [] }),
        });

        const { movieList, loadMovies } = useMovies();
        await loadMovies();

        expect(movieList.value).toHaveLength(0);
    });

    it('should handle non-empty response', async () => {
        mockUseApi.mockReturnValue({
            fetch: vi.fn().mockResolvedValue({
                results: results,
            }),
        });

        const { movieList, loadMovies } = useMovies();
        await loadMovies();

        const movie1: Movie | null = movieList.value[0] ?? null;
        const movie2: Movie | null = movieList.value[1] ?? null;

        expect(movieList.value.length).toBe(3);
        expect(movie1?.id).toBe(123);
        expect(movie1?.imageSrc).toBe('/nydROKumZe9oFZNiSn792MDDA1v.jpg');
        expect(movie1?.releaseDate).toBeTypeOf('object');
        expect(movie2?.releaseDate).toBe(undefined);
    });
});
