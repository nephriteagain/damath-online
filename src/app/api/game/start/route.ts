import { NextResponse } from "next/server"
import { COUNTING, WHOLE, INTEGER } from "@/lib/data"
import { lobbyData, gameData } from "@/types/types"
import { db } from "@/db/firebase"
import { setDoc, getDoc, doc } from "firebase/firestore"



export async function POST(req:Request) {
    const data = await req.json() as lobbyData
    const { id, gameType, guest, host} = data
    if (!id || !gameType || !guest || !host) {
        return NextResponse.json({error: 'Missing data'}, {status: 400})
    }
    try {
        const games = {
            'COUNTING': COUNTING,
            'WHOLE': WHOLE,
            'INTEGER': INTEGER,
        }

        const data = {
            id,
            players: {
                z: host,
                x: guest
            },
            playerTurn: host,
            gameType,
            boardData : games[`${gameType}`],
            gameOngoing: true,
            score: {
                z: 0,
                x: 0
            }
            }
        const docRef = doc(db, 'games', id)
        await setDoc(docRef, data)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data() as gameData
            return NextResponse.json(data)
        }
        return NextResponse.json({error: 'DB error'}, {status: 500})

    } catch (error) {
        return NextResponse.json({error: 'Server Error'}, {status: 500})
    }
}