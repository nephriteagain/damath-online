import { boxPiece, piece } from '@/types/types';
import { cloneDeep } from 'lodash';

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
