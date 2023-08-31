import { boxPiece, piece, players } from "@/types/types";
import { cloneDeep,  } from "lodash";
import { toAdd } from "./kingMoveSearch/kingMoveSearch";

/**
 * @description check the boards's each pieces their current movability
 */
export function checkMovablePieces(
    boardData: boxPiece[],
    playerToCheck: 'x'|'z',
    didCapturedAPiece: boolean
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

    let boardCopyWithJumps = boardCopy.map((box,index) => {
        if (box?.piece != undefined) {
            if (box.piece.king ) {
                kingJumpableAllDirections(boardCopy, box.piece, index)                
            }
            if (!box.piece.king ) {
                movableJump(boardCopy, index, box.piece)
            }
            return box
        }
        return box
    })
    if (didCapturedAPiece) {
        const canMultiJump = boardCopyWithJumps.some(box => box?.piece?.movable && box?.piece?.type !== playerToCheck)
        if (canMultiJump) {
            boardCopyWithJumps.map(box => {
                if (box?.piece?.type === playerToCheck) {
                    box.piece.movable = false
                    return box
                }
                return box
            })
        }
    } else {
        boardCopyWithJumps.map(box => {
            if (box?.piece && box?.piece?.type !== playerToCheck) {
                box.piece.movable = false
                return box
            }
            return box
        })
        // TODO: add force eat here
        // this has a bug, fix it
        // const movablePieces = getAllMovablePieces(boardCopyWithJumps)
        // boardCopyWithJumps = kingJumpableMultiple(boardData, movablePieces)
    }
    

    // check if there is a force jumps,
    // if there is skip checking for moves
    if (boardCopyWithJumps.some(box => box?.piece?.movable)) {
        return boardCopyWithJumps
    }

    const boardCopyWithMoves = boardCopy.map((box,index) => {
        if (box?.piece != undefined) {
            if (box.piece.king && box.piece.type === playerToCheck) {
                kingMovableAllDirections(boardCopy, box.piece, index)
            }
            if (!box.piece.king && box.piece.type === playerToCheck) {
                movable(boardCopy, index, box.piece)
            }
        }
        return box
    })
    return boardCopyWithMoves
    
}

/**
 * @description for king pieces only, check if the piece is movable
 */
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


/**
 * @description for king pieces only, if the pieces can capture another piece
 */
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

/**
 * @description invokes kingJumpable in all directions
 */
function kingJumpableAllDirections(
    boardData: boxPiece[],
    piece: piece,
    index: number,
) {
    kingJumpable(boardData, piece, index, -7)
    kingJumpable(boardData, piece, index, -9)
    kingJumpable(boardData, piece, index, 7)
    kingJumpable(boardData, piece, index, 9)
}

/**
 * @description invokes kingMovable in all directions
 */
function kingMovableAllDirections(
    boardData: boxPiece[],
    piece: piece,
    index: number,
) {
    kingMovable(boardData, piece, index, -7)
    kingMovable(boardData, piece, index, -9)
    kingMovable(boardData, piece, index, 7)
    kingMovable(boardData, piece, index, 9)
}

/**
 * @description for regular piece only, check if the piece can capture another piece
 */
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

/**
 * @description for regular pieces only, check if the piece is movable
 */
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

type MovablePieces = {
    index: number;
    piece: piece;
}

function getAllMovablePieces(
    boarData: boxPiece[]) : MovablePieces[] {
    const movablePieces : MovablePieces[] = [];
    boarData.forEach((box, index) => {
        if (box?.piece?.movable) {
            movablePieces.push({index, piece: box.piece})
        }
    })
    return movablePieces
}

/**
 * @description recursively check if there is a piece that can take
 * more than one piece, if there is, only make that piece movable.
 * this should only run when there is a change of turns
 * @example if there is one piece that can take one piece and another that can take two, 
 * only the latter piece will be movable,
 * this is according to the rules of DaMath
 * @example there are two pieces that can take potentially two piece,
 * this will make them both movable
 * @example if there is a piece that can take 1 piece,
 * and another that can take 2 piece,
 * and another that can take 3 piece,
 * only the latter will be movable
 */
function kingJumpableMultiple(
    boardData: boxPiece[],
    movablePieces: MovablePieces[],
) : boxPiece[] {
    const boardCopy = cloneDeep(boardData)
    boardCopy.forEach(box => {
        if (box?.piece?.movable) {
            box.piece.movable = false
        }
    })
    movablePieces.forEach(({index, piece}) => {
        kingJumpableAllDirections(boardCopy, piece, index)
    })
    const hasMovable = boardCopy.some(box => box?.piece?.movable)
    if (hasMovable) {
        const newMovablePieces = getAllMovablePieces(boardCopy)
        return kingJumpableMultiple(boardCopy, newMovablePieces)
    }
    return boardData
}