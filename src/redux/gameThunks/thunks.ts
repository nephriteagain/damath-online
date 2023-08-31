import { players, message, messageType, GameTypes, gameData } from './../../types/types';
import { db } from "@/db/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { lobbyData } from "@/types/types"

import { setDoc, doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore"
import { COUNTING, INTEGER, WHOLE } from "@/lib/data"

import {  boxPiece, piece, moveArgs} from "@/types/types"
import { movePiece as movePieceHelper } from "@/lib/gameLogic/movePiece"
import { checkMovablePieces } from "@/lib/gameLogic/checkMovablePieces"
import { generateId } from '../userSlice';
const games = {
    'COUNTING': COUNTING,
    'WHOLE': WHOLE,
    'INTEGER': INTEGER,
}

/**
 * @description creates a new document in the "games" collection
 * which will be listening to
 */
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

/**
 * @description count all the pieces currently on the param board
 */
function pieceCount(board: boxPiece[]) : number {
    let count = 0
    board.forEach(box => {
        if (box?.piece) {
            count++
        }
    })
    return count
}

/**
 * @description is the thunk that will write the new game state in the db
 */
export const movePiece = createAsyncThunk(
    'game/move',
    async (moveArgs: moveArgs) => {
        const { boardData, piece, index, pieceIndex, playerTurn , id, players } = moveArgs
        const docRef = doc(db, 'games', id)
        let nextTurn = playerTurn === players?.x ? players?.z : players?.x


        const newBoardData = movePieceHelper(boardData, piece, index, pieceIndex)
        const playerToCheck = players.x === nextTurn ? 'x' : 'z'

        const didCapturedAPiece = pieceCount(boardData) > pieceCount(newBoardData)
        console.log(didCapturedAPiece, 'didcaptureapiece')
        const boardDataWithNewMoves = checkMovablePieces(newBoardData, playerToCheck, didCapturedAPiece)
        const canMultiJump = boardDataWithNewMoves.some(box => box?.piece?.movable && box?.piece?.type !== playerToCheck)
        if (canMultiJump && didCapturedAPiece) {
            console.log('can multi jump')
            nextTurn = playerTurn === players?.z ? players?.z : players?.x
        }
        await updateDoc(docRef, {
            playerTurn: nextTurn,
            boardData: boardDataWithNewMoves
        })
        return
    }    
)

/**
 * @description will trigger the stop to the listener in the current game document
 */
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
    async (approveArgs : {id:string; gameType: GameTypes}) => {
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

export const requestChangeGameMode = createAsyncThunk(
    'game/requestChangeGameMode',
    async (args: {userId:string; gameId: string; gameType: GameTypes})  => {
        const { userId, gameId, gameType } = args
        const docRef = doc(db, 'games', gameId)
        try {
            await updateDoc(docRef, {
                message: {
                    type: messageType.REQUEST_CHANGE_GAME_MODE,
                    sender: userId,
                    data: gameType
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
)

export const approveChangeGameMode = createAsyncThunk(
    'game/approveChangeGameMode',
    async (approveArgs : {id:string; gameType: GameTypes}) => {
        const { id, gameType, } = approveArgs
        const docRef = doc(db, 'games', id)
        await updateDoc(docRef, {
            boardData : games[`${gameType}`],   
            message: {}
        })
    }
)
