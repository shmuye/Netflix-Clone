import { type FC, useState } from "react";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { tmdbApi } from "../tmdbApi";

interface SimilarMoviesCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
}

const SimilarMoviesCard: FC<SimilarMoviesCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  duration,
}) => {
  const { setModalOpen } = useMovieContext();

  const navigate = useNavigate();

  const [imageSrc] = useState<string>(imageUrl);

  const handlePlay = async () => {
    const trailerRes = await tmdbApi.getMovieTrailer(parseInt(id));
    if (trailerRes.error) {
      navigate(`/watch/404-not-found`);
      setModalOpen(false);
    } else if (trailerRes.data) {
      navigate(`/watch/${trailerRes.data.results[0].key}`);
      setModalOpen(false);
    }
  };

  return (
    <div className="bg-[#181818] text-white rounded-lg shadow-md sm:w-40 w-32">
      <div className="relative">
        <img
          src={imageSrc}
          alt="img"
          className="rounded-t-lg w-full h-40 object-cover"
        />

        <div className="absolute top-2 right-2 bg-[#000000b3] text-white px-2 py-0.5 rounded-md text-sm font-semibold">
          {duration}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent"></div>

        <h3 className="absolute bottom-0 left-2 font-semibold text-base mb-1.5">
        {title.length > 20
            ? title.slice(0, 20) + "..."
            : title}
        </h3>
      </div>

      <div className="p-3">
        <div className="flex flex-col text-sm mb-1">
          <div className="flex justify-between">
            <div className="flex flex-col justify-between items-center">
              <div className="text-[#46d369]">
                <span>67% Match</span>
              </div>
              <div className="text-[#b3b3b3]">
                <span className="px-1 mr-2 border-[#b3b3b3] border">5+</span>
                <span>2024</span>
              </div>
            </div>

            <div onClick={handlePlay}>
              <button className="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white">
                <Play className="text-white h-4 w-4 md:h-6 md:w-6" />
              </button>
            </div>
          </div>
        </div>
        <p className="text-xs text-[#b3b3b3] mb-3 leading-tight">
          {description.length > 50
            ? description.slice(0, 50) + "..."
            : description}
        </p>
      </div>
    </div>
  );
};

export default SimilarMoviesCard;
