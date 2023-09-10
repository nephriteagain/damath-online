import { cloneDeep } from 'lodash';
import { movablePieces, piece } from './../../types/types';
import { boxPiece } from "@/types/types";
import { movableJump, kingJumpable, getDirection,  } from './checkMovablePieces';
import { toAdd } from './kingMoveSearch/kingMoveSearch';
/**
 * 
 * @param boardData current board game
 * @param movablePieces all movable pieces
 * @description handles the multi jump, filters the moves to the pieces
 * that captures the most
 */
export function multiJumpFilter(
    boardData: boxPiece[],
    movablePieces: movablePieces[],
)  {
    const newMovableArr : movablePieces[] = []
    const movablePiecesCopy = cloneDeep(movablePieces)
    movablePiecesCopy.forEach(p => {
        const {piece, index, direction, jumpIndex} = p
        if (!p.piece.king) {
            piece.moves = []
        }
        if (p.piece.king) {
            direction !== 'top right' && kingJumpable(boardData, piece, jumpIndex, 7, newMovableArr)
            direction !== 'top left' && kingJumpable(boardData, piece, jumpIndex, 9, newMovableArr)
            direction !== 'bot right' && kingJumpable(boardData, piece, jumpIndex, -9, newMovableArr)
            direction !== 'bot left' && kingJumpable(boardData, piece, jumpIndex, -7, newMovableArr)
        }
    })
    if (newMovableArr.length > 0) {
        boardData.forEach((b,idx) => {
            if (b?.piece) {
                b.piece.moves = []
            }
        })
        newMovableArr.forEach(p => {
            const piece = boardData[p.index]?.piece as piece
            piece.moves = p.piece.moves
        })
        multiJumpFilter(boardData, newMovableArr)
    }
}

function kingJumps(
    boardData: boxPiece[],
    piece: piece,
    index: number,
    number: number,
    movableArr: movablePieces[],
    newMoves: number[],
    ogIndex: number
) {
    const numToAdd = toAdd(number)

    const nextTile = boardData[index + number]
    const nextJump = boardData[index + (number+numToAdd)]

    if (nextTile?.playable && nextTile?.piece == undefined) {
        kingJumps(boardData, piece, (index + numToAdd), number, movableArr, newMoves, ogIndex)
    }
    if (nextTile?.playable && nextTile?.piece != undefined
        && nextTile?.piece?.type !== piece?.type &&
        nextJump?.playable && nextJump?.piece == undefined) {
            newMoves.push(ogIndex)
            movableArr.push({
                piece, index, direction: 'top right', jumpIndex: index + (number + numToAdd)
            })
        }
}

function regularJumps(
    boardData: boxPiece[],
    piece: piece,
    moves: number[],
    direction: 'top right'|'top left'|'bot right'|'bot left',
    movableArr: movablePieces[],
) {
    const newMoves : number[] = []

    moves.forEach((index => {
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
            newMoves.push(index)
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
            newMoves.push(index)
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
            newMoves.push(index)
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
            newMoves.push(index)
            movableArr && movableArr.push({
                piece, index, direction: 'bot left', jumpIndex: index+14
            })
        }
    }))

    if (newMoves.length > 0) {
        piece.moves = newMoves
    }
}