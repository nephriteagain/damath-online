import { lobbyDataDb } from "@/types/types"
import { db } from "@/db/firebase"
import { addDoc, doc, collection, updateDoc, getDoc, deleteDoc,  } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(req: Request,) {
    const { userId } = await req.json()
    if (!userId) {
        return NextResponse.json(
            {error: 'must provide a userId'}, 
            {status: 400}
        )
    }

    const colRef = await addDoc(collection(db, 'lobbies'), {
        gameType: 'COUNTING',
        host: userId,
        guest: '',
        start: false
    })
    const docRef = doc(db, 'lobbies', colRef.id)
        const lobbyData = await getDoc(docRef)
        if (lobbyData.exists()) {
            const id = lobbyData.id as string
            const data = lobbyData.data() as lobbyDataDb
            return NextResponse.json({id,...data}, {status: 201})
        }
        return NextResponse.json(
            {error: 'Something Went Wrong'}, 
            {status: 500}
        )
}