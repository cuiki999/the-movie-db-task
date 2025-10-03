export interface Movie {
    id: number;
    title: string;
    score?: number;
    releaseDate?: Date;
    imageSrc?: string;
}

export interface ResponseMovie {
    id: number;
    title: string;
    vote_average: number;
    release_date?: Date;
    poster_path: string;
}
