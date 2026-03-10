import { type FC, useEffect, useState } from "react";
import { tmdbApi } from "../tmdbApi";
import { useMovieContext } from "../context/MovieContext";
import Hero from "../components/Hero";
import Carousel from "../components/Carousal";


const Home: FC = () => {
  const [genresWithMovies, setgenresWithMovies] = useState<
    GenreWithMovie[] | null
  >(null);

  const {
    popularMovies,
    setPopularMovies,
    setSelectedMovie,
    setTopRatedMovies,
    setTrendingMovies,
    topRatedMovies,
    trendingMovies,
  } = useMovieContext();

  useEffect(() => {
    const loadMovies = async () => {
      const [
        popularMoviesResult,
        topRatedMoviesResult,
        trendingMoviesResult,
        allGenres,
      ] = await Promise.all([
        tmdbApi.fetchPopularMovies(),
        tmdbApi.fetchTopRatedMovies(),
        tmdbApi.fetchTrendingMovies(),
        tmdbApi.getGenres(),
      ]);
      

      if (allGenres.error) {
        console.log(allGenres.error);
        setgenresWithMovies([]);
      } else if (allGenres.data) {
        const allGenreWithMovies = await Promise.all(
          allGenres.data?.genres.map(async (genre) => {
            const movies = await tmdbApi.getMoviesByGenre(genre.id);
            console.log(movies);

            return {
              id: genre.id,
              name: genre.name,
              movies: movies.data.results,
            };
          })
        );

        setgenresWithMovies(allGenreWithMovies);

        
      }
      
      if (popularMoviesResult.error) {
        // set the popularmovies to an empty array
        setPopularMovies([]);
      } else if (popularMoviesResult.data) {
        const randomIndex = Math.floor(
          Math.random() * popularMoviesResult.data?.results.length
        );
        const randomMovie = popularMoviesResult.data?.results[randomIndex];

        setSelectedMovie(randomMovie);
        setPopularMovies(popularMoviesResult.data.results);
      }

      if (topRatedMoviesResult.error) {
        setTopRatedMovies([]);
      } else if (topRatedMoviesResult.data) {
        setTopRatedMovies(topRatedMoviesResult.data.results);
      }

      if (trendingMoviesResult.error) {
        setTrendingMovies([]);
      } else if (trendingMoviesResult.data) {
        setTrendingMovies(trendingMoviesResult.data.results);
      }
      
    };

    loadMovies();
  }, []);

  return (
    <div>
      <Hero />
      <div className="absolute w-full top-[31vh] i-pad:top-[37.5vh] i-pad-mini:top-[42vh] md:top-[65vh] lg:top-[85vh] pl-10 flex flex-col space-y-4s">
      {popularMovies &&<Carousel title="Popular Movies" items={popularMovies} />}
      {trendingMovies &&<Carousel title="Trending Movies" items={trendingMovies} />}
      {topRatedMovies &&<Carousel title="Top-Rated Movies" items={topRatedMovies} />}
      {genresWithMovies && genresWithMovies.map((movieList)=>(
        <Carousel key={movieList.id} title={`${movieList.name} Movies`} items={movieList.movies} />
      ))}
      </div>
    </div>
  );
};

export default Home;
