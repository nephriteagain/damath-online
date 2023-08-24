import { createSlice } from "@reduxjs/toolkit";

import { COUNTING } from "@/lib/data";
import { boxPiece, GameState, action,  piece } from "@/types/types";

import { regularMoveSearch } from "@/lib/gameLogic/regularMoveSearch";


const initialState : GameState = {
    gameBoard: COUNTING,
    pieceToMove: null,
}

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        hightlightMoves(state: GameState, action: action) {
            const index = action.payload.index as number;
            const boardData = state.gameBoard as boxPiece[];
            const piece = action.payload.piece as piece
            if (piece.king) {
                state
            } else {
                const newBoardData = regularMoveSearch(boardData, piece, index)
                state.gameBoard = newBoardData;
                state.pieceToMove = piece
            }
        },
        movePiece(state: GameState, action: action) {

        },
    }
})

export const { hightlightMoves } = gameSlice.actions

export default gameSlice.reducer