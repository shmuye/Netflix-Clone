export interface Movie {
    id: number;
    title?: string;
    backdrop_path: string;
    overview?: string;

}

export interface Genre {
    id: number;
    name: string;
}