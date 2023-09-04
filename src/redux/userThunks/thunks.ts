import { db } from "@/db/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { addDoc, doc, collection, updateDoc, getDoc, deleteDoc,  } from "firebase/firestore"

import { GameTypes, lobbyDataDb } from "@/types/types"

export const createLobby = createAsyncThunk(
    'user/createLobby',
    async (userId: string) => {
        const res = await fetch('/api/user/createlobby',{
            method: 'POST',
            body: JSON.stringify({userId})                            
        })
        const data = await res.json()
        return data
    }
)

export const changeGameType = createAsyncThunk(
    'user/changeGameType',
    async ({ lobbyId, gameType }: {lobbyId: string; gameType: GameTypes}) => {
        const res = await fetch('/api/user/gametype', {
            method: 'POST',
            body: JSON.stringify({lobbyId, gameType})
        })
        const data = await res.json()
        return data
    }
)

type LobbyArgs = {
    userId: string,
    lobbyId: string,
    gameType?: string,
}


export const joinLobby = createAsyncThunk(
    'user/joinLobby',
    async (args: LobbyArgs) => {
        const {userId, lobbyId} = args
        const res = await fetch('/api/user/joinlobby', {
            method: 'POST',
            body: JSON.stringify({userId, lobbyId})
        })
        const data = await res.json()
        return data
    }
)


export const leaveLobby = createAsyncThunk(
    'user/leaveLobby',
    async (args: LobbyArgs) => {
        const {userId, lobbyId} = args
        const res = await fetch('/api/user/leavelobby', {
            method: 'POST',
            body: JSON.stringify({userId, lobbyId})
        })
        const data = await res.json()
        return data
    }
)


export const userStartGame = createAsyncThunk(
    'user/startGame',
    async (lobbyId: string) => {
        const res = await fetch('/api/user/startgame', {
            method: 'POST',
            body: JSON.stringify({lobbyId})
        })
        const data = await res.json()
        return data
    }
)