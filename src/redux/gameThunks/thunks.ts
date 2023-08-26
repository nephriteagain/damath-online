import { players } from './../../types/types';
import { db } from "@/db/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { lobbyData } from "@/types/types"

import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore"
import { COUNTING } from "@/lib/data"

import { gameData, boxPiece, piece, moveArgs} from "@/types/types"
import { movePiece as movePieceHelper } from "@/lib/gameLogic/movePiece"
import { checkMovablePieces } from "@/lib/gameLogic/checkMovablePieces"

const games = {
    'COUNTING': COUNTING
}

export const startGame = createAsyncThunk(
    'game/start',
    async (lobbyData: lobbyData) => {
        const { id, gameType, guest, host } = lobbyData
         const data = {
            id,
            players: {
                z: host,
                x: guest
            },
            playerTurn: host,
            gameType,
            boardData : games[`${gameType}`],
            gameOngoing: true,
         }
         const docRef = doc(db, 'games', id)
         await setDoc(docRef, data)
         const docSnap = await getDoc(docRef)
         if (docSnap.exists()) {
            const data = docSnap.data() as gameData
            return data
         }
    }
)



export const movePiece = createAsyncThunk(
    'game/move',
    async (moveArgs: moveArgs) => {
        const { boardData, piece, index, pieceIndex, nextTurn, id, players } = moveArgs
        const docRef = doc(db, 'games', id)

        const newBoardData = movePieceHelper(boardData, piece, index, pieceIndex)
        const playerToCheck = players.x === nextTurn ? 'x' : 'z'
        const boardDataWithNewMoves = checkMovablePieces(newBoardData, playerToCheck)
        await updateDoc(docRef, {
            playerTurn: nextTurn,
            boardData: boardDataWithNewMoves
        })
        return
    }    
)

export const leaveGame = createAsyncThunk(
    'game/leave',
    async (gameId: string) => {
        const docRef = doc(db, 'games', gameId)
        try {
            await updateDoc(docRef, {
                gameOngoing: false
            })
        } catch (error) {
            console.error(error)
        }
        
    }
)