import { useEffect, type FC } from "react"
import { tmdbApi } from "../tmdbApi"


const Home: FC = () => {

    useEffect(() => {
        const getMovie = async () => {
            const res = await tmdbApi.fetchPopularMovies()
            console.log(res.data?.results[0])
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