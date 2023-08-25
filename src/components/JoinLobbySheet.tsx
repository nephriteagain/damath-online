import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { joinLobby } from "@/redux/userThunks/thunks"

import LobbySheet from "./LobbySheet"

interface JoinLobbySheetProps {
    lobbyId: string;
    guest: string
}

export default function JoinLobbySheet({lobbyId, guest} : JoinLobbySheetProps) {
    const dispatch = useAppDispatch()
    const {id: userId, joinedLobby} = useAppSelector(state => state.user)

    return (
        <Sheet>
            <SheetTrigger
                className="py-[0px] px-3 font-semibold text-black bg-slate-200 shadow-md drop-shadow-sm hover:bg-green-300 hover:border-green-300 active:bg-green-400 transition-all duration-200 rounded-sm disabled:opacity-50"
                disabled={guest.length > 0 || joinedLobby.length > 0}
                onClick={() => {
                    dispatch(joinLobby({
                        userId,
                        lobbyId
                    }))
                }}
            >
                JOIN
            </SheetTrigger>
            <LobbySheet />
        </Sheet>
    )
}