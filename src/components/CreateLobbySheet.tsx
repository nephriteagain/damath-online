import { useEffect, useRef } from "react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { createLobby } from "@/redux/userThunks/thunks"

import {
    Sheet,
    SheetTrigger,
  } from "@/components/ui/sheet"

  import LobbySheet from "./LobbySheet"

  export default function CreateLobbySheet() {
    const dataRef = useRef<HTMLDivElement>(null)

    const dispatch = useAppDispatch()
    // const id = useAppSelector(state => state.user.id)
    const {
        id,
        joinedLobby,
    } = useAppSelector(state => state.user)

    async function handleClick() {
        await dispatch(createLobby(id))
    }

    useEffect(() => {
       const el = dataRef.current as HTMLDivElement
       el.innerText = id
    }, [])

    return (
        <Sheet>
            { joinedLobby.length === 0 ?
            <SheetTrigger className="bg-green-300 px-3 py-1 text-lg font-semibold rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            onClick={handleClick}
            > 
                Create Lobby
            </SheetTrigger> :
            <SheetTrigger className="bg-orange-300 px-3 py-1 text-lg font-semibold rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            >
                Show Lobby
            </SheetTrigger>
            }
            <div className="mt-2 text-white text-sm opacity-80" ref={dataRef}>
                {/* Your ID: {id} */}
            </div>
            <LobbySheet />
        </Sheet>
    )
  }