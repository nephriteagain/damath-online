import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
  } from "@/components/ui/sheet"

import { Button } from "./ui/button"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { leaveLobby } from "@/redux/userThunks/thunks"

export default function LobbySheet() {
    const dispatch = useAppDispatch()
    const {id: userId, joinedLobby: lobbyId} = useAppSelector(state => state.user)

    return (
        <SheetContent>
        <SheetHeader>
        <SheetTitle>LOBBY</SheetTitle>
        {/* <SheetDescription>
            This action cannot be undone. This will permanently delete your account
            and remove your data from our servers.
        </SheetDescription> */}
        </SheetHeader>
        <div>Host</div>
        <div>sdasdsd</div>
        <div>Guest</div>
        <div>sdasdsd</div>
        <Button
            onClick={() => {
                dispatch(leaveLobby({userId, lobbyId}))
            }}
        >
            Leave Lobby
        </Button>
    </SheetContent>
    )
}