import { db } from "@/db/firebase"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { addDoc, doc, collection, updateDoc, getDoc, deleteDoc,  } from "firebase/firestore"

import { lobbyDataDb } from "@/types/types"

export const createLobby = createAsyncThunk(
    'user/createLobby',
    async (userId: string) => {
        const colRef = await addDoc(collection(db, 'lobbies'), {
            gameType: 'COUNTING',
            host: userId,
            guest: '',
            start: false
        })
        const docRef = doc(db, 'lobbies', colRef.id)
        const lobbyData = await getDoc(docRef)
        if (lobbyData.exists()) {
            const id = lobbyData.id as string
            const data = lobbyData.data() as lobbyDataDb
            return {id,...data}
        }
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
        console.log(userId, lobbyId)
        const docRef = doc(db, 'lobbies', lobbyId)
        await updateDoc(docRef, {
            guest: userId
        })
        const lobbyData = await getDoc(docRef)
        if (lobbyData.exists()) {
            const id = lobbyData.id as string
            const data = lobbyData.data() as lobbyDataDb
            return {id,...data}
        }
    }
)


export const leaveLobby = createAsyncThunk(
    'user/leaveLobby',
    async (args: LobbyArgs) => {
        await leave(args)
    }
)

async function leave(args: LobbyArgs) {
    const {userId, lobbyId} =  args
    const docRef = doc(db, 'lobbies', lobbyId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
        const data = docSnap.data() as lobbyDataDb
        const { guest, host } = data
        if (guest === userId) {
            await updateDoc(docRef, {
                guest: ''
            })
            return
        }
        else if (host === userId) {
            await deleteDoc(docRef)
            return
        }
        
    }    
}

export const userStartGame = createAsyncThunk(
    'user/startGame',
    async (lobbyId: string) => {
        const docRef = doc(db, 'lobbies', lobbyId);
        await updateDoc(docRef, {
            start: true
        })
        return
    }
)