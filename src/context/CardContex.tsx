import { createContext, useContext, useState, type FC, type ReactNode } from "react"

interface Cardstate {
    item: Movie | null,
    isHovered: boolean,
    cardId: number | null,
    position: {
        x: number, y: number
    }
}

interface cardContextType {
    cardState: Cardstate,
    setCardState: (cardstate: Cardstate) => void
}

const CardContext = createContext<cardContextType | undefined>(undefined)

export default CardProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [cardState, setCardState] = useState<Cardstate>(
        {
            item: null,
            isHovered: false,
            cardId: null,
            position: { x: -1000, y: 0 }
        }
    )
    return (
        <CardContext.Provider
            value={{ cardState, setCardState }}
        >
            {children}
        </CardContext.Provider>
    )
}

export const useCardContext = () => {

    const context = useContext(CardContext)
    if (!context) {
        throw new Error("useCardContext should be use within a CardProvider.")
    }

    return context
} 