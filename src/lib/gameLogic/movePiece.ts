import { cloneDeep } from 'lodash';
import { boxPiece, piece } from "@/types/types";

import { POSSIBLEJUMPS } from '../data';

/**
 * @description moves the selected piece to its new position
 */
export function movePiece(
    boardData: boxPiece[],
    piece: piece, 
    index:number,
    pieceIndex: number
) : boxPiece[] {
    const boardCopy = cloneDeep(boardData).map((box,idx) => {
        if (idx === pieceIndex) {
            const copy = box
            delete copy.piece
            return copy
        }
        if (idx === index) {
            return {
                ...box,
                piece,
                hightlighted: false
            }
        }
        if (box.hightlighted) {
            return {
                ...box,
                hightlighted: false
            }
        }

        return box
    })
    if (piece.king) {
        const boardCopyWithoutCaptured = removeCapturedAsKing(boardCopy, index, pieceIndex)
        return boardCopyWithoutCaptured
    }
    const boardCopyWithoutCaptured = removeCaptured(boardCopy, index, pieceIndex)

    return boardCopyWithoutCaptured
}

/**
 * @description for regular pieces only, checks if the move made is a jump or a move,
 * if it's a jump, remove the captured piece
 */
function removeCaptured(
    boardData: boxPiece[], 
    index: number, 
    pieceIndex: number
) : boxPiece[] {
    const boardCopy = cloneDeep(boardData)

    const higher = Math.max(index, pieceIndex)
    const lower = Math.min(index, pieceIndex)

    if (higher - lower === 14) {
        delete boardCopy[higher-7]?.piece
    }
    if (higher - lower === 18) {
        delete boardCopy[higher-9]?.piece
    }

    return boardCopy
}

/**
 * @description for king pieces only, checks if the move made is a jump or a move,
 * if it's a jump, remove the captured piece
 */
function removeCapturedAsKing(
    boardData: boxPiece[], 
    index: number, 
    pieceIndex: number
) : boxPiece[] {

    const boardCopy = cloneDeep(boardData)
    const higher = Math.max(index, pieceIndex)
    const lower = Math.min(index, pieceIndex)

    const array = POSSIBLEJUMPS.find(arr => {
        return arr.includes(higher) && arr.includes(lower)
    })
    if (array) {
        array.forEach((num) => {
            if (num > lower && num < higher) {
                delete boardCopy[num].piece
            }
        })
    }
    
    return boardCopy
}