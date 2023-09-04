import { db } from "@/db/firebase";
import { updateDoc, getDoc, doc } from 'firebase/firestore';
import { NextResponse } from "next/server";

import { lobbyDataDb } from "@/types/types";

export async function POST(req: Request) {
    const { userId, lobbyId } = await req.json()
    if (!userId || !lobbyId) {
        return NextResponse.json({error: 'missing userId or lobbyId'}, {status: 400})
    }
    try {
        const docRef = doc(db, 'lobbies', lobbyId)
        await updateDoc(docRef, {
            guest: userId
        })
        const lobbyData = await getDoc(docRef)
        if (lobbyData.exists()) {
            const id = lobbyData.id as string
            const data = lobbyData.data() as lobbyDataDb
            return NextResponse.json({id,...data}, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({error: 'server error'}, {status: 500})
    }
}