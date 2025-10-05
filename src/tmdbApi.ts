import axios, { type AxiosRequestConfig } from 'axios'
import type { Genre, Movie } from './types/types';

const BASE_URL = import.meta.env.VITE_BASE_URI
const API_KEY = import.meta.env.VITE_TMDB_API_KEY


console.log("TMDB KEY:", API_KEY);

export interface RequestError extends Error {
    status?: number,
    details?: any
}

export interface ApiResponse<T> {
    data?: T,
    error?: RequestError | undefined
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY
    }
})

const get = async<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
        const response = await axiosInstance.get<T>(url, config);
        return { data: response.data }
    } catch (error) {
        const status = error?.response?.status
        const details = error?.response?.data


        return {
            error: {
                message: `failed to get the data from ${url}`,
                status,
                details,
                name: "TMDB api error"
            }
        }
    }
}

export const tmdbApi = {
    fetchPopularMovies: (page: number = 1) => get<{ results: Movie[] }>('/movie/popular', { params: { page } }),

    fetchTrendingMovies: (timeWindow: string = 'week') => get<{ results: Movie[] }>(`/trending/movie/${timeWindow}`),

    fetchTopRatedMovies: (page: number = 1) => get<{ results: Movie[] }>(`/movie/top_rated`, { params: { page } }),

    getGenres: () => { get<{ genres: Genre[] }>('/genre/movie/list') },
    getMoviesByGenre: (genreId: number, page: number = 1) => {
        get<{ results: Movie[] }>(`/discover/movie`, { params: { with_genres: genreId, page } })
    }
}