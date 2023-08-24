// temp type
export interface GameState {
    gameBoard: boxPiece[];
    pieceToMove: null|piece
}

export interface boxPiece {
    x: number;
    y: number;
    playable: boolean;
    operation?: operation;
    piece?: piece;
    hightlighted?: boolean;
}

export interface action {
    payload: payload;
    type: string;
}

export interface payload {
    index?: number;
    piece?: piece
}


export interface piece {
    type: 'x'|'z';
    value: number;
    king: boolean;
    movable: boolean;
}

export enum operation {
    ADD = 'add',
    SUBTRACT = 'subtract',
    MULTIPLY = 'multiply',
    DIVIDE = 'divide'
}