import Box from "./Box"
import { useAppSelector } from "@/redux/hooks"

export default function Board() {

    const boardData = useAppSelector(state => state.game.gameBoard)
    return (
        <div className="board relative w-[550px] aspect-square grid grid-cols-8 grid-rows-[8] bg-slate-100 shadow-xl drop-shadow-lg">
            {boardData.map((item,index) => {
                const { playable, piece, operation } = item
                return (
                    <Box
                        key={index}
                        playable={playable}
                        piece={piece}
                        operation={operation}
                    />
                )
            })}
            <div className="vertical-num" />
            <div className="horizontal-num" />          
        </div>
    )
}