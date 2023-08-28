import { players, message, messageType, GameTypes, gameData } from './../../types/types';
import { db } from "@/db/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { lobbyData } from "@/types/types"

import { setDoc, doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore"
import { COUNTING } from "@/lib/data"

import {  boxPiece, piece, moveArgs} from "@/types/types"
import { movePiece as movePieceHelper } from "@/lib/gameLogic/movePiece"
import { checkMovablePieces } from "@/lib/gameLogic/checkMovablePieces"
import { generateId } from '../userSlice';
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

export const requestRestart = createAsyncThunk(
    'game/requestRestart',
    async (args: {userId:string, gameId: string}) => {
        const { userId, gameId} = args
        const docRef = doc(db, 'games', gameId)
        try {
            await updateDoc(docRef, {
                message: {
                    type: messageType.REQUEST_RESTART,
                    sender: userId
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
)

export const approveRestart = createAsyncThunk(
    'game/approveRestart',
    async (approveArgs : {id:string; gameType: GameTypes.COUNTING}) => {
        const { id, gameType, } = approveArgs
        const docRef = doc(db, 'games', id)
        await updateDoc(docRef, {
            boardData : games[`${gameType}`],   
            message: {}
        })
    }
)

export const gameOver = createAsyncThunk(
    'game/gameOver',
    async (gameArgs: gameData) => {
        const { players, gameType } = gameArgs
        const id = generateId()
        const docRef = doc(db, 'games', id)
        try {
            await setDoc(docRef, {
                id,
                players: {
                    z: players.x,
                    x: players.z
                },
                playerTurn: players.z,
                gameType,
                boardData : games[`${gameType}`],
                gameOngoing: true,            
            })
            const response = await getDoc(docRef)
            if (!response.exists()) {
                throw new Error('data does not exist')
            }
            return response.data()
        } catch (error) {
            console.error(error)
        }
        
    }
)