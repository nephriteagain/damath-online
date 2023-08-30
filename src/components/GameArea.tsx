import Board from "./Board"
import PlayerTurnBar from "./PlayerTurnBar"
import { Ref, forwardRef } from "react"


export default forwardRef(function GameArea(props: any, ref : Ref<HTMLDivElement>) {
    return (
        <div className="">
            <PlayerTurnBar />
            <Board  ref={ref} />
        </div>
    )
})