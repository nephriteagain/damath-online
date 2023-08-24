import { MouseEvent, } from "react"

import { piece } from "@/types/types"


interface PieceProps {
    piece: piece;
    onClick?: (e: MouseEvent) => void;
}



export default function Piece({piece, onClick}: PieceProps) {
    


    const { type, value, movable } = piece
    return (
        <div className={`z-10 ${type === 'z' ? 'red-piece' : 'blue-piece'}
            ${movable ? 'opacity-100' : 'opacity-50'}
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full cursor-pointer`}
            onClick={onClick}
        >
            <span className={`${(value === 6 || value === 9) && "border-t-4 border-white"}`}>
                {value}
            </span>
        </div>
    )
}