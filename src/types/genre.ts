export interface Genre {
    id: number;
    name: string;
    isSelected: boolean;
}

export interface ResponseGenre {
    id: number;
    name: string;
}

export interface ResponseGenreData {
    genres: ResponseGenre[];
}
