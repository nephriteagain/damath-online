import { MouseEvent, } from "react"

import { hightlightMoves } from "@/redux/gameSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { piece,} from "@/types/types"


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
        console.log('on click')
        e.preventDefault();
        e.stopPropagation();
        dispatch(hightlightMoves({index, piece}))
    }

    const onClick = (
        piece.moves.length > 0 &&  
        players != undefined && 
        players[piece.type] === id &&
        playerTurn === id
    ) ? handleClick : undefined

    const { type, value,  king, moves } = piece
    return (
        <div className={`z-10 ${type === 'z' ? 'red-piece' : 'blue-piece'}
            ${moves.length > 0 ? 'opacity-100 cursor-pointer' : 'opacity-70'}
            ${king ? 'border-4 border-dashed border-black' : ''}
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full`}
            onClick={onClick}
        >
            <span className={`${(value === 6 || value === 9) && "border-t-4 border-white"}`}>
                {value}
            </span>
        </div>
    )
}