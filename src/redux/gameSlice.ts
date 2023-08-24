import { createSlice } from "@reduxjs/toolkit";

import { COUNTING } from "@/lib/data";
import { boxPiece, GameState, action,  piece } from "@/types/types";

import { regularMoveSearch } from "@/lib/gameLogic/regularMoveSearch";
import { regularMovePiece } from "@/lib/gameLogic/regularMovePiece";
import { checkMovablePieces } from "@/lib/gameLogic/checkMovablePieces";

const initialState : GameState = {
    gameBoard: COUNTING,
    pieceToMove: null,
    pieceIndex: -1,
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
            } else {
                const newBoardData = regularMoveSearch(boardData, piece, index)
                state.gameBoard = newBoardData;
                state.pieceToMove = piece
                state.pieceIndex = index
            }
        },
        movePiece(state: GameState, action: action) {            
            
            if (state.pieceToMove !== null) {
                const index = action.payload.index as number;

                const piece = state.pieceToMove
                const boardData = state.gameBoard;
                const pieceIndex = state.pieceIndex            

                if (!piece.king) {
                    const newBoardData = regularMovePiece(boardData, piece, index, pieceIndex)
                    const boardDataWithNewMoves = checkMovablePieces(newBoardData)
                    state.gameBoard = boardDataWithNewMoves
                }
                
            }
            state.pieceToMove = null;
            state.pieceIndex = -1
        },
    }
})

export const { hightlightMoves, movePiece } = gameSlice.actions

export default gameSlice.reducer