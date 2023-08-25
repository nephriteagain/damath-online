import { useEffect } from "react"
import { useRouter } from "next/navigation"

import {
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"


import { db } from "@/db/firebase"
import { onSnapshot, doc, } from "firebase/firestore"

import { updateLobby } from "@/redux/userSlice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { leaveLobby } from "@/redux/userThunks/thunks"
import { userStartGame } from "@/redux/userThunks/thunks"
import { startGame } from "@/redux/gameThunks/thunks"

import { lobbyDataDb } from "@/types/types"

export default function LobbySheet() {
    const router = useRouter()

    const dispatch = useAppDispatch()
    const {id: userId, joinedLobby: lobbyId, lobbyData} = useAppSelector(state => state.user)

    useEffect(() => {
        if (!lobbyData) return
        const docRef = doc(db, 'lobbies', lobbyId)
        const unsub = onSnapshot(docRef, (querySnapshot) => {
            if (querySnapshot.exists()) {
                const data = querySnapshot.data() as lobbyDataDb;
                const id = querySnapshot.id;
                const lobbyData = {...data, id}

                if (data.start) {
                    // TODO : dont forget to delete the old db
                    dispatch(startGame(lobbyData))
                    dispatch(leaveLobby({userId, lobbyId}))
                    dispatch(updateLobby(undefined))
                    router.push('/game')
                    return
                }

                dispatch(updateLobby(lobbyData))
                return
            }
            dispatch(updateLobby(undefined))
        })
        return () => unsub()
    }, [lobbyData])

    return (
        <SheetContent className="bg-slate-300">
        <SheetHeader>
        <SheetTitle className="text-center font-bold text-2xl mb-4">
            LOBBY
        </SheetTitle>
        </SheetHeader>
        {lobbyData != undefined && <div className="mb-4">
            <div className="mb-4">
                <div className="font-semibold text-xl mb-2">TYPE</div>
                <div className="ms-4 bg-zinc-600 w-fit text-white px-3 py-1 rounded-md shadow-md drop-shadow-md">{lobbyData.gameType}</div>
            </div>
            <div className="mb-4">
                <div className="font-semibold text-xl mb-2">HOST</div>
                <div className="ms-4 bg-zinc-600 w-fit text-white px-3 py-1 rounded-md shadow-md drop-shadow-md">{lobbyData.host}</div>
            </div>
            <div className="mb-4">
                <div className="font-semibold text-xl mb-2">GUEST</div>
                <div className="ms-4 bg-zinc-600 w-fit text-white px-3 py-1 rounded-md shadow-md drop-shadow-md">{lobbyData.guest || 'EMPTY'}</div>
            </div>                        
        </div>}
        <div className="flex flex-row justify-between mt-4">            
              { userId === lobbyData?.host &&
                <SheetClose
                className="bg-green-300 px-3 py-1 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-green-700 hover:text-white active:scale-100 transition-all duration-150 disabled:opacity-50"
                disabled={lobbyData.guest.length === 0}
                onClick={() => dispatch(userStartGame(lobbyId))}
            >
                Start Game
            </SheetClose>}
            <SheetClose
                className="bg-red-300 px-3 py-1 rounded-md shadow-md drop-shadow-md hover:scale-105 hover:bg-red-700 hover:text-white active:scale-100 transition-all duration-150"
                onClick={() => {
                    dispatch(leaveLobby({userId, lobbyId}))
                }}
            >
                Leave Lobby
            </SheetClose>
        </div>
       
    </SheetContent>
    )
}