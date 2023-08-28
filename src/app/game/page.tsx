"use client"

import { useState, useEffect } from "react"


import GameArea from "@/components/GameArea"
import Rules from "@/components/Rules"
import Settings from "@/components/Settings"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { Toaster } from "@/components/ui/toaster"

import { redirect } from "next/navigation" 
import { approveRestart } from "@/redux/gameThunks/thunks"
import { db } from "@/db/firebase"
import { doc, onSnapshot, } from "firebase/firestore"
import { gameData, messageType } from "@/types/types"
import { useToast } from "@/components/ui/use-toast"
import { debounce } from "lodash"
import { playerLeft, adjustPieces } from "@/redux/gameSlice"
import { ToastAction } from "@radix-ui/react-toast"
export default function Home() {
  const [ openRules, setOpenRules ] = useState(false)
  const { id, } = useAppSelector(state => state.game)
  const { id: userId } = useAppSelector(state => state.user)
  const { toast } = useToast()  
  const dispatch = useAppDispatch()
  if (!id) {
    redirect('/')
  }

  function showRules() {
    setOpenRules((rule) => !rule)
  }

  async function handleDelay() {
    dispatch(playerLeft())
  } 
  const debounced = debounce(handleDelay, 3000) 
  const delayedDispatch = debounce(dispatch, 3000)
  // game
  useEffect(() => {
    if (!id) return
    const docRef = doc(db, 'games', id)
    const unsub = onSnapshot(docRef, snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.data() as gameData
            const { boardData, playerTurn, gameOngoing, message, gameType } = data
            // TODO handle player leaving the game
            if (!gameOngoing) {
                toast({description: 'A player had left the game.'})
                debounced()
                return
            }
            if (message?.type === messageType.REQUEST_RESTART) {
              if (message.sender === userId) {
                toast({
                  description: 'restart request sent, wait for approval',
                  duration: 2000
                })
              } else {
                toast({
                  description: 'a player is requesting a restart, click to approve',
                  duration: 3000,
                  action: <ToastAction altText="APPROVE" 
                  onClick={() => {
                    toast({
                      description: 'restart game approved, restarting game...',
                      duration: 3000
                    })
                    delayedDispatch(approveRestart({id, gameType }))}
                  }
                  >
                    APPROVE
                    </ToastAction>,
                })
              }
            }

            dispatch(adjustPieces({
                gameBoard: boardData,
                playerTurn
            }))
        }
    })
    return () => {
        console.log('unsubbed to Board')
        unsub()
    }
}, [id])

  return (
    // temporary style
    <main className="flex items-center justify-center w-[100vw] h-[100vh] relative">
      <GameArea />
      { openRules && <Rules
        openRules={openRules}
        setOpenRules={setOpenRules}
        /> }
      <Settings 
        showRules={showRules}
        />
      <Toaster />

    </main>
  )
}
