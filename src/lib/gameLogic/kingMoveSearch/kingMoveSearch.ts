import { boxPiece, piece } from '@/types/types';
import { cloneDeep } from 'lodash';

/**
 * @description for king pieces only, checks all the available moves or jump the selected piece can make
 */
export function kingMoveSearch(
    boardData: boxPiece[],
    piece: piece,
    index: number
) {
    const boardCopy = cloneDeep(boardData).map(box => {
        if (box?.hightlighted != undefined) {
            return {
                ...box,
                hightlighted: false
            }
        }
        return box
    })
    kingJump(boardCopy, piece, index, -7)
    kingJump(boardCopy, piece, index, -9)
    kingJump(boardCopy, piece, index, 7)
    kingJump(boardCopy, piece, index, 9)

    if (!boardCopy.some(box => box?.hightlighted)) {
        kingMove(boardCopy, index, -7)
        kingMove(boardCopy, index, -9)
        kingMove(boardCopy, index, 7)
        kingMove(boardCopy, index, 9)
    }
    return boardCopy
}

/**
 * @description helper function for move searching, determines the direction of the move or jump,
 * @description divisible by -7 is top right
 * @description divisible by -9 is top left,
 * @description divisible by 7 is bot left
 * @description divisible by 9 is bot right
 */
export function toAdd(number:number) : number {
    if (number % 7 === 0) {
        if (number > 0) {
            return 7
        } else {
            return -7
        }
    }
    if (number > 0) {
        return 9
    } else {
        return -9
    }
}

/**
 * @description for king pieces, checks all the available moves a piece can make
 */
function kingMove(
    boardData: boxPiece[],
    index: number,
    number: number
) {
    const numToAdd = toAdd(number)

    
    const move = boardData[index + number]
    if ( move?.playable && move?.piece == undefined ) {
        move.hightlighted = true
        kingMove(boardData, index, (number + numToAdd))
    }
}

/**
 * @description for king pieces, checks all the available jumps a piece can make
 */
function kingJump(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    number: number
) {
    const numToAdd = toAdd(number)

    
    const move = boardData[index + number]
    const jump = boardData[index + (number+numToAdd)]
    if (move?.playable && move?.piece == undefined) {
        kingJump(boardData, piece, (index + numToAdd), number)
    }

    if (
        move?.playable && move?.piece !== undefined &&
        move?.piece?.type !== piece?.type &&
        jump?.playable && jump?.piece == undefined
    ) {
        kingMove(boardData, index + number, number)
    }
}
