import classNames from "classnames";
import { type FC, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";

interface VideoPlayerProps {
  videoId: string;
  isMuted?: boolean;
  pip?: boolean;
  /**
   * Desired height of the player container in viewport units when not on the
   * `/watch` route (for hero and modal usages).
   */
  customHeight?: string;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  videoId,
  customHeight,
  isMuted = true,
  pip,
}) => {
  const Player = ReactPlayer as unknown as FC<any>;
  const location = useLocation();
  // `react-player`'s internal ref typing is complex; use `any` here so we can
  // still access instance methods if needed without fighting the types.
  const playerRef = useRef<any>(null);

  // Drive muted state from the prop so external components (Hero, Modal,
  // PopUpCard, Watch page) stay in sync and autoplay works reliably.
  const [muted, setMuted] = useState<boolean>(isMuted);
  const [volume, setVolume] = useState<number>(0.8);

  useEffect(() => {
    setMuted(isMuted);
  }, [isMuted]);

  useEffect(() => {
    setVolume(muted ? 0 : 0.8);
  }, [muted]);

  const isWatchPage = location.pathname.startsWith("/watch");

  const containerClass = classNames("relative", {
    "scale-110 pt-[56.25%] h-[190px]": pip,
    "h-[100vh]": isWatchPage,
    "pt-[56.25%] scale-150": !pip && !isWatchPage,
  });

  const containerStyle =
    !pip && !isWatchPage && customHeight
      ? { height: `${customHeight}vh` }
      : undefined;

  return (
    <div className={containerClass} style={containerStyle}>
      <Player
  ref={playerRef}
  url={`https://www.youtube.com/watch?v=${videoId}`}
  controls
  muted={muted}
  playing
  volume={volume}
  loop
  width="100%"
  height="100%"
  className="absolute top-0 left-0"
  config={{
    youtube: {
      rel: 0,
      disablekb: 0,
      playerVars: {
        controls: 1,
      },
    },
  }}
/>
    </div>
  );
};

export default VideoPlayer;