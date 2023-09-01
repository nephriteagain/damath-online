
import { useAppSelector } from "@/redux/hooks"

export default function Scores() {
    const { score } = useAppSelector(state => state.game)

    return (
        <section className="w-full flex flex-row bg-stone-300 text-xl font-semibold items-center justify-between px-4 py-2 my-2 rounded-sm shadow-sm drop-shadow-sm">
            <div className="text-red-600 border-white border-2 px-2 py-1 shadow-sm drop-shadow-md">
                Red: {score?.z ?? 0}
            </div>
            <div className="font-bold text-xl">SCORES</div>
            <div className="text-blue-600 border-white border-2 px-2 py-1 shadow-sm drop-shadow-md">
                Blue: {score?.x ?? 0}
            </div>
        </section>
    )
}