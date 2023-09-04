import { boxPiece, movablePieces } from "@/types/types";
import { cloneDeep } from "lodash";
import { movableJump } from "./checkMovablePieces";
export function getMovablePieces(
    boardData: boxPiece[],
    movablePieces: movablePieces[],
) {
    const boardCopy = cloneDeep(boardData)
    boardCopy.forEach(box => {
        if (box?.piece) {
            box.piece.movable = false
        }
    })
    const newMovablePieces : movablePieces[] = []
    movablePieces.forEach(box => {
        const { piece, index, jumpIndex, direction } = box
        movableJump(boardCopy, jumpIndex, piece, newMovablePieces, direction)
    })
    if (boardCopy.some(box => box?.piece?.movable)) {
        return getMovablePieces(boardCopy, newMovablePieces)
    }
    return boardData
}

