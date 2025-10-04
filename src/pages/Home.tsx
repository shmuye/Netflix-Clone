import { useEffect, type FC } from "react"
import { tmdbApi } from "../tmdbApi"


const Home: FC = () => {

    useEffect(() => {
        const getMovie = async () => {
            const res = await tmdbApi.fetchPopularMovies()
            console.log(res)
        }

        getMovie()
    }, [])
    return (
        <div>
            Home
        </div>
    )
}

export default Home