import { db } from "@/db/firebase"
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { lobbyDataDb } from "@/types/types"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
    const {userId, lobbyId} = await req.json()
    if (!userId || !lobbyId) {
        return NextResponse.json({error: 'missing userId or lobbyId'}, {status: 400})
    }

    try {
        const docRef = doc(db, 'lobbies', lobbyId)
        const docSnap = await getDoc(docRef)   
        if (docSnap.exists()) {
            const data = docSnap.data() as lobbyDataDb
            const { guest, host } = data
            if (guest === userId) {
                await updateDoc(docRef, {
                    guest: ''
                })
                return NextResponse.json({status: 200})
            }
            else if (host === userId) {
                await deleteDoc(docRef)
                return NextResponse.json({status: 200})
            }
            
        }    
    } catch (error) {
        return NextResponse.json({error: 'Server error'}, {status: 500})
    }
    
}