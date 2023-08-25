import { MouseEvent, } from "react"

import { hightlightMoves } from "@/redux/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { piece, players } from "@/types/types"


interface PieceProps {
    piece: piece;
    index?: number
}



export default function Piece({piece, index}: PieceProps) {
    const {
        players, 
        playerTurn
    } = useAppSelector(state => state.game)
    const { id } = useAppSelector(state => state.user)

    const dispatch = useAppDispatch()
    
    function handleClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        dispatch(hightlightMoves({index, piece}))
    }

    const onClick = (
        piece.movable &&  
        players != undefined && 
        players[piece.type] === id &&
        playerTurn === id
    ) ? handleClick : undefined

    const { type, value, movable } = piece
    return (
        <div className={`z-10 ${type === 'z' ? 'red-piece' : 'blue-piece'}
            ${movable ? 'opacity-100' : 'opacity-70'}
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full cursor-pointer`}
            onClick={onClick}
        >
            <span className={`${(value === 6 || value === 9) && "border-t-4 border-white"}`}>
                {value}
            </span>
        </div>
    )
}