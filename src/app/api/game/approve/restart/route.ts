import { NextResponse } from "next/server"
import { COUNTING, WHOLE, INTEGER } from "@/lib/data"
import { db } from "@/db/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { GameTypes } from "@/types/types"

export async function POST(req: Request) {
    const res = await req.json()
    const id = res.id as string
    const gameType = res.gameType as GameTypes
    if (!id || !gameType) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    try {
        const games = {
            'COUNTING': COUNTING,
            'WHOLE': WHOLE,
            'INTEGER': INTEGER,
        }

        const docRef = doc(db, 'games', id)
        await updateDoc(docRef, {
            boardData : games[`${gameType}`],   
            message: {}
        })        
        return NextResponse.json({message: 200})
    } catch (error) {
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}