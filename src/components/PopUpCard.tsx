import type { FC } from "react"

interface PopUpCardProps {
    isHovered: boolean,
    x: number,
    y: number,

}

const PopupCard: FC<PopUpCardProps> = ({ isHovered, x, y }) => {
    const styles = {
        PopupCard: {
            backgroundColor: 'rgb(20,20,20)',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 2px 1px 1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0,0,0,0.12) 0px 1px 3px 0px',
            backgroundImage: "linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))",
            borderRadius: "8px",
            transformOrigin: "center",
            position: "fixed",
            width: "350px",
            zIndex: "1000",
            overFlow: "hidden"
        },

        PopupScaledDown: {
            transform: 'translate()'
        }

    }
    return (
        <div className="text-white flex flex-col z-40"
            style={ }
        >

        </div>
    )
}

export default PopUpCard