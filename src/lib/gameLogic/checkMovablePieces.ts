import { boxPiece, movablePieces, piece, players } from "@/types/types";
import { cloneDeep,  } from "lodash";
import { toAdd } from "./kingMoveSearch/kingMoveSearch";
import { getMovablePieces } from "./multiJumpSearcher";
/**
 * @description check the boards's each pieces their current movability
 */
export function checkMovablePieces(
    boardData: boxPiece[],
    playerToCheck: 'x'|'z',
    didCapturedAPiece: boolean,
    piece: piece
) : boxPiece[] {
    const boardCopy = cloneDeep(boardData).map(box => {
        if (box?.piece) {
            return {
                ...box,
                piece: {
                    ...box.piece,
                    moves: []
                }
            }
        }
        return box
    })
    let movablePieces : movablePieces[] = []

    let boardCopyWithJumps = boardCopy.map((box,index) => {
        if (box?.piece != undefined) {
            if (box.piece.king ) {
                kingJumpableAllDirections(boardCopy, box.piece, index, movablePieces)                
            }
            if (!box.piece.king ) {
                movableJump(boardCopy, index, box.piece, movablePieces)
            }
            return box
        }
        return box
    })
    if (didCapturedAPiece) {
        const canMultiJump = boardCopyWithJumps.some(box => box?.piece?.moves && box.piece.moves.length > 0 && box?.piece?.type !== playerToCheck && box?.piece?.value === piece.value)
        if (canMultiJump) {
            boardCopyWithJumps.map(box => {
                if (box?.piece?.type === playerToCheck) {
                    box.piece.moves = []
                    return box
                }
                return box
            })
            if (boardCopyWithJumps.some(box => box?.piece?.moves && box.piece.moves.length > 0)) {
                return boardCopyWithJumps
            }
        }
    } else {
        boardCopyWithJumps.map(box => {
            if (box?.piece && box?.piece?.type !== playerToCheck) {
                box.piece.moves = []
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
    if (boardCopyWithJumps.some(box => box?.piece?.moves && box.piece.moves.length > 0)) {
        // boardCopyWithJumps = getMovablePieces(boardCopyWithJumps, movablePieces)
        return boardCopyWithJumps
    }

    const boardCopyWithMoves = boardCopy.map((box,index) => {
        if (box?.piece != undefined) {
            if (box.piece.king && box.piece.type === playerToCheck) {
                kingMovableAllDirections(boardCopy, box.piece, index,)
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
 * 
 * @param boardData game board
 * @description checks if there is a pawn to be promoted
 */
export function kingPromoter(boardData: boxPiece[]) {
    boardData.forEach((box) => {
        if (box?.piece?.type === 'z') {
            if (!box.piece.king && box.y === 7) {
                box.piece.king = true
            }
        }
        if (box?.piece?.type === 'x') {
            if (!box.piece.king && box.y === 0) {
                box.piece.king = true
            }
        }
    })
}

/**
 * @description for king pieces only, check if the piece is movable
 */
function kingMovable(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    number: number,
    movableArr?: movablePieces[],
) {
    const numToAdd = toAdd(number)
    const move = boardData[index + number]
    if ( move?.playable && move?.piece == undefined ) {
        piece.moves.push(index+number)
        if (movableArr) {
            const p = boardData.find(box => box?.piece?.type === piece?.type && box?.piece?.value === piece?.value) as boxPiece
            const newIndex = boardData.indexOf(p) as number
            const direction = getDirection(number)
            movableArr.push({
                piece,
                index: newIndex,
                jumpIndex: index + number,
                direction: direction
            })
        }
        kingMovable(boardData, piece, index, (number + numToAdd), movableArr, )
    }
}

function getDirection(numDir: number) {
    if (numDir === -7) {
        return 'top right'
    }
    if (numDir === -9) {
        return 'top left'
    }
    if (numDir === 9) {
        return 'bot right'
    }
    return 'bot left'
}

/**
 * @description for king pieces only, if the pieces can capture another piece
 */
export function kingJumpable(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    number: number,
    movableArr?: movablePieces[],
) {
    const numToAdd = toAdd(number)
    
    const move = boardData[index + number]
    const jump = boardData[index + (number+numToAdd)]
    if (move?.playable && move?.piece == undefined) {
        kingJumpable(boardData, piece, (index + numToAdd), number, movableArr, )
    }

    if (
        move?.playable && move?.piece !== undefined &&
        move?.piece?.type !== piece?.type &&
        jump?.playable && jump?.piece == undefined
    ) {
        kingMovable(boardData, piece,  index + number, number, movableArr, )
    }
}

/**
 * @description invokes kingJumpable in all directions
 */
function kingJumpableAllDirections(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    movableArr?: movablePieces[]
) {
    kingJumpable(boardData, piece, index, -7, movableArr)
    kingJumpable(boardData, piece, index, -9, movableArr)
    kingJumpable(boardData, piece, index, 7, movableArr)
    kingJumpable(boardData, piece, index, 9, movableArr)
}

/**
 * @description invokes kingMovable in all directions
 */
function kingMovableAllDirections(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    movableArr?: movablePieces[]
) {
    kingMovable(boardData, piece, index, -7, movableArr)
    kingMovable(boardData, piece, index, -9, movableArr)
    kingMovable(boardData, piece, index, 7, movableArr)
    kingMovable(boardData, piece, index, 9, movableArr)
}

/**
 * @description for regular piece only, check if the piece can capture another piece
 */
export function movableJump(
    boardData: boxPiece[],
    index: number,
    piece: piece,
    movableArr?: movablePieces[],
    direction?: 'top right'|'top left'|'bot right'|'bot left',
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
        jumpTopRight?.playable && jumpTopRight?.piece == undefined &&
        direction !== 'bot left'
    ) {
        piece.moves.push(index-14)
        movableArr && movableArr.push({
            piece, index, direction: 'top right', jumpIndex: index-14
        })
    }

    if (
        moveTopLeft?.playable && moveTopLeft?.piece != undefined &&
        moveTopLeft?.piece?.type != piece?.type &&
        jumpTopLeft?.playable && jumpTopLeft?.piece == undefined &&
        direction !== 'bot right'
        
    ) {
        piece.moves.push(index-18)
        movableArr && movableArr.push({
            piece, index, direction: 'top left', jumpIndex: index-18
        })
    }

    if (
        moveBotRight?.playable && moveBotRight?.piece != undefined &&
        moveBotRight?.piece?.type != piece?.type &&
        jumpBotRight?.playable && jumpBotRight?.piece == undefined &&
        direction !== 'top left'

    ) {
        piece.moves.push(index+18)
        movableArr && movableArr.push({
            piece, index, direction: 'bot right', jumpIndex: index+18
        })
    }

    if (
        moveBotLeft?.playable && moveBotLeft?.piece != undefined &&
        moveBotLeft?.piece?.type != piece?.type &&
        jumpBotLeft?.playable && jumpBotLeft?.piece == undefined &&
        direction !== 'top right'
        
    ) {
        piece.moves.push(index+14)
        movableArr && movableArr.push({
            piece, index, direction: 'bot left', jumpIndex: index+14
        })
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
            piece.moves.push(index-7)
        }
        if (topLeft?.playable && topLeft?.piece == undefined) {
            piece.moves.push(index-9)

        }
    }
    if (piece.type === 'x') {
        const botRight = boardData[index + 9]
        const botLeft = boardData[index + 7]
        
        // is a playable area and // has no piece in it
        if (botRight?.playable && botRight?.piece == undefined) {
            piece.moves.push(index+9)
        }
        if (botLeft?.playable && botLeft?.piece == undefined) {
            piece.moves.push(index+7)
        }
    }
    
}
