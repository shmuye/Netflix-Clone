import { type FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "../tmdbApi";
import Card from "../components/Card";

const Search: FC = () => {
  const { query } = useParams<{ query: string }>();

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await tmdbApi.searchMovies(query || "", 1);

      if(response.error){
        setMovies([]);
      }else if(response.data){
        setMovies(response.data.results);
      }
    };

    fetchData()
  }, [query]);

  return (
   <div className="absolute top-36 flex flex-wrap px-12 gap-4">
      {movies.length > 0 ? (
        movies.filter((movie) => movie.backdrop_path).map((movie) => (
          <Card item={movie} key={movie.id} />
        ))
      ): (
        <p className="text-white text-xl">No Movies Found For The Term {query}</p>
      )}
   </div> 
  )
};

export default Search;
