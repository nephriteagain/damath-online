import { boxPiece, piece } from "@/types/types";
import { cloneDeep,  } from "lodash";

export function checkMovablePieces(
    boardData: boxPiece[]
) : boxPiece[] {
    const boardCopy = cloneDeep(boardData).map(box => {
        if (box?.piece) {
            return {
                ...box,
                piece: {
                    ...box.piece,
                    movable: false
                }
            }
        }
        return box
    })
    const boardCopyWithNewMovables = boardCopy.map((box,index) => {
        if (box?.piece != undefined) {
            const hasJumps = movableJump(boardCopy, index, box.piece)
            if (!hasJumps) {
                movable(boardCopy, index, box.piece)
            }
        }

        return box
    })
    return boardCopyWithNewMovables
}

function movableJump(
    boardData: boxPiece[],
    index: number,
    piece: piece
) : boolean{
    let hasChanges = false

    const moveTopRight = boardData[index - 7]
    const jumpTopRight = boardData[index - 14]

    const moveTopLeft = boardData[index - 9]
    const jumpTopLeft = boardData[index - 18]

    const moveBotRight = boardData[index + 9]
    const jumpBotRight = boardData[index + 18]

    const moveBotLeft = boardData[index + 7]
    const jumpBotLeft = boardData[index + 14]

    if (
        moveTopRight?.playable && moveTopRight?.piece != undefined &&
        moveTopRight?.piece?.type != piece?.type &&
        jumpTopRight?.playable && jumpTopRight?.piece == undefined
    ) {
        piece.movable = true
        hasChanges = true
    }

    if (
        moveTopLeft?.playable && moveTopLeft?.piece != undefined &&
        moveTopLeft?.piece?.type != piece?.type &&
        jumpTopLeft?.playable && jumpTopLeft?.piece == undefined
    ) {
        piece.movable = true
        hasChanges = true
    }

    if (
        moveBotRight?.playable && moveBotRight?.piece != undefined &&
        moveBotRight?.piece?.type != piece?.type &&
        jumpBotRight?.playable && jumpBotRight?.piece == undefined
    ) {
        piece.movable = true
        hasChanges = true
    }

    if (
        moveBotLeft?.playable && moveBotLeft?.piece != undefined &&
        moveBotLeft?.piece?.type != piece?.type &&
        jumpBotLeft?.playable && jumpBotLeft?.piece == undefined
    ) {
        piece.movable = true
        hasChanges = true
    }

    return hasChanges
}

function movable(
    boardData: boxPiece[],
    index: number,
    piece: piece
) {
    if (piece.type === 'z') {
        const topRight = boardData[index - 7]
        const topLeft = boardData[index - 9]

        // is a playable area and // has no piece in it
        if (topRight?.playable && topRight?.piece == undefined) {
            piece.movable = true
        }
        if (topLeft?.playable && topLeft?.piece == undefined) {
            piece.movable = true
        }
    }
    if (piece.type === 'x') {
        const botRight = boardData[index + 9]
        const botLeft = boardData[index + 7]
        
        // is a playable area and // has no piece in it
        if (botRight?.playable && botRight?.piece == undefined) {
            piece.movable = true
        }
        if (botLeft?.playable && botLeft?.piece == undefined) {
            piece.movable = true
        }
    }
    
}

