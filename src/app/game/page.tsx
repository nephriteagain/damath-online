"use client"

import { useState, useEffect, useRef } from "react"


import GameArea from "@/components/GameArea"
import Rules from "@/components/Rules"
import Settings from "@/components/Settings"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { Toaster } from "@/components/ui/toaster"

import { redirect } from "next/navigation" 
import { approveRestart, gameOver, approveChangeGameMode } from "@/redux/gameThunks/thunks"
import { db } from "@/db/firebase"
import { doc, onSnapshot, } from "firebase/firestore"
import { gameData, messageType } from "@/types/types"
import { useToast } from "@/components/ui/use-toast"
import { debounce } from "lodash"
import { playerLeft, adjustPieces, updateScore } from "@/redux/gameSlice"
import { ToastAction } from "@radix-ui/react-toast"
import { boardStyleFlip, titleTurnChanger } from "@/lib/styleHelpers"
import { getTotalRemainingScore } from "@/lib/gameLogic/scoreHandler"
export default function Home() {
  const [ openRules, setOpenRules ] = useState(false)
  const { id, } = useAppSelector(state => state.game)
  const { id: userId } = useAppSelector(state => state.user)
  const { toast } = useToast()  
  const dispatch = useAppDispatch()

  const boardRef = useRef<HTMLDivElement>(null)


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
            const { boardData, playerTurn, gameOngoing, message, gameType, players, score } = data

            titleTurnChanger(playerTurn, userId)
            dispatch(updateScore(score))

            if (userId === players.x) {
              const board = boardRef.current as HTMLDivElement;              
              const verticalNum = document.querySelector('.vertical-num') as HTMLDivElement
              const horizontalNum = document.querySelector('.horizontal-num') as HTMLDivElement            
              boardStyleFlip(board, horizontalNum, verticalNum)
            }

            if (!boardData.some(box => box?.piece?.moves && box.piece.moves.length > 0)) {
              const totalScores = {...score}
              totalScores.x += getTotalRemainingScore('x', boardData)
              totalScores.z += getTotalRemainingScore('z', boardData)
              if (totalScores.z > totalScores.x) {
                toast({
                  description: "Red Win!"
                })
              }
              if (totalScores.z < totalScores.x) {
                toast({
                  description: "Blue Win!"
                })
              }
              else {
                toast({
                  description: "Draw!"
                })
              }
              dispatch(updateScore(totalScores))
              delayedDispatch(gameOver(data))
              return
            }

            if (!gameOngoing) {
                toast({description: 'A player had left the game.'})
                debounced()
                return
            }
            if (message?.type === messageType.APPROVE_RESTART) {
              toast({
                description: 'restart request approved, restarting game...',
                duration: 3000,
              })
            }

            if (message?.type === messageType.APPROVE_CHANGE_GAME_MODE) {
              toast({
                description: 'change game mode request approved, restarting game...',
                duration: 3000,
              })
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

            if (message?.type === messageType.REQUEST_CHANGE_GAME_MODE) {
              if (message.sender === userId) {
                toast({
                  description: 'request sent, wait for approval',
                  duration: 2000
                })
              } else {
                toast({
                  description: 'a player is requesting to change game mode, click to approve',
                  duration: 10000,
                  action: <ToastAction altText="APPROVE" 
                  onClick={() => {                    
                    dispatch(approveChangeGameMode({id, gameType: message?.data || gameType }))}
                  }
                  >
                    APPROVE
                    </ToastAction>,
                })
              }
            }

            dispatch(adjustPieces({
                gameBoard: boardData,
                playerTurn,
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
      <GameArea  ref={boardRef}/>
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
