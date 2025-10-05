interface Movie {
    id: number;
    title?: string;
    backdrop_path: string;
    overview?: string;

}

interface Genre {
    id: number;
    name: string;
}


interface GenreWithMovies {
    id: number;
    name: string;
    movies: Movie[];
}