import { boxPiece, operation } from "@/types/types"

export const COUNTING : boxPiece[]  = [
    {x: 0, y: 7, hightlighted: false,    playable: true, piece: {type: 'x', king: false,  value: 3, moves: []},   operation: operation.MULTIPLY},
    {x: 1, y: 7,  playable: false, },
  
    {x: 2, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 6, moves: []},   operation: operation.DIVIDE, },
    {x: 3, y: 7,  playable: false, },
  
    {x: 4, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 9, moves: []},   operation: operation.SUBTRACT, },
    {x: 5, y: 7 ,  playable: false, },
  
    {x: 6, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 12, moves: []},   operation: operation.ADD, },
    {x: 7, y: 7,  playable: false, },
  
    {x: 0, y: 6,  playable: false, },
    {x: 1, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 8, moves: []},  operation: operation.DIVIDE, },
  
    {x: 2, y: 6,  playable: false, },
    {x: 3, y: 6, hightlighted: false,    playable: true, piece: {type: 'x', king: false,  value: 11, moves: []},  operation: operation.MULTIPLY, },
    
    {x: 4, y: 6,  playable: false, },
    {x: 5, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 4, moves: []},  operation: operation.ADD, },
  
    {x: 6, y: 6,  playable: false, },
    {x: 7, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 1, moves: []},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 5, moves: [25]},  operation: operation.SUBTRACT, },
    {x: 1, y: 5,  playable: false, },
  
    {x: 2, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 2, moves: [25,27]},  operation: operation.ADD, },
    {x: 3, y: 5,  playable: false, },
  
    {x: 4, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 7, moves: [27, 29]},  operation: operation.MULTIPLY, },
    {x: 5, y: 5,  playable: false, },
  
    {x: 6, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 10, moves: [29, 31]},  operation: operation.DIVIDE, },
    {x: 7, y: 5,  playable: false, },
  
    {x: 0, y: 4,  playable: false, },
    {x: 1, y: 4, hightlighted: false,   playable: true,   operation: operation.ADD, },
  
    {x: 2, y: 4,  playable: false, },
    {x: 3, y: 4, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
  
    {x: 4, y: 4,  playable: false, },
    {x: 5, y: 4, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
  
    {x: 6, y: 4,  playable: false, },
    {x: 7, y: 4, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
  
    {x: 0, y: 3, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
    {x: 1, y: 3,  playable: false, },
  
    {x: 2, y: 3, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
    {x: 3, y: 3,  playable: false, },
  
    {x: 4, y: 3, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
    {x: 5, y: 3,  playable: false, },
  
    {x: 6, y: 3, hightlighted: false,   playable: true,   operation: operation.ADD, },
    {x: 7, y: 3,  playable: false, },
  
    {x: 0, y: 2,  playable: false, },
    {x: 1, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 10, moves: [32,34]},  operation: operation.DIVIDE, },
  
    {x: 2, y: 2,  playable: false, },
    {x: 3, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 7, moves: [34, 36]},  operation: operation.MULTIPLY, },
  
    {x: 4, y: 2,  playable: false, },
    {x: 5, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 2, moves: [36, 38]},  operation: operation.ADD, },
  
    {x: 6, y: 2,  playable: false, },
    {x: 7, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 5, moves: [38]},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 1, moves: []},  operation: operation.SUBTRACT, },
    {x: 1, y: 1,  playable: false, },
  
    {x: 2, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 4, moves: []},  operation: operation.ADD, },
    {x: 3, y: 1,  playable: false, },
  
    {x: 4, y: 1, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 11, moves: []},  operation: operation.MULTIPLY, },
    {x: 5, y: 1,  playable: false, },
  
    {x: 6, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 8, moves: []},  operation: operation.DIVIDE, },
    {x: 7, y: 1,  playable: false, },
  
    {x: 0, y: 0,  playable: false, },
    {x: 1, y: 0, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 12, moves: []},   operation: operation.ADD, },
  
    {x: 2, y: 0,  playable: false, },
    {x: 3, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 9, moves: []},   operation: operation.SUBTRACT, },
  
    {x: 4, y: 0,  playable: false, },
    {x: 5, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 6, moves: []},   operation: operation.DIVIDE, },
  
    {x: 6, y: 0,  playable: false, },
    {x: 7, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 3, moves: []},  operation: operation.MULTIPLY, },
  ]



export const INTEGER = [
  {x: 0, y: 7, hightlighted: false,    playable: true, piece: {type: 'x', king: false,  value: 2, moves: []},   operation: operation.MULTIPLY, },
    {x: 1, y: 7,  playable: false, },
  
    {x: 2, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: -5, moves: []},   operation: operation.DIVIDE, },
    {x: 3, y: 7,  playable: false, },
  
    {x: 4, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 8, moves: []},   operation: operation.SUBTRACT, },
    {x: 5, y: 7 ,  playable: false, },
  
    {x: 6, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: -11, moves: []},   operation: operation.ADD, },
    {x: 7, y: 7,  playable: false, },
  
    {x: 0, y: 6,  playable: false, },
    {x: 1, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: -7, moves: []},  operation: operation.DIVIDE, },
  
    {x: 2, y: 6,  playable: false, },
    {x: 3, y: 6, hightlighted: false,    playable: true, piece: {type: 'x', king: false,  value: 10, moves: []},  operation: operation.MULTIPLY, },
    
    {x: 4, y: 6,  playable: false, },
    {x: 5, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: -3, moves: []},  operation: operation.ADD, },
  
    {x: 6, y: 6,  playable: false, },
    {x: 7, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 0, moves: []},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 4, moves: [25]},  operation: operation.SUBTRACT, },
    {x: 1, y: 5,  playable: false, },
  
    {x: 2, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: -1, moves: [25,27]},  operation: operation.ADD, },
    {x: 3, y: 5,  playable: false, },
  
    {x: 4, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 6, moves: [27,29]},  operation: operation.MULTIPLY, },
    {x: 5, y: 5,  playable: false, },
  
    {x: 6, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: -9, moves: [29,31]},  operation: operation.DIVIDE, },
    {x: 7, y: 5,  playable: false, },
  
    {x: 0, y: 4,  playable: false, },
    {x: 1, y: 4, hightlighted: false,   playable: true,   operation: operation.ADD, },
  
    {x: 2, y: 4,  playable: false, },
    {x: 3, y: 4, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
  
    {x: 4, y: 4,  playable: false, },
    {x: 5, y: 4, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
  
    {x: 6, y: 4,  playable: false, },
    {x: 7, y: 4, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
  
    {x: 0, y: 3, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
    {x: 1, y: 3,  playable: false, },
  
    {x: 2, y: 3, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
    {x: 3, y: 3,  playable: false, },
  
    {x: 4, y: 3, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
    {x: 5, y: 3,  playable: false, },
  
    {x: 6, y: 3, hightlighted: false,   playable: true,   operation: operation.ADD, },
    {x: 7, y: 3,  playable: false, },
  
    {x: 0, y: 2,  playable: false, },
    {x: 1, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: -9, moves: [32,34]},  operation: operation.DIVIDE, },
  
    {x: 2, y: 2,  playable: false, },
    {x: 3, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 6, moves: [34,36]},  operation: operation.MULTIPLY, },
  
    {x: 4, y: 2,  playable: false, },
    {x: 5, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: -1, moves: [36,38]},  operation: operation.ADD, },
  
    {x: 6, y: 2,  playable: false, },
    {x: 7, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 4, moves: [38]},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 0, moves: []},  operation: operation.SUBTRACT, },
    {x: 1, y: 1,  playable: false, },
  
    {x: 2, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: -3, moves: []},  operation: operation.ADD, },
    {x: 3, y: 1,  playable: false, },
  
    {x: 4, y: 1, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 10, moves: []},  operation: operation.MULTIPLY, },
    {x: 5, y: 1,  playable: false, },
  
    {x: 6, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: -7, moves: []},  operation: operation.DIVIDE, },
    {x: 7, y: 1,  playable: false, },
  
    {x: 0, y: 0,  playable: false, },
    {x: 1, y: 0, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: -11, moves: []},   operation: operation.ADD, },
  
    {x: 2, y: 0,  playable: false, },
    {x: 3, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 8, moves: []},   operation: operation.SUBTRACT, },
  
    {x: 4, y: 0,  playable: false, },
    {x: 5, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: -5, moves: []},   operation: operation.DIVIDE, },
  
    {x: 6, y: 0,  playable: false, },
    {x: 7, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 2, moves: []},  operation: operation.MULTIPLY, },
]


export const WHOLE = [
  {x: 0, y: 7, hightlighted: false,    playable: true, piece: {type: 'x', king: false,  value: 2, moves: []},   operation: operation.MULTIPLY, },
    {x: 1, y: 7,  playable: false, },
  
    {x: 2, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 5, moves: []},   operation: operation.DIVIDE, },
    {x: 3, y: 7,  playable: false, },
  
    {x: 4, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 8, moves: []},   operation: operation.SUBTRACT, },
    {x: 5, y: 7 ,  playable: false, },
  
    {x: 6, y: 7, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 11, moves: []},   operation: operation.ADD, },
    {x: 7, y: 7,  playable: false, },
  
    {x: 0, y: 6,  playable: false, },
    {x: 1, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 7, moves: []},  operation: operation.DIVIDE, },
  
    {x: 2, y: 6,  playable: false, },
    {x: 3, y: 6, hightlighted: false,    playable: true, piece: {type: 'x', king: false,  value: 10, moves: []},  operation: operation.MULTIPLY, },
    
    {x: 4, y: 6,  playable: false, },
    {x: 5, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 3, moves: []},  operation: operation.ADD, },
  
    {x: 6, y: 6,  playable: false, },
    {x: 7, y: 6, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 0, moves: []},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 4, moves: [25]},  operation: operation.SUBTRACT, },
    {x: 1, y: 5,  playable: false, },
  
    {x: 2, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 1, moves: [25,27]},  operation: operation.ADD, },
    {x: 3, y: 5,  playable: false, },
  
    {x: 4, y: 5, hightlighted: false,  playable: true, piece: {type: 'x', king: false,  value: 6, moves: [27,29]},  operation: operation.MULTIPLY, },
    {x: 5, y: 5,  playable: false, },
  
    {x: 6, y: 5, hightlighted: false,   playable: true, piece: {type: 'x', king: false,  value: 9, moves: [29,31]},  operation: operation.DIVIDE, },
    {x: 7, y: 5,  playable: false, },
  
    {x: 0, y: 4,  playable: false, },
    {x: 1, y: 4, hightlighted: false,   playable: true,   operation: operation.ADD, },
  
    {x: 2, y: 4,  playable: false, },
    {x: 3, y: 4, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
  
    {x: 4, y: 4,  playable: false, },
    {x: 5, y: 4, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
  
    {x: 6, y: 4,  playable: false, },
    {x: 7, y: 4, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
  
    {x: 0, y: 3, hightlighted: false,   playable: true,   operation: operation.MULTIPLY, },
    {x: 1, y: 3,  playable: false, },
  
    {x: 2, y: 3, hightlighted: false,   playable: true,   operation: operation.DIVIDE, },
    {x: 3, y: 3,  playable: false, },
  
    {x: 4, y: 3, hightlighted: false,   playable: true,   operation: operation.SUBTRACT, },
    {x: 5, y: 3,  playable: false, },
  
    {x: 6, y: 3, hightlighted: false,   playable: true,   operation: operation.ADD, },
    {x: 7, y: 3,  playable: false, },
  
    {x: 0, y: 2,  playable: false, },
    {x: 1, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 9, moves: [32,34]},  operation: operation.DIVIDE, },
  
    {x: 2, y: 2,  playable: false, },
    {x: 3, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 6, moves: [34,36]},  operation: operation.MULTIPLY, },
  
    {x: 4, y: 2,  playable: false, },
    {x: 5, y: 2, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 1, moves: [36,38]},  operation: operation.ADD, },
  
    {x: 6, y: 2,  playable: false, },
    {x: 7, y: 2, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 4, moves: [38]},  operation: operation.SUBTRACT, },
  
    {x: 0, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 0, moves: []},  operation: operation.SUBTRACT, },
    {x: 1, y: 1,  playable: false, },
  
    {x: 2, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 3, moves: []},  operation: operation.ADD, },
    {x: 3, y: 1,  playable: false, },
  
    {x: 4, y: 1, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 10, moves: []},  operation: operation.MULTIPLY, },
    {x: 5, y: 1,  playable: false, },
  
    {x: 6, y: 1, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 7, moves: []},  operation: operation.DIVIDE, },
    {x: 7, y: 1,  playable: false, },
  
    {x: 0, y: 0,  playable: false, },
    {x: 1, y: 0, hightlighted: false,   playable: true, piece: {type: 'z', king: false,  value: 11, moves: []},   operation: operation.ADD, },
  
    {x: 2, y: 0,  playable: false, },
    {x: 3, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 8, moves: []},   operation: operation.SUBTRACT, },
  
    {x: 4, y: 0,  playable: false, },
    {x: 5, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 5, moves: []},   operation: operation.DIVIDE, },
  
    {x: 6, y: 0,  playable: false, },
    {x: 7, y: 0, hightlighted: false,  playable: true, piece: {type: 'z', king: false,  value: 2, moves: []},  operation: operation.MULTIPLY, },
]

export type POSSIBLEJUMPSTYPE = number[][]

export const POSSIBLEJUMPS : POSSIBLEJUMPSTYPE = [
  [2, 9, 16],
  [4, 11, 18, 25, 32],
  [6, 13, 20, 27, 34, 41, 48],
  [15, 22, 29, 36, 43, 50, 57],
  [31, 38, 45, 52, 59],
  [47, 54, 61],
  [32, 41, 50, 59],
  [16, 25, 34, 43, 52, 61],
  [0, 9, 18, 27, 36, 45, 54, 63],
  [2, 11, 20, 29, 38, 47],
  [4, 13, 22, 31]
]