
import classNames from "classnames";
import { useEffect, useRef, useState, type FC } from "react";
import ReactPlayer from 'react-player'
import { useLocation } from "react-router-dom";

interface videoPlayerProps {

    videoId: string;
    isMuted?: boolean;
    pip?: boolean;
    customHeight?: string;
}

const VideoPlayer: FC<videoPlayerProps> = ({
    videoId,
    isMuted,
    pip,
    customHeight
}) => {

    const location = useLocation()

    // using ReactPlayer as a type 

    const playerRef = useRef<typeof ReactPlayer>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // states without a setter

    const [mute] = useState<boolean>(false)
    const [playing] = useState<boolean>(false)

    // state to control the volume fo the video player
    const [volume, setVolume] = useState<number>(0.8)


    // set the volume based on mute state
    useEffect(() => {
        setVolume(mute ? 0 : 0.8)
    }, [mute])

    const containerClass = classNames({
        'scale-110 relative pt-[56.25%] h-[190px]': pip,
        'h-100vh': location.pathname.startsWith('/watch'),
        [`h-[${customHeight}vh] relative pt-[56.25%] scale-150`]: !pip && !location.pathname.startsWith('/watch')
    })
    return (
        <div className={containerClass} ref={containerRef}>
            <ReactPlayer
                ref={playerRef}
                src={`https://www.youtube.com/embed/${videoId}`}
                controls={true}
                playing={playing}
                volume={volume}
                muted={location.pathname.startsWith('/watch') ? mute : isMuted}
                height="100%"
                width="100%"
                loop={true}
                className="absolute top-0 left--0"
                config={{
                    youtube: {
                        playerVars: {
                            autoPlay: 1,
                            modestbrandig: 1,
                            rel: 0,
                            disablekb: 1
                        }
                    }
                }}
            />
        </div>
    )

}

export default VideoPlayer