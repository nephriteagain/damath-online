
import { Button } from "./ui/button"
import ChangeGameMode from "./ChangeGameMode"
import LeaveGame from "./LeaveGame"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { requestRestart } from "@/redux/gameThunks/thunks"

interface ButtonsProps {
    showRules: () => void
}

export default function Settings({showRules}: ButtonsProps) {
    const dispatch = useAppDispatch()
    const { id: gameId } = useAppSelector(state => state.game)
    const { id: userId } = useAppSelector(state => state.user)

    return (
        <div className="absolute top-4 left-4 flex flex-col gap-4">
           
            <Button variant="default"
                className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
                onClick={showRules}
            >
                Show Rules
            </Button>
            <Button variant="destructive"
                className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
                onClick={() => dispatch(requestRestart({gameId: gameId as string, userId}))}
            >
                Restart Game
            </Button>
            <LeaveGame />
            <ChangeGameMode/>

        </div>
    )
}