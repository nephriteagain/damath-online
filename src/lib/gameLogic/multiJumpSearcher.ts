import { boxPiece, movablePieces } from "@/types/types";
import { cloneDeep } from "lodash";
import { movableJump, kingJumpable } from "./checkMovablePieces";
export function getMovablePieces(
    boardData: boxPiece[],
    movablePieces: movablePieces[],
) {
    const boardCopy = cloneDeep(boardData)
    boardCopy.forEach(box => {
        if (box?.piece) {
            box.piece.moves = []
        }
    })
    const newMovablePieces : movablePieces[] = []
    movablePieces.forEach(box => {
        const { piece, index, jumpIndex, direction } = box
        if (!piece.king) {
            movableJump(boardCopy, jumpIndex, piece, newMovablePieces, direction)            
        }
        if (piece.king) {
            direction !== 'bot left' && kingJumpable(boardData, piece, index, -7, newMovablePieces)
            direction !== 'bot right' && kingJumpable(boardData, piece, index, -9, newMovablePieces)
            direction !== 'top right' && kingJumpable(boardData, piece, index, 7, newMovablePieces)
            direction !== 'top left' && kingJumpable(boardData, piece, index, 9, newMovablePieces)
        }
    })
    if (boardCopy.some(box => box?.piece?.moves && box.piece.moves.length > 0)) {
        return getMovablePieces(boardCopy, newMovablePieces)
    }
    return boardData
}

