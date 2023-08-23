// temp type
export interface boxPiece {
    x: number;
    y: number;
    playable: boolean;
    operation?: operation;
    piece?: piece
}

export interface piece {
    type: 'x'|'z';
    value: number;
}

export enum operation {
    ADD = 'add',
    SUBTRACT = 'subtract',
    MULTIPLY = 'multiply',
    DIVIDE = 'divide'
}