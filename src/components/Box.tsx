import { MouseEvent } from "react";

import Piece from "./Piece"
import { piece, operation } from "@/types/types";

import { useAppDispatch } from "@/redux/hooks"
import { hightlightMoves } from "@/redux/gameSlice"

import { RiAddFill, RiSubtractFill, RiCloseFill, RiDivideFill,  } from 'react-icons/ri'


interface BoxProps {
    playable: boolean;
    piece: piece|undefined;
    operation: operation|undefined;
    index: number;
    highlighted: boolean|undefined;
}


export default function Box({playable, piece, operation, index, highlighted}: BoxProps) {
    const dispatch = useAppDispatch()

    function handleClick(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('move here!')
    }

    return (
        <div className={`relative w-full aspect-square flex items-center justify-center ${highlighted? 'bg-green-300' : ''}`}
            style={playable ? {}: {background: 'linear-gradient(to top left, #111 0%, rgba(0, 0, 0, 0.80) 75%'}}
            onClick={highlighted ? handleClick : undefined}
        >
            {
                (piece != undefined && piece.movable) &&
                <Piece 
                    piece={piece}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(hightlightMoves({index, piece}))
                    }}
                /> 
            }
            {
                (piece != undefined && !piece.movable) &&
                <Piece 
                    piece={piece} 
                /> 
            }
            <div className={`absolute ${piece != undefined ? 'left-[2px] top-[2px]' : ''}`}>
                <span className={`font-semibold ${piece == undefined ? 'text-4xl' : ''}`}>
                    {operation === 'add' && <RiAddFill />}
                    {operation === 'subtract' && <RiSubtractFill />}
                    {operation === 'multiply' && <RiCloseFill />}
                    {operation === 'divide' && <RiDivideFill />}          
                </span>
            </div>
            
        </div>
    )
}