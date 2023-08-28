import { GameTypes } from "@/types/types";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { changeGameType } from "@/redux/userThunks/thunks";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface GameTypeProps {
    host: string;
    gameType: GameTypes;
    lobbyId: string
}

export default function GameType({host, gameType, lobbyId}: GameTypeProps) {
    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.user)

    if (host === id) return (
        <Select 
        onValueChange={ async (value) => {
            const gameType = value as GameTypes
            await dispatch(changeGameType({lobbyId, gameType}))} 
        }
        defaultValue={GameTypes.COUNTING}
    >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={gameType} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value={GameTypes.COUNTING}>COUNTING</SelectItem>
                <SelectItem value={GameTypes.WHOLE}>WHOLE</SelectItem>
                <SelectItem value={GameTypes.INTEGER}>INTEGER</SelectItem>
            </SelectContent>
    </Select>
    )

    return (
        <div className="ms-4 bg-zinc-600 w-fit text-white px-3 py-1 rounded-md shadow-md drop-shadow-md">
                 {gameType}                   
        </div>
    )
}