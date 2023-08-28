import { createSlice } from "@reduxjs/toolkit";

import { COUNTING } from "@/lib/data";
import { boxPiece, GameState, action,  piece } from "@/types/types";

import { regularMoveSearch } from "@/lib/gameLogic/regularMoveSearch";
import { kingMoveSearch } from "@/lib/gameLogic/kingMoveSearch/kingMoveSearch";

import { startGame, movePiece, leaveGame, gameOver } from "./gameThunks/thunks";

const initialState : GameState = {
    gameBoard: COUNTING,
    pieceToMove: null,
    pieceIndex: -1,
    gameOngoing: false
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
                const newBoardData = kingMoveSearch(boardData, piece, index)
                state.gameBoard = newBoardData;
                state.pieceToMove = piece
                state.pieceIndex = index
            } 
            if (!piece.king) {
                const newBoardData = regularMoveSearch(boardData, piece, index)
                state.gameBoard = newBoardData;
                state.pieceToMove = piece
                state.pieceIndex = index
            }
        },
        adjustPieces(state, action: action) {
            if (action?.payload?.gameBoard) {
                state.gameBoard = action.payload?.gameBoard;
            }
            if (action?.payload?.playerTurn) {
                state.playerTurn = action.payload?.playerTurn
            }
        },
        playerLeft(state) {
            state.gameBoard = COUNTING;
            state.pieceToMove = null;
            state.pieceIndex = -1
            state.gameOngoing = false
            state.id = undefined;
            state.players = undefined;
            state.playerTurn = undefined;
            
        }
        // movePiece(state: GameState, action: action) {            
            
        //     if (state.pieceToMove !== null) {
        //         const index = action.payload.index as number;

        //         const piece = state.pieceToMove
        //         const boardData = state.gameBoard;
        //         const pieceIndex = state.pieceIndex            

        //         if (!piece.king) {
        //             const newBoardData = regularMovePiece(boardData, piece, index, pieceIndex)
        //             const boardDataWithNewMoves = checkMovablePieces(newBoardData)
        //             state.gameBoard = boardDataWithNewMoves
        //         }
                
        //     }
        //     state.pieceToMove = null;
        //     state.pieceIndex = -1
        // },
    },
    extraReducers: (builder) => {
        builder.addCase(startGame.fulfilled, (state, action) => {
            if (action.payload) {
                const { 
                    id, 
                    players, 
                    playerTurn, 
                    boardData,
                    gameOngoing 
                } = action.payload

                state.gameBoard = boardData;
                state.id = id;
                state.players = players;
                state.playerTurn = playerTurn;
                state.gameOngoing = gameOngoing
            }
        }),
        builder.addCase(movePiece.fulfilled, (state) => {
            state.pieceToMove = null;
            state.pieceIndex = -1
        }),
        builder.addCase(leaveGame.fulfilled, (state) => {
            state.gameOngoing = false
        }),
        builder.addCase(gameOver.fulfilled, (state, action) => {
            if (action.payload) {
                const {
                    id, 
                    players, 
                    playerTurn, 
                    boardData, 
                    gameOngoing 
            } = action.payload
            
                state.id = id,
                state.players = players
                state.playerTurn = playerTurn
                state.gameBoard = boardData
                state.gameOngoing = gameOngoing
            }
        })
    }
})

export const { hightlightMoves, adjustPieces, playerLeft } = gameSlice.actions

export default gameSlice.reducer