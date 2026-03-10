import { createContext, type FC, type ReactNode, useContext, useState } from "react";

interface CardState {
  item: Movie | null;
  isHovered: boolean;
  cardId: number | null;
  postion?: { x: number; y: number };
}

interface CardContextType {
  cardState: CardState;
  setCardState: (state: CardState) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const CardProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [cardState, setCardState] = useState<CardState>({
    item: null,
    isHovered: false,
    cardId: null,
    postion: { x: -1000, y: 0 },
  });

  return (
    <CardContext.Provider value={{ cardState, setCardState }}>
      {children}
    </CardContext.Provider>
  );
};

export const useCardContext = () => {
  const context = useContext(CardContext);

  if (!context) {
    throw new Error("useCardContext must be used within a CardProvider");
  }

  return context;
};
