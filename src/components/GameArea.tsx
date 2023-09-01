import Board from "./Board"
import PlayerTurnBar from "./PlayerTurnBar"
import Scores from "./Scores"
import { Ref, forwardRef } from "react"

export default forwardRef(function GameArea(props: any, ref : Ref<HTMLDivElement>) {
    return (
        <div className="">
            <PlayerTurnBar />
            <Scores />
            <Board  ref={ref} />
        </div>
    )
})