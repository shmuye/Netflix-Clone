import React, { type FC } from "react";
import { useCardContext } from "../context/CardContex";


interface CardProps {
  item: Movie;
}

const Card: FC<CardProps> = ({ item }) => {
  const { cardState, setCardState } = useCardContext();

  const handleHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (cardState.cardId == item.id && cardState.isHovered) {
      return;
    }

    const cardElement = e.currentTarget as HTMLElement;
    const cardRect = cardElement.getBoundingClientRect();

    setCardState({
      item,
      isHovered: true,
      cardId: item.id,
      postion: { x: cardRect.left + cardRect.width / 2, y: cardRect.top },
    });
  };

  return (
    <div
      className="cursor-pointer text-white opacity-100 pointer-events-auto relative sm:w-56 w-36"
      onMouseEnter={handleHover}
      role="presentation"
    >
      <img
        src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
        alt={item.title}
        className="w-full block h-auto"
      />
    </div>
  );
};

export default Card;
