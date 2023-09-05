import {  GameTypes, gameData } from './../../types/types';
import { createAsyncThunk } from "@reduxjs/toolkit"
import { lobbyData } from "@/types/types"

import { COUNTING, INTEGER, WHOLE } from "@/lib/data"

import {  boxPiece,  moveArgs} from "@/types/types"


/**
 * @description creates a new document in the "games" collection
 * which will be listening to
 */
export const startGame = createAsyncThunk(
    'game/start',
    async (lobbyData: lobbyData) => {
        const { id, gameType, guest, host } = lobbyData
        const res = await fetch('/api/game/start', {
            method: 'POST',
            body: JSON.stringify({id, gameType, guest, host})
        })
        const data = await res.json()
        return data        
    }
)



/**
 * @description is the thunk that will write the new game state in the db
 */
export const movePiece = createAsyncThunk(
    'game/move',
    async (moveArgs: moveArgs) => {
        const { boardData, piece, index, pieceIndex, playerTurn , id, players, score } = moveArgs        
        const res = await fetch('/api/game/move', {
            method: 'POST',
            body: JSON.stringify({boardData, piece, index, pieceIndex, playerTurn , id, players, score})
        })
        const data = await res.json()
        return data
    }    
)

/**
 * @description will trigger the stop to the listener in the current game document
 */
export const leaveGame = createAsyncThunk(
    'game/leave',
    async (gameId: string) => {
        const res = await fetch('/api/game/leave', {
            method: 'POST',
            body: JSON.stringify({gameId})
        })
        const data = await res.json()
        return data    
    }
)


export const requestRestart = createAsyncThunk(
    'game/requestRestart',
    async (args: {userId:string, gameId: string}) => {
        const { userId, gameId} = args
        const res = await fetch('/api/game/request/restart', {
            method: 'POST',
            body: JSON.stringify({userId, gameId})
        })
        const data = await res.json()
        return data
    }
)

export const approveRestart = createAsyncThunk(
    'game/approveRestart',
    async (approveArgs : {id:string; gameType: GameTypes}) => {
        const {id, gameType} = approveArgs
        const res = await fetch('/api/game/approve/restart', {
            method: 'POST',
            body: JSON.stringify({id, gameType})
        })
        const data = await res.json()
        return data
    }
)

export const gameOver = createAsyncThunk(
    'game/gameOver',
    async (gameArgs: gameData) => {
        const { players, gameType } = gameArgs
        const res = await fetch('/api/game/gameover', {
            method: 'POST',
            body: JSON.stringify({players, gameType})
        })
        const data = await res.json()
        return data
    }
)

export const requestChangeGameMode = createAsyncThunk(
    'game/requestChangeGameMode',
    async (args: {userId:string; gameId: string; gameType: GameTypes})  => {
        const { userId, gameId, gameType } = args
        const res = await fetch('/api/game/request/gamemode', {
            method: 'POST',
            body: JSON.stringify({userId, gameId, gameType})
        })
        const data = await res.json()
        return data
    }
)

export const approveChangeGameMode = createAsyncThunk(
    'game/approveChangeGameMode',
    async (approveArgs : {id:string; gameType: GameTypes}) => {
        const { id, gameType, } = approveArgs
        const res = await fetch('/api/game/approve/gamemode', {
            method: 'POST',
            body: JSON.stringify({id, gameType})
        })
        const data = await res.json()
        return data
    }
)
