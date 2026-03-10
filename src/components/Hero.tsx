import { type FC, useEffect } from "react";
import { useMovieContext } from "../context/MovieContext";
import { Info, Play, Volume2, VolumeOff } from "lucide-react";
import { tmdbApi } from "../tmdbApi";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";

const Hero: FC = () => {
  const {
    selectedMovie,
    trailerUrl,
    setTrailerUrl,
    playerMuted,
    setPlayerMuted,
    setModalOpen
  } = useMovieContext();

  useEffect(() => {
    const fetchTrailer = async () => {
      if (selectedMovie) {
        const trailerRes = await tmdbApi.getMovieTrailer(selectedMovie.id);
        if (trailerRes.error) {
          setTrailerUrl("");
        } else if (trailerRes.data) {
          setTrailerUrl(trailerRes.data.results[0].key);
        }
      }
    };

    fetchTrailer();
  }, [selectedMovie]);

  const navigate = useNavigate()

  const toggleMuted = () => {
    setPlayerMuted(!playerMuted);
  };

  return (
    <main className="relative bg-custom-dark overflow-hidden">
      {/* Video Player */}
      {trailerUrl && (
        <VideoPlayer
          videoId={trailerUrl}
          customHeight="0"
          isMuted={playerMuted}
        />
      )}
      {selectedMovie && !trailerUrl && (
        <img
          src={`https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`}
          alt="movie poster"
        />
      )}

      {/* gradient div */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>

      {/* movie details */}
      {selectedMovie && (
        <div className="absolute top-[38%] pl-12 w-full z-10">
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-4">
            {selectedMovie.title?.length > 30 && window.innerWidth < 768
              ? selectedMovie.title?.substring(0, 30) + "..."
              : selectedMovie.title}
          </h1>

          <p className="text-sm md:text-lg text-gray-300 hidden md:block mb-6 max-w-lg">
            {selectedMovie.overview?.substring(0, 150) + "..."}
          </p>

          <div className="flex flex-wrap items-center">
            <div className="xs:flex-col flex gap-4">
              <button
                onClick={() => {navigate(`/watch/${trailerUrl}`)}}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-all"
              >
                <Play size={20} />
                <span className="font-semibold">Play</span>
              </button>

              <button onClick={() => {setModalOpen(true)}} className="flex items-center gap-2 bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-all">
                <Info size={20} />
                <span className="font-semibold hidden md:block">Info</span>
              </button>
            </div>

            <div className="absolute right-0 flex items-center gap-4">
              <button
                onClick={toggleMuted}
                className="flex items-center p-2 border-2 text-white rounded-full transition-all"
              >
                {playerMuted ? <VolumeOff size={20} /> : <Volume2 size={20} />}
              </button>

              <div className="bg-gray-600 text-white bg-opacity-60 border-l-2 px-3 py-2">
                <span>18+</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Hero;
