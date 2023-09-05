import { db } from "@/db/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { NextResponse } from "next/server"
import { messageType } from "@/types/types"
export async function POST(req: Request) {
    const { userId, gameId } = await req.json()
    if (!userId || !gameId) {
        return NextResponse.json({error: 'missing data'}, {status: 400})
    }
    try {
        const docRef = doc(db, 'games', gameId)
        await updateDoc(docRef, {
            message: {
                type: messageType.REQUEST_RESTART,
                sender: userId
            }
        })
        return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Server Error'}, {status: 500})
    }
}