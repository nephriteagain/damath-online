import { piece } from "@/types/types"

interface PieceProps {
    piece: piece
}

export default function Piece({piece}: PieceProps) {
    const { type, value } = piece
    return (
        <div className={`z-10 ${type === 'z' ? 'red-piece' : 'blue-piece'} 
            flex items-center justify-center aspect-square w-[80%] text-2xl text-white rounded-full`}>
            <span className={`${(value === 6 || value === 9) && "border-t-4 border-white"}`}>
                {value}
            </span>
        </div>
    )
}