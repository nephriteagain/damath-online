import Box from "./Box"

import { COUNTING } from "@/lib/data"
export default function Board() {

    return (
        <div className="board relative w-[550px] aspect-square grid grid-cols-8 grid-rows-[8] bg-slate-100 shadow-xl drop-shadow-lg">
            {COUNTING.map((item,index) => {
                const { playable, piece, operation } = item
                return (
                    <Box
                        key={index}
                        playable={playable}
                        piece={piece}
                        operation={operation}
                    />
                )
            })}
            <div className="vertical-num" />
            <div className="horizontal-num" />          
        </div>
    )
}