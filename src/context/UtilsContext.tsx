import { createContext, type FC, type ReactNode, useContext, useState } from "react";
import { useCardContext } from "./CardContex";


interface UtilsContextType {
  addToFavoriteList: (movie: Movie) => void;
  movieList: Movie[];
  randomDuration: () => string;
}

const UtilsContext = createContext<UtilsContextType | null>(null);

export const UtilsProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [movieList, setMovieList] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("movieList") || "[]")
  );

  const { cardState, setCardState } = useCardContext();

  const addToFavoriteList = (movie: Movie) => {
    let list = localStorage.getItem("movieList");

    if (list) {
      try {
        const parsedList = JSON.parse(list) as Movie[];

        setMovieList(parsedList);

        const exists = parsedList.some((item: Movie) => item.id === movie.id);

        if (exists) {
          const newMovieList = parsedList.filter(
            (item: Movie) => item.id !== movie.id
          );
          setMovieList(newMovieList);
          localStorage.setItem("movieList", JSON.stringify(newMovieList));
          setCardState({
  ...cardState, // get current state
  isHovered: false,
  item: null,
  cardId: null,
});
          return;
        }
      } catch (error) {
        localStorage.removeItem("movieList");
        setMovieList([]);
      }
    }

    const newMovieList = [...movieList, movie];

    setMovieList(newMovieList);

    try {
      localStorage.setItem("movieList", JSON.stringify(newMovieList));
    } catch (error) {
      console.error("Error Saving to Local Storage:", error);
    }
  };

  const randomDuration = () => {
    const randomMins = Math.floor(Math.random() * (200 - 60 + 1)) + 60;

    const hrs = Math.floor(randomMins / 60);
    const mins = randomMins % 60;

    return `${hrs}h ${mins}m`;
  };

  return (
    <UtilsContext.Provider
      value={{ addToFavoriteList, movieList, randomDuration }}
    >
      {children}
    </UtilsContext.Provider>
  );
};

export const useUtilsContext = (): UtilsContextType => {
  const context = useContext(UtilsContext);

  if (!context) {
    throw new Error("useUtilsContext must be used within a UtilsProvider");
  }

  return context;
};
