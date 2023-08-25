import Box from "./Box"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { useEffect } from "react"
import { db } from "@/db/firebase"
import { onSnapshot } from "firebase/firestore"
import { doc, } from "firebase/firestore"
import { gameData } from "@/types/types"
import { adjustPieces } from "@/redux/gameSlice"

export default function Board() {
    const dispatch = useAppDispatch()

    const { gameBoard, id } = useAppSelector(state => state.game)

    useEffect(() => {
        if (!id) return
        const docRef = doc(db, 'games', id)
        const unsub = onSnapshot(docRef, snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.data() as gameData
                const { boardData, playerTurn } = data
                dispatch(adjustPieces({
                    gameBoard: boardData,
                    playerTurn
                }))
            }
        })
        return () => unsub()
    }, [id])

    return (
        <div className="board relative w-[550px] aspect-square grid grid-cols-8 grid-rows-[8] bg-slate-100 shadow-xl drop-shadow-lg">
            {gameBoard.map((item,index) => {
                const { playable, piece, operation, hightlighted } = item
                return (
                    <Box
                        key={index}
                        playable={playable}
                        piece={piece}
                        operation={operation}
                        index={index}
                        highlighted={hightlighted}
                    />
                )
            })}
            <div className="vertical-num" />
            <div className="horizontal-num" />          
        </div>
    )
}