import { db } from "@/db/firebase"
import { updateDoc, doc } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { lobbyId } = await req.json()
    if (!lobbyId) {
        return NextResponse.json({error: 'missing lobbyId'}, {status: 400})
    }
    try {
        const docRef = doc(db, 'lobbies', lobbyId);
        await updateDoc(docRef, {
            start: true
        })
        return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({error: 'Server error'}, {status: 500})
    }
}