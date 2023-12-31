// temp type
export interface GameState {
    gameBoard: boxPiece[];
    pieceToMove: null|piece;
    pieceIndex: number;
    gameOngoing: boolean;
    id?: string;
    players?: players;
    playerTurn?: string;
    score?: score
}

export interface players {
    z: string;
    x: string;
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
    piece?: piece;
    gameBoard?: boxPiece[];
    playerTurn?: string
}


export interface piece {
    type: 'x'|'z';
    value: number;
    king: boolean;
    moves: number[];
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
    gameType: GameTypes;
    guest: string;
    host: string;
    start: boolean
}

export enum GameTypes  {
    COUNTING = 'COUNTING',
    WHOLE = 'WHOLE',
    INTEGER = 'INTEGER'
}

export type lobbyDataDb = Omit<lobbyData,'id'>

export interface gameData {
    id: string;
    players: players;
    playerTurn: string;
    gameType: GameTypes;
    boardData: boxPiece[];
    gameOngoing: boolean;
    score: score
    message?: message
}

export interface score {
    z: number;
    x: number;
}

export interface message {
    sender: string;
    type: messageType;
    data: GameTypes
}

export enum messageType {
    REQUEST_RESTART,
    APPROVE_RESTART,
    REQUEST_CHANGE_GAME_MODE,
    APPROVE_CHANGE_GAME_MODE,
}

export interface moveArgs {
    boardData : boxPiece[],
    piece : piece,
    index : number,
    pieceIndex : number,
    playerTurn : string,
    id: string,
    players: players,
    score: score
}


export interface movablePieces {
    piece: piece;
    index: number;
    jumpIndex: number;
    direction: 'top right'|'top left'|'bot right'|'bot left'
}