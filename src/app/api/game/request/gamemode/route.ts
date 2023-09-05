import { NextResponse } from "next/server"
import { db } from "@/db/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { messageType } from "@/types/types"

export async function POST(req:Request) {
    const { userId, gameId, gameType, } = await req.json()
    if (!userId || !gameId || !gameType) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    try {
        const docRef = doc(db, 'games', gameId)
        await updateDoc(docRef, {
            message: {
                type: messageType.REQUEST_CHANGE_GAME_MODE,
                sender: userId,
                data: gameType
            }
        })
        return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Server Error'}, {status: 500})
    }
}