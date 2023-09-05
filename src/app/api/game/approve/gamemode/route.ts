import { GameTypes } from "@/types/types";
import { NextResponse } from "next/server";
import { db } from "@/db/firebase";
import { updateDoc, doc } from "firebase/firestore";
import { COUNTING, WHOLE, INTEGER } from "@/lib/data";

export async function POST(req: Request) {
    const data = await req.json()
    const id = data.id as string;
    const gameType = data.gameType as GameTypes

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
        return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Server Error'}, {status: 500})
    }
}