import { useAppSelector } from "@/redux/hooks"

export default function PlayerTurnBar() {
    const { id } = useAppSelector(state => state.user)
    const { playerTurn } = useAppSelector(state => state.game)

    return (
        <div className="w-[550px] bg-slate-300 mb-2 text-4xl text-center font-bold rounded-se-md rounded-ss-md shadow-md drop-shadow-lg">
            {playerTurn === id ? 'Your Turn' : "Opponent's Turn"}
        </div>
    )
}