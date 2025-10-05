import { useEffect, useState, type FC } from "react"
import { tmdbApi } from "../tmdbApi"
import type { GenreWithMovies } from "../types/types"
import { useMovieContext } from "../context/MovieContext"


const Home: FC = () => {

    const [GenreWithMovies, setGenreWithMovies] = useState<GenreWithMovies[] | null>(null)
    const {
        selectedMovie, popularMovies, trendingMovies, topRatedMovies,
        setTopRatedMovies, setPopularMovies, setSelectedMovie, setTrendingMovies
    } = useMovieContext()

    useEffect(() => {
        const loadMovies = async () => {
            const [PopularMoviesResult, TopRatedMoviesResult, TrendingMoviesResult, allGenres] = await Promise.all([
                tmdbApi.fetchPopularMovies(),
                tmdbApi.fetchTopRatedMovies(),
                tmdbApi.fetchTrendingMovies(),
                tmdbApi.getGenres()
            ])

            if (allGenres.error) {
                console.log(allGenres.error)
                setGenreWithMovies([])
            } else if (allGenres.data) {
                const allGenresWithMovies = await Promise.all(
                    allGenres.data?.genres.map(async (genre) => {
                        const movies = await tmdbApi.getMoviesByGenre(genre.id)

                        return {
                            id: genre.id,
                            name: genre.name,
                            movies: movies.data.results
                        }
                    })
                )
                setGenreWithMovies(allGenresWithMovies)

                if (PopularMoviesResult.error) {
                    setPopularMovies([])
                } else {
                    setPopularMovies(PopularMoviesResult.data.results)
                }

                if (TopRatedMoviesResult.error) {
                    setTopRatedMovies([])
                } else {
                    setTopRatedMovies(TopRatedMoviesResult.data.results)
                }

                if (TrendingMoviesResult.error) {
                    setTrendingMovies([])
                } else {
                    setTrendingMovies(TrendingMoviesResult.data.results)
                }

                const randomIndex = Math.floor(Math.random() * PopularMoviesResult.data?.results.length)
                const randomMovie = PopularMoviesResult.data?.results[randomIndex]
                setSelectedMovie(randomMovie)

                console.log(randomMovie)
            }
        }

        loadMovies()
    }, [])
    return (
        <div>
            Home
        </div>
    )
}

export default Home