import classNames from "classnames";
import { type FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

interface VideoPlayerProps {
  videoId: string;
  isMuted?: boolean;
  pip?: boolean;
  customHeight?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  videoId,
  customHeight,
  isMuted,
  pip,
}) => {
  const location = useLocation();
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mute] = useState<boolean>(false);
  const [playing] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);

  

  useEffect(() => {
    setVolume(mute ? 0 : 0.8);
  }, [mute]);

  const conatainerClass = classNames({
    "scale-110 relative pt-[56.25%] h-[190px]": pip,
    "h-[100vh]": location.pathname.startsWith("/watch"),
    [`h-[${customHeight}vh] relative pt-[56.25%] scale-150`]:
      !pip && !location.pathname.startsWith("/watch"),
  });

  return (
    <div className={conatainerClass} ref={containerRef}>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/embed/${videoId}`}
        controls={location.pathname.startsWith("/watch") ? true : false}
        muted={location.pathname.startsWith("/watch") ? mute : isMuted}
        playing={playing}
        volume={volume}
        loop={true}
        width="100%"
        height="100%"
        className="absolute top-0 left-0" 
        config={
            {
                youtube:{
                    playerVars:{
                        autoplay:1,
                        modestbranding:1,
                        rel:0,
                        disablekb:1                        
                    },
                    // embedOptions:{}
                }
            }
        }
      />
    </div>
  );
};


export default VideoPlayer;