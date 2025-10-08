import type { FC } from "react"

interface CardProps {
    item: Movie
}

const Card: FC<CardProps> = ({ item }) => {
    return (
        <div
            className="cursor-pointer text-white opacity-100 pointer-events-auto relative sm:w-56 w-36"
            onMouseEnter={() => { }}
            role="presentation">
            <img
                className="w-full block h-auto"
                src={`https://image.tmdb.org/t/p/w300/${item.backdrop_path}`} alt={item.title} />
        </div>
    )
}

export default Card