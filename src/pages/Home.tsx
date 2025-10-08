import { useEffect, useState, type FC } from "react"
import { tmdbApi } from "../tmdbApi"
import type { GenreWithMovies } from "../types/types"
import { useMovieContext } from "../context/MovieContext"
import Hero from "../components/Hero"
import Carousal from "../components/Carousal"


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
                } else if (PopularMoviesResult.data) {
                    const randomIndex = Math.floor(Math.random() * PopularMoviesResult.data?.results.length)
                    const randomMovie = PopularMoviesResult.data?.results[randomIndex]
                    setSelectedMovie(randomMovie)
                    setPopularMovies(PopularMoviesResult.data.results)
                }

                if (TopRatedMoviesResult.error) {
                    setTopRatedMovies([])
                } else if (TopRatedMoviesResult.data) {
                    setTopRatedMovies(TopRatedMoviesResult.data.results)
                }

                if (TrendingMoviesResult.error) {
                    setTrendingMovies([])
                } else if (TrendingMoviesResult.data) {
                    setTrendingMovies(TrendingMoviesResult.data.results)
                }




            }
        }

        loadMovies()
    }, [])
    return (
        <div>
            <Hero />
            <div
                className="absolute w-full top-[31vh] md:top-[65vh] lg:top-[85vh] pl-10 flex-col space-y-4"
            >
                {popularMovies && <Carousal title="Popular Movies" items={popularMovies} />}
                {trendingMovies && <Carousal title="Trending Movies" items={trendingMovies} />}
                {topRatedMovies && <Carousal title="Top Rated Movies" items={topRatedMovies} />}
                {
                    GenreWithMovies && GenreWithMovies.map((movieList) => (
                        <Carousal title={`${movieList.name} movie`} items={movieList.movies} />
                    ))
                }

            </div>

        </div>
    )
}

export default Home