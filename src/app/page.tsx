"use client"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/toaster"
import Lobby from "@/components/Lobby"
import { collection, onSnapshot, doc } from "firebase/firestore"
import { db } from "@/db/firebase"
import { lobbyData, lobbyDataDb } from "@/types/types"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { getLobbies, updateLobby } from "@/redux/userSlice"
import { leaveLobby } from "@/redux/userThunks/thunks"
import { startGame } from "@/redux/gameThunks/thunks"
import { useToast } from "@/components/ui/use-toast"
import { debounce } from "lodash"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { toast } = useToast()

  const {id: userId, joinedLobby: lobbyId, lobbyData} = useAppSelector(state => state.user)

  async function gameStartHandler(lobbyData: lobbyData) {
    try {
        await dispatch(startGame(lobbyData))
        dispatch(updateLobby(undefined))
        router.push('/game')
        await dispatch(leaveLobby({userId, lobbyId}))
    } catch (error) {
        console.error(error)   
    }
    
}   

  const debouncedGameStartHandler = debounce(gameStartHandler, 2000)


  useEffect(() => {
    const colRef = collection(db, 'lobbies')
    const unsub = onSnapshot(colRef, (querySnapshot) => {
        const lobbyList : lobbyData[] = [];
        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                const data = doc.data()
                const lobbyData = {...data, id: doc.id} as lobbyData
                lobbyList.push(lobbyData)

            }
        })
        dispatch(getLobbies(lobbyList))
    })
    return () => {
        console.log('unsubbed to Lobbies')
        unsub()
    }

}, [])

useEffect(() => {
  if (!lobbyId) return
  const docRef = doc(db, 'lobbies', lobbyId)
  const unsub = onSnapshot(docRef, (querySnapshot) => {
      if (querySnapshot.exists()) {
          const data = querySnapshot.data() as lobbyDataDb;
          const id = querySnapshot.id;
          const newLobbyData = {...data, id}

          if (data.start) {
              toast({title: 'Game Starting...'})
              debouncedGameStartHandler(newLobbyData)
              return
          }

          dispatch(updateLobby(newLobbyData))
          return
      }
      dispatch(updateLobby(undefined))
  })
  return () => {
      console.log('unsubbed to Lobby')
      unsub()
  }
}, [lobbyId])

  return (
    <main className="flex items-center justify-center w-[100vw] h-[100vh] relative">
      <Lobby />
      <Toaster />
    </main>
  )
}
