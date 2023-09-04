import { NextResponse } from 'next/server';
import { db } from "@/db/firebase"
import { updateDoc, doc } from "firebase/firestore"

export async function POST(req: Request) {
    const { lobbyId, gameType } = await req.json()
    if (lobbyId || gameType) {
        return NextResponse.json({error: 'no lobbyId or gameType'}, {status: 400})
    }
    try {
        
        const docRef = doc(db, 'lobbies', lobbyId)
        await updateDoc(docRef, {
            gameType
        })
    return NextResponse.json({status: 200})
    } catch (error) {
        return NextResponse.json({status: 500})
    }    
}