import { generateId } from "@/redux/userSlice"
import { gameData } from "@/types/types"
import { NextResponse } from "next/server"
import { db } from "@/db/firebase"
import { setDoc, doc, getDoc } from "firebase/firestore"
import { COUNTING, WHOLE, INTEGER } from "@/lib/data"
export async function POST(req: Request) {
    const data = await req.json() as gameData
    const { players, gameType } = data
    if (!players || !gameType)  {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    try {
        const games = {
            'COUNTING': COUNTING,
            'WHOLE': WHOLE,
            'INTEGER': INTEGER,
        }

        const id = generateId()
        const docRef = doc(db, 'games', id)
        await setDoc(docRef, {
            id,
            players: {
                z: players.x,
                x: players.z
            },
            playerTurn: players.z,
            gameType,
            boardData : games[`${gameType}`],
            gameOngoing: true,   
            score: {
                z: 0,
                x: 0
            }         
        })
        const response = await getDoc(docRef)
        if (!response.exists()) {
            throw new Error('data does not exist')
        }
        const data =  response.data()
        return NextResponse.json(data, {status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Server Error'}, {status: 500})
    }
}