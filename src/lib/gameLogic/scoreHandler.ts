import { boxPiece, piece, score, operation } from "@/types/types";

export function scoreHandler(
    oldScore: score,
    scoree: 'z'|'x',
    jumpedPiece: piece,
    capturePiece: piece,
    destinationBox: boxPiece
) : score {
    console.log('score handler func')
    const operation = destinationBox?.operation as operation
    const jumpVal = jumpedPiece.value 
    const capturedVal = capturePiece.value
    const jumpIsDama = jumpedPiece.king
    const capturedIsDama = capturePiece.king

    let result;
    switch (operation) {
        case 'add' :
            result = jumpVal + capturedVal
            break;
        case 'subtract' :
            result = jumpVal - capturedVal
            break;
        case 'multiply' :
            result = jumpVal * capturedVal
            break;
        case 'divide' :
            result = jumpVal / capturedVal
            break;
        default:
            result = jumpVal + capturedVal
    }

    if (result === Infinity) {
        result = 0
    }
    if (jumpIsDama) {
        result *= 2
    }
    if (capturedIsDama) {
        result *= 2
    }
    result = Number(result.toFixed(2))
    const newScore = {
        ...oldScore,        
    }
    newScore[scoree] += result
    return newScore
}


export function getNewPieceBox(boardData: boxPiece[], piece: piece) : boxPiece {
    console.log('get new piece func')
    const newPieceBox = boardData.find(box => {
        return piece.value === box?.piece?.value && piece.type === box?.piece?.type
    }) as boxPiece
    return newPieceBox
}

export function getTotalRemainingScore(pieceType: 'x'|'z', boardData: boxPiece[]) : number {
    let total = 0
    
    for (let i = 0; i < boardData.length; i++) {
        if (boardData[i]?.piece?.type === pieceType) {
            const val = boardData[i]?.piece?.value as number
            total+=val
        }
    }
    return total
}