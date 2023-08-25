import { createSlice, } from "@reduxjs/toolkit";
import {  UserTypes } from "@/types/types";
import { createLobby, joinLobby, leaveLobby } from "./userThunks/thunks";

function generateId() {
    return Math.random().toString(16).slice(2)
}

const initialState : UserTypes = {
    id: generateId(),
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
        })
    }
})

export const { getLobbies, updateLobby } = userSlice.actions

export default userSlice.reducer