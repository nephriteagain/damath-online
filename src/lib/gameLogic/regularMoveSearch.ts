import { cloneDeep } from 'lodash';
import { piece, boxPiece } from '@/types/types';
export function regularMoveSearch(
    boardData: boxPiece[],
    piece: piece,
    index: number
) : boxPiece[] {
    const boardCopy = cloneDeep(boardData).map(box => {
        if (box?.hightlighted != undefined) {
            return {
                ...box,
                hightlighted: false
            }
        }
        return box
    })

    
    const move : boxPiece[] = piece.type === 'z' ? 
        moveZ(boardCopy,  index) : 
        moveX(boardCopy,  index)

    const jump : [boxPiece[], boolean] = jumps(boardCopy, piece, index)
    const hasChanges = jump[1]
    if (hasChanges) {
        console.log('jump mode')
        return jump[0]
    }   
    console.log('move mode') 
    return move
}



function jumps(
    boardData: boxPiece[],
    piece: piece,
    index: number,
) : [boxPiece[], boolean] {
    let hasChanges = false

    const boardCopy = cloneDeep(boardData)

    const moveTopRight = boardCopy[index - 7]
    const jumpTopRight = boardCopy[index - 14]

    const moveTopLeft = boardCopy[index - 9]
    const jumpTopLeft = boardCopy[index - 18]

    const moveBotRight = boardCopy[index + 9]
    const jumpBotRight = boardCopy[index + 18]

    const moveBotLeft = boardCopy[index + 7]
    const jumpBotLeft = boardCopy[index + 14]

    if (
        moveTopRight?.playable && moveTopRight?.piece != undefined &&
        moveTopRight?.piece?.type != piece?.type &&
        jumpTopRight?.playable && jumpTopRight?.piece == undefined
    ) {
        jumpTopRight.hightlighted = true
        hasChanges = true
    }

    if (
        moveTopLeft?.playable && moveTopLeft?.piece != undefined &&
        moveTopLeft?.piece?.type != piece?.type &&
        jumpTopLeft?.playable && jumpTopLeft?.piece == undefined
    ) {
        jumpTopLeft.hightlighted = true
        hasChanges = true
    }

    if (
        moveBotRight?.playable && moveBotRight?.piece != undefined &&
        moveBotRight?.piece?.type != piece?.type &&
        jumpBotRight?.playable && jumpBotRight?.piece == undefined
    ) {
        jumpBotRight.hightlighted = true
        hasChanges = true
    }

    if (
        moveBotLeft?.playable && moveBotLeft?.piece != undefined &&
        moveBotLeft?.piece?.type != piece?.type &&
        jumpBotLeft?.playable && jumpBotLeft?.piece == undefined
    ) {
        jumpBotLeft.hightlighted = true
        hasChanges = true
    }

    // check if there is possible jump available
    // if there is, we ignore the possible moves
    


    return [boardCopy, hasChanges]
}

function moveZ(
    boardData: boxPiece[],
    index: number
) : boxPiece[] {

    const boardCopy = cloneDeep(boardData)
    const topRight = boardCopy[index - 7]
    const topLeft = boardCopy[index - 9]

    // is a playable area and // has no piece in it
    if (topRight?.playable && topRight?.piece == undefined) {
        topRight.hightlighted = true
    }
    if (topLeft?.playable && topLeft?.piece == undefined) {
        topLeft.hightlighted = true
    }
    return boardCopy
    
}

function moveX(
    boardData: boxPiece[],
    index: number
) : boxPiece[] {

    const boardCopy = cloneDeep(boardData)

    const botRight = boardCopy[index + 9]
    const botLeft = boardCopy[index + 7]
    
    // is a playable area and // has no piece in it
    if (botRight?.playable && botRight?.piece == undefined) {
        botRight.hightlighted = true
    }
    if (botLeft?.playable && botLeft?.piece == undefined) {
        botLeft.hightlighted = true
    }
    return boardCopy
}