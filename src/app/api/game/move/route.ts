import { NextResponse } from 'next/server';
import { moveArgs } from "@/types/types";
import { cloneDeep } from 'lodash';
import { piece, boxPiece } from '@/types/types';
import { movePiece as movePieceHelper } from '@/lib/gameLogic/movePiece';
import { checkMovablePieces, kingPromoter } from '@/lib/gameLogic/checkMovablePieces';
import { getNewPieceBox, scoreHandler } from '@/lib/gameLogic/scoreHandler';
import { db } from '@/db/firebase';
import { updateDoc, doc } from 'firebase/firestore';


export async function POST(req: Request) {
    const data = await req.json() as moveArgs
    const { boardData, piece, index, pieceIndex, playerTurn , id, players, score } = data
    if (
        !boardData || 
        !piece || 
        !playerTurn || 
        !id || 
        !players || 
        !score) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    let nextTurn = playerTurn === players?.x ? players?.z : players?.x
        const oldBoard = cloneDeep(boardData)

        const capturedPieceArr : piece[] = []

        const newBoardData = movePieceHelper(boardData, piece, index, pieceIndex, capturedPieceArr)
        const playerToCheck = players.x === nextTurn ? 'x' : 'z'

        const didCapturedAPiece = pieceCount(boardData) > pieceCount(newBoardData)

        
        const boardDataWithNewMoves = checkMovablePieces(newBoardData, playerToCheck, didCapturedAPiece, piece)
        const canMultiJump = boardDataWithNewMoves.some(box => box?.piece?.moves && box.piece.moves.length > 0 && box?.piece?.type !== playerToCheck && box?.piece?.value === piece.value)
        
        let newScore = score
        if (didCapturedAPiece) {
            const capturedPiece = capturedPieceArr[0]
            const newPieceBox = getNewPieceBox(boardDataWithNewMoves, piece)
            const scoree = players.x === nextTurn ? 'z' : 'x'
            newScore = scoreHandler(score, scoree, piece, capturedPiece, newPieceBox)
        }

        if (canMultiJump && didCapturedAPiece) {
            console.log('can multi jump')
            nextTurn = playerTurn === players?.z ? players?.z : players?.x
        }

        if (!canMultiJump) {
            kingPromoter(boardDataWithNewMoves)
        }


    try {
        const docRef = doc(db, 'games', id)
        await updateDoc(docRef, {
            playerTurn: nextTurn,
            boardData: boardDataWithNewMoves,
            score: newScore
        })
        return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Server Error'}, {status: 500})
    }
}


function pieceCount(board: boxPiece[]) : number {
    let count = 0
    board.forEach(box => {
        if (box?.piece) {
            count++
        }
    })
    return count
}