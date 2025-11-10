import { Check, Play, Plus, Volume2, VolumeOff } from "lucide-react"
import { useState, type FC } from "react"
import VideoPlayer from "./VideoPlayer"
import { Link } from "react-router-dom"

interface PopUpCardProps {
    isHovered: boolean,
    x: number,
    y: number,

}

const PopupCard: FC<PopUpCardProps> = ({ isHovered, x, y }) => {
    const [title, setTitle] = useState<string>("MOVIE")
    const [muted, setMuted] = useState<boolean>(false)
    const [trailerUrl, setTrailerUrl] = useState<string>('')
    const [showTrailer, setshowTrailer] = useState<boolean>(false)
    const [imageUrl, setImageUrl] = useState<string>("")
    const [addedTofavorite, setAddedToFavorite] = useState<boolean>(false)


    const styles: Record<string, React.CSSProperties> = {
        PopupCard: {
            backgroundColor: 'rgb(20,20,20)',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px 1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0,0,0,0.12) 0px 1px 3px 0px',
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))",
            borderRadius: "8px",
            transformOrigin: "center",
            position: "fixed",
            width: "350px",
            zIndex: "1000",
            overflow: "hidden"
        },

        PopupScaledDown: {
            transform: 'translate(-50%, -100%) scale(0)',
            opacity: 1
        },
        PopupScaledUp: {
            transform: 'translate(-50%, -100%) scale(1)',
            opacity: 1
        },
        transitionAll: {
            transition: "transform 0.3s ease 0.1s, opacity 0.3s ease"
        }
    }
    return (
        <div
            className="text-white flex flex-col z-40"
            style={{
                ...styles.PopupCard,
                top: `${y + 270}px`,
                left: `${x < 200 ? x + 60 : window.innerWidth - x < 200 ? x - 60 : x
                    }px`,
                ...(isHovered ? styles.PopupScaledUp : styles.PopupScaledDown),
                ...styles.transitionAll
            }}
            onMouseLeave={() => { }}
        >
            <div
                className="relative w-full h-[198px]"
                onMouseEnter={() => { }}
                onMouseLeave={() => { }}
            >

                <div className="flex items-center">

                    <p className="absolute top-36 left-2  text-ellipsis font-semibold text-xl">
                        {title.length > 25 ? title.slice(0, 25) + "..." : title}
                    </p>

                    <span className="absolute cursor-pointer   transition-colors duration-200 top-36 right-4 p-3 border-2
                        border-gray-700 rounded-full hover:border-white">
                        {
                            muted ? <VolumeOff size={20} /> : <Volume2 size={20} />
                        }
                    </span>

                </div>
                {
                    trailerUrl && showTrailer ? (
                        <div className="pointer-events-none z-50 w-full h-full border-gray-700">
                            <VideoPlayer
                                pip={true}
                                isMuted={muted}
                                videoId={trailerUrl}
                            />

                        </div>
                    ) : imageUrl ? (
                        <img src={imageUrl} className="w-full h-full object-cover" alt="Poster" />) :
                        <div className="w-full h-[200px] bg-gray-500 flex items-center justify-center">
                            <span className="text-white text-sm">No Image Available</span>
                        </div>
                }
            </div>

            <div className="flex justify-between items-center p-4">
                <div className="flex space-x-2">

                    <Link
                        to={`/watch/${trailerUrl}`}
                        className="rounded-full transition-colors duration-200 border-2 border-gray-700 p-3 hover:border-white">
                        <Play size={20} className="h-6 w-6" />
                    </Link>
                    <button
                        onClick={() => { }}
                        className="rounded-full transition-colors duration-200 p-3 border-2 border-gray-700 hover:border-white"
                    >
                        {
                            addedTofavorite ? (
                                <Check size={20} className="h-6 w-6" />
                            ) :
                                (
                                    <Plus size={20} className="h-6 w-6" />
                                )
                        }

                    </button>

                </div>
            </div>
        </div>
    )
}

export default PopupCard