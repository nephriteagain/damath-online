// temp type
export interface GameState {
    gameBoard: boxPiece[];
    pieceToMove: null|piece;
    pieceIndex: number;
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

export interface  UserTypes {
    id: string;
    isLoggedIn: boolean;
    lobbies: lobbyData[];
    joinedLobby: string;
    lobbyData?: lobbyData
}

export interface lobbyData {
    id: string;
    gameType: string;
    guest: string;
    host: string;
}

export type lobbyDataDb = Omit<lobbyData,'id'>