// temp type
export interface boxPiece {
    x: number;
    y: number;
    playable: boolean;
    operation?: operation;
    piece?: piece;
    hightlighted?: boolean;
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