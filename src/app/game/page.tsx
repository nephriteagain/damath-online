"use client"

import { useState, useEffect } from "react"


import GameArea from "@/components/GameArea"
import Rules from "@/components/Rules"
import Buttons from "@/components/Settings"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { Toaster } from "@/components/ui/toaster"

import { redirect } from "next/navigation" 

import { db } from "@/db/firebase"
import { doc, onSnapshot, } from "firebase/firestore"
import { gameData } from "@/types/types"
import { useToast } from "@/components/ui/use-toast"
import { debounce } from "lodash"
import { playerLeft, adjustPieces } from "@/redux/gameSlice"
export default function Home() {
  const [ openRules, setOpenRules ] = useState(false)
  const { id } = useAppSelector(state => state.game)
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

  useEffect(() => {
    if (!id) return
    const docRef = doc(db, 'games', id)
    const unsub = onSnapshot(docRef, snapshot => {
        if (snapshot.exists()) {
            const data = snapshot.data() as gameData
            const { boardData, playerTurn, gameOngoing } = data
            // TODO handle player leaving the game
            if (!gameOngoing) {
                toast({description: 'A player had left the game.'})
                debounced()
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
      <Buttons 
        showRules={showRules}
        />
      <Toaster />

    </main>
  )
}
