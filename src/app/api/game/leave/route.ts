import { db } from "@/db/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const {gameId} = await req.json()
    if (!gameId) {
        return NextResponse.json({error: 'missing gameId'}, {status: 400})
    }
    try {
        const docRef = doc(db, 'games', gameId)
        await updateDoc(docRef, {
            gameOngoing: false
        })
        return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Server Error'}, {status: 500})
    }
}