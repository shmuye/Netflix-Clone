import { type FC } from "react";
import { useParams } from "react-router-dom";
import VideoPlayer from "../components/VideoPlayer";
import NotFound from "./NotFound";

const Watch: FC = () => {
  const { id } = useParams();

  if (!id) {
    return <div>No Movie Selected</div>;
  }

  return (
    <div className="relative overflow-hidden">
      {id != "404-not-found" && <VideoPlayer videoId={id} isMuted={false} />}
      {id === "404-not-found" && <NotFound/>}
    </div>
  );
};

export default Watch;
