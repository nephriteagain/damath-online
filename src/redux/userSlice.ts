import { createSlice, } from "@reduxjs/toolkit";
import {  UserTypes } from "@/types/types";
import { createLobby, joinLobby, leaveLobby, userStartGame } from "./userThunks/thunks";

export function generateId() {
    return Math.random().toString(16).slice(2)
}

// let  savedId = localStorage.getItem('damath-id') as string
// if (!savedId) {
//     localStorage.setItem('damath-id', generateId())
//     savedId = localStorage.getItem('damath-id') as string
// }
const newId = generateId() as string

const initialState : UserTypes = {
    id: newId,
    isLoggedIn: false,
    lobbies: [],
    joinedLobby: '',
}



export const userSlice = createSlice({    
    name: 'user',
    initialState: initialState,
    reducers: {  
        getLobbies(state, action) {
            state.lobbies = action.payload
        },
        updateLobby(state, action) {
            state.lobbyData = action.payload
            if (action.payload === undefined) {
                state.joinedLobby = ''
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createLobby.fulfilled, (state,action) => {
            state.joinedLobby = action.payload?.id || ''
            state.lobbyData = action.payload
        }),
        builder.addCase(joinLobby.fulfilled, (state, action) => {
            state.joinedLobby = action.payload?.id as string
            state.lobbyData = action.payload
        }),
        builder.addCase(leaveLobby.fulfilled, (state) => {
            state.joinedLobby = ''
            state.lobbyData = undefined
        }),
        builder.addCase(userStartGame.fulfilled, (state) => {
            state = state            
        })
    }
})

export const { getLobbies, updateLobby } = userSlice.actions

export default userSlice.reducer