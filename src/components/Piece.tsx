import { MouseEvent } from "react"

import { piece } from "@/types/types"
import { useAppDispatch } from "@/redux/hooks"
import { hightlightMoves } from "@/redux/gameSlice"

interface PieceProps {
    piece: piece
}



export default function Piece({piece}: PieceProps) {
    const dispatch = useAppDispatch()

    function handleClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(hightlightMoves({}))   
    }

    const { type, value } = piece
    return (
        <div className={`z-10 ${type === 'z' ? 'red-piece' : 'blue-piece'} 
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full cursor-pointer`}
            onClick={handleClick}
        >
            <span className={`${(value === 6 || value === 9) && "border-t-4 border-white"}`}>
                {value}
            </span>
        </div>
    )
}