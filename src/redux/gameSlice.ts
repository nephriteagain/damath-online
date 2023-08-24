import { createSlice } from "@reduxjs/toolkit";

import { COUNTING } from "@/lib/data";
import { boxPiece } from "@/types/types";

interface GameState {
    gameBoard: boxPiece[];
}

const initialState : GameState = {
    gameBoard: COUNTING
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        hightlightMoves(state, action) {
            console.log('highlight moves')
        },
        movePiece() {},
    }
})

export const { hightlightMoves } = gameSlice.actions

export default gameSlice.reducer