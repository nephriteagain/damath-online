import { boxPiece, operation } from "@/types/types"

export const COUNTING : boxPiece[]  = [
    {x: 0, y: 7,    playable: true, piece: {type: 'x', value: 3},   operation: operation.MULTIPLY},
    {x: 1, y: 7,  playable: false, },
  
    {x: 2, y: 7,   playable: true, piece: {type: 'x', value: 6},   operation: operation.DIVIDE},
    {x: 3, y: 7,  playable: false, },
  
    {x: 4, y: 7,   playable: true, piece: {type: 'x', value: 9},   operation: operation.SUBTRACT},
    {x: 5, y: 7 ,  playable: false, },
  
    {x: 6, y: 7,   playable: true, piece: {type: 'x', value: 12},   operation: operation.ADD},
    {x: 7, y: 7,  playable: false, },
  
    {x: 0, y: 6,  playable: false, },
    {x: 1, y: 6,  playable: true, piece: {type: 'x', value: 8},  operation: operation.DIVIDE},
  
    {x: 2, y: 6,  playable: false, },
    {x: 3, y: 6,    playable: true, piece: {type: 'x', value: 11},  operation: operation.MULTIPLY},
    
    {x: 4, y: 6,  playable: false, },
    {x: 5, y: 6,  playable: true, piece: {type: 'x', value: 4},  operation: operation.ADD},
  
    {x: 6, y: 6,  playable: false, },
    {x: 7, y: 6,  playable: true, piece: {type: 'x', value: 1},  operation: operation.SUBTRACT},
  
    {x: 0, y: 5,   playable: true, piece: {type: 'x', value: 5},  operation: operation.SUBTRACT},
    {x: 1, y: 5,  playable: false, },
  
    {x: 2, y: 5,  playable: true, piece: {type: 'x', value: 2},  operation: operation.ADD},
    {x: 3, y: 5,  playable: false, },
  
    {x: 4, y: 5,  playable: true, piece: {type: 'x', value: 7},  operation: operation.MULTIPLY},
    {x: 5, y: 5,  playable: false, },
  
    {x: 6, y: 5,   playable: true, piece: {type: 'x', value: 10},  operation: operation.DIVIDE},
    {x: 7, y: 5,  playable: false, },
  
    {x: 0, y: 4,  playable: false, },
    {x: 1, y: 4,   playable: true,   operation: operation.ADD},
  
    {x: 2, y: 4,  playable: false, },
    {x: 3, y: 4,   playable: true,   operation: operation.SUBTRACT},
  
    {x: 4, y: 4,  playable: false, },
    {x: 5, y: 4,   playable: true,   operation: operation.DIVIDE},
  
    {x: 6, y: 4,  playable: false, },
    {x: 7, y: 4,   playable: true,   operation: operation.MULTIPLY},
  
    {x: 0, y: 3,   playable: true,   operation: operation.MULTIPLY},
    {x: 1, y: 3,  playable: false, },
  
    {x: 2, y: 3,   playable: true,   operation: operation.DIVIDE},
    {x: 3, y: 3,  playable: false, },
  
    {x: 4, y: 3,   playable: true,   operation: operation.SUBTRACT},
    {x: 5, y: 3,  playable: false, },
  
    {x: 6, y: 3,   playable: true,   operation: operation.ADD},
    {x: 7, y: 3,  playable: false, },
  
    {x: 0, y: 2,  playable: false, },
    {x: 1, y: 2,   playable: true, piece: {type: 'z', value: 10},  operation: operation.DIVIDE},
  
    {x: 2, y: 2,  playable: false, },
    {x: 3, y: 2,  playable: true, piece: {type: 'z', value: 7},  operation: operation.MULTIPLY},
  
    {x: 4, y: 2,  playable: false, },
    {x: 5, y: 2,   playable: true, piece: {type: 'z', value: 2},  operation: operation.ADD},
  
    {x: 6, y: 2,  playable: false, },
    {x: 7, y: 2,  playable: true, piece: {type: 'z', value: 5},  operation: operation.SUBTRACT},
  
    {x: 0, y: 1,  playable: true, piece: {type: 'z', value: 1},  operation: operation.SUBTRACT},
    {x: 1, y: 1,  playable: false, },
  
    {x: 2, y: 1,  playable: true, piece: {type: 'z', value: 4},  operation: operation.ADD},
    {x: 3, y: 1,  playable: false, },
  
    {x: 4, y: 1,   playable: true, piece: {type: 'z', value: 11},  operation: operation.MULTIPLY},
    {x: 5, y: 1,  playable: false, },
  
    {x: 6, y: 1,  playable: true, piece: {type: 'z', value: 8},  operation: operation.DIVIDE},
    {x: 7, y: 1,  playable: false, },
  
    {x: 0, y: 0,  playable: false, },
    {x: 1, y: 0,   playable: true, piece: {type: 'z', value: 12},   operation: operation.ADD},
  
    {x: 2, y: 0,  playable: false, },
    {x: 3, y: 0,  playable: true, piece: {type: 'z', value: 9},   operation: operation.SUBTRACT},
  
    {x: 4, y: 0,  playable: false, },
    {x: 5, y: 0,  playable: true, piece: {type: 'z', value: 6},   operation: operation.DIVIDE},
  
    {x: 6, y: 0,  playable: false, },
    {x: 7, y: 0,  playable: true, piece: {type: 'z', value: 3},  operation: operation.MULTIPLY},
  ]