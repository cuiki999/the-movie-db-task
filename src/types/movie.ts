export interface Movie {
    id: number;
    title: string;
    score: number;
    releaseDate?: Date;
    imageSrc?: string;
    overview?: string;
}

export interface ResponseMovie {
    id: number;
    title: string;
    vote_average: number;
    release_date: Date | '';
    poster_path: string;
    overview: string;
}

export interface ResponseMovieData {
    results: ResponseMovie[];
    total_pages: number;
}

export interface MovieRequestParams {
    page: number;
    with_genres?: string;
}
