import Board from "./Board"
import PlayerTurnBar from "./PlayerTurnBar"

export default function GameArea() {
    return (
        <div className="">
            <PlayerTurnBar />
            <Board />
        </div>
    )
}