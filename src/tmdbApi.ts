import axios, { AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export interface RequestError extends Error {
  status?: number;
  details?: any;
}

export interface ApiResponse<T> {
  data?: T;
  error?: RequestError | undefined;
}

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosInstance.get<T>(url, config);

    return { data: response.data };
  } catch (error: any) {
    const status = error?.response?.status;
    const details = error?.response?.data;
    toast.error("Something went wrong!!! Try again later", { id: "toast" });
    return {
      error: {
        message: `Failed to get the data from ${url}`,
        status,
        details,
        name: "TMDB_API_ERROR",
      },
    };
  }
};

// acctual apis

export const tmdbApi = {
  fetchPopularMovies: (page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/popular`, { params: { page } }),

  fetchTrendingMovies: (timeWindow: string = "week") =>
    get<{ results: Movie[] }>(`/trending/movie/${timeWindow}`),

  fetchTopRatedMovies: (page: number = 1) =>
    get<{ results: Movie[] }>(`/movie/top_rated`, { params: { page } }),

  getGenres: () => get<{ genres: Genre[] }>(`/genre/movie/list`),

  getMoviesByGenre: (genreId: number, page: number = 1) =>
    get<{ results: Movie[] }>(`/discover/movie`, {
      params: { with_genres: genreId, page },
    }),

  getMovieTrailer: (movieId: number) =>
    get<{ results: Trailer[] }>(`/movie/${movieId}/videos`),

  getMovieDetails: (movieId: number) => get<MovieDetails>(`/movie/${movieId}`),

  getSimlarMovies: (movieId: number) =>
    get<{ results: Movie[] }>(`/movie/${movieId}/similar`, {
      params: { page: 1 },
    }),

  searchMovies: (keyword: string, page: number = 1) =>
    get<{ results: Movie[] }>(`/search/movie`, {
      params: { query: keyword, page },
    }),
};
