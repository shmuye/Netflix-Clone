import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, type FC } from "react"
import Card from "./Card"

interface CarousalProps {
    title: string,
    items: Movie[]
}
const Carousal: FC<CarousalProps> = ({ items, title }) => {
    const carouselContainer = useRef<HTMLDivElement | null>(null)
    const [scrollPosition, setScrollPosition] = useState<number>(0)
    const scrollAmount: number = 320

    console.log(items)


    const handleScroll = () => {
        if (carouselContainer.current) {
            setScrollPosition(carouselContainer.current.scrollLeft)
        }
    }

    const scrollLeft = () => {
        if (carouselContainer.current) {
            const newPosition = Math.max(0, scrollPosition - scrollAmount)
            setScrollPosition(newPosition)
            carouselContainer.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            })
        }
    }

    const scrollRight = () => {
        if (carouselContainer.current) {
            const newPosition = scrollPosition + scrollAmount
            setScrollPosition(newPosition)
            carouselContainer.current.scrollTo({
                left: newPosition,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="relative ">
            <h1 className="mt-4 mb-2 text-white text-2xl font-semibold">{title}</h1>
            <div className="relative scrollbar-none">
                {scrollPosition > 0 && <button
                    className="
                    absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 cursor-pointer  
                    z-10 transition-colors duration-300  ease-in-out hover:bg-opacity-80 left-0 border-none rounded-full"
                    onClick={scrollLeft}
                >
                    <ChevronLeft />
                </button>}
                {carouselContainer.current && ((carouselContainer.current.clientWidth + scrollPosition) < carouselContainer.current.scrollWidth) && <button
                    className="
                    absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-4 cursor-pointer  
                    z-10 transition-colors duration-300  ease-in-out hover:bg-opacity-80  right-0 border-none rounded-full"
                    onClick={scrollRight}
                >
                    <ChevronRight />
                </button>}

                <div
                    ref={carouselContainer}
                    onScroll={handleScroll}
                    className="overflow-x-auto flex scroll-snap-x-mandatory scrollbar-none">

                    {
                        items?.map((item, index) => (
                            <div
                                key={index}
                                className="scroll-snap-center flex-none mr-4">
                                <Card item={item} />
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Carousal