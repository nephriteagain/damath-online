import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { createLobby } from "@/redux/userThunks/thunks"

import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import LobbySheet from "./LobbySheet"

  export default function CreateLobbySheet() {
    const dispatch = useAppDispatch()
    // const id = useAppSelector(state => state.user.id)
    const {
        id,
        joinedLobby,
    } = useAppSelector(state => state.user)
    return (
        <Sheet>
            { joinedLobby.length === 0 ?
            <SheetTrigger className="bg-green-300 px-3 py-1 text-lg font-semibold rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            onClick={() => {
                dispatch(createLobby(id))
                
            }}
            > 
                Create Lobby
            </SheetTrigger> :
            <SheetTrigger className="bg-green-300 px-3 py-1 text-lg font-semibold rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            >
                Show Lobby
            </SheetTrigger>
            }
            <LobbySheet />
        </Sheet>
    )
  }