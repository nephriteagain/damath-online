import { boxPiece, piece } from "@/types/types";
import { cloneDeep,  } from "lodash";
import { toAdd } from "./kingMoveSearch/kingMoveSearch";

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
    
    const boardCopyWithJumps = boardCopy.map((box,index) => {
        if (box?.piece != undefined) {
            if (box.piece.king) {
                kingJumpable(boardCopy, box.piece, index, -7)
                kingJumpable(boardCopy, box.piece, index, -9)
                kingJumpable(boardCopy, box.piece, index, 7)
                kingJumpable(boardCopy, box.piece, index, 9)
            }
            if (!box.piece.king) {
                movableJump(boardCopy, index, box.piece)
            }
            return box
        }
        return box
    })

    // check if there is a force jumps,
    // if there is skip checking for moves
    if (boardCopyWithJumps.some(box => box?.piece?.movable == true)) {
        return boardCopyWithJumps
    }

    const boardCopyWithMoves = boardCopy.map((box,index) => {
        if (box?.piece != undefined) {
            if (box.piece.king) {
                kingMovable(boardCopy, box.piece, index, -7)
                kingMovable(boardCopy, box.piece, index, -9)
                kingMovable(boardCopy, box.piece, index, 7)
                kingMovable(boardCopy, box.piece, index, 9)
            }
            if (!box.piece.king) {
                movable(boardCopy, index, box.piece)
            }
        }
        return box
    })
    return boardCopyWithMoves
    
}


function kingMovable(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    number: number
) {
    const numToAdd = toAdd(number)
    const move = boardData[index + number]
    if ( move?.playable && move?.piece == undefined ) {
        piece.movable = true
        kingMovable(boardData, piece, index, (number + numToAdd))
    }
}

function kingJumpable(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    number: number
) {
    const numToAdd = toAdd(number)
    
    const move = boardData[index + number]
    const jump = boardData[index + (number+numToAdd)]
    if (move?.playable && move?.piece == undefined) {
        kingJumpable(boardData, piece, (index + numToAdd), number)
    }

    if (
        move?.playable && move?.piece !== undefined &&
        move?.piece?.type !== piece?.type &&
        jump?.playable && jump?.piece == undefined
    ) {
        kingMovable(boardData, piece,  index + number, number)
    }
}

function movableJump(
    boardData: boxPiece[],
    index: number,
    piece: piece
)  {

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
    
    }

    if (
        moveTopLeft?.playable && moveTopLeft?.piece != undefined &&
        moveTopLeft?.piece?.type != piece?.type &&
        jumpTopLeft?.playable && jumpTopLeft?.piece == undefined
    ) {
        piece.movable = true    
    }

    if (
        moveBotRight?.playable && moveBotRight?.piece != undefined &&
        moveBotRight?.piece?.type != piece?.type &&
        jumpBotRight?.playable && jumpBotRight?.piece == undefined
    ) {
        piece.movable = true
    
    }

    if (
        moveBotLeft?.playable && moveBotLeft?.piece != undefined &&
        moveBotLeft?.piece?.type != piece?.type &&
        jumpBotLeft?.playable && jumpBotLeft?.piece == undefined
    ) {
        piece.movable = true
    
    }


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

