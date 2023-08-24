import { piece, boxPiece } from '@/types/types';
export function regularMoveSearch(
    boardData: boxPiece[],
    piece: piece,
    index: number
) : boxPiece[] {
    const boardCopy = boardData.map(box => {
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
        return jump[0]
    }    
    return move
}

function jumps(
    boardData: boxPiece[],
    piece: piece,
    index: number
) : [boxPiece[], boolean] {

    const boardCopy = [...boardData]
    const topRight = boardCopy[index - 7]
    const topLeft = boardCopy[index - 9]
    const botRight = boardCopy[index + 9]
    const botLeft = boardCopy[index + 7]

    const topRightJump = boardCopy[index - 14]
    const topLeftJump = boardCopy[index - 18]
    const botRightJump = boardCopy[index + 18]
    const botLeftJump = boardCopy[index + 14]

    // check if there is possible jump available
    // if there is, we ignore the possible moves
    let hasChanges = false
    
    if (
        topRight?.playable &&
        topRight?.piece != undefined &&
        topRight?.piece?.type !== piece?.type &&
        topRightJump?.playable &&
        topRight?.piece == undefined
    ) {
        topRightJump.hightlighted = true
        hasChanges = true
    }
    if (
        topLeft?.playable &&
        topLeft?.piece != undefined &&
        topLeft?.piece?.type !== piece?.type &&
        topLeftJump?.playable &&
        topLeft?.piece == undefined
    ) {
        topLeftJump.hightlighted = true
        hasChanges = true
    }
    if (
        botRight?.playable &&
        botRight?.piece != undefined &&
        botRight?.piece?.type !== piece?.type &&
        botRightJump?.playable &&
        botRight?.piece == undefined
    ) {
        botRightJump.hightlighted = true
        hasChanges = true
    }
    if (
        botLeft?.playable &&
        botLeft?.piece != undefined &&
        botLeft?.piece?.type !== piece?.type &&
        botLeftJump?.playable &&
        botLeft?.piece == undefined
    ) {
        botLeftJump.hightlighted = true
        hasChanges = true
    }

    return [boardCopy, hasChanges]
}

function moveZ(
    boardData: boxPiece[],
    index: number
) : boxPiece[] {

    const boardCopy = [...boardData]
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

    const boardCopy = [...boardData]
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