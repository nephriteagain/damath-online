import CreateLobby from "./CreateLobby"

const array = new Array(10).fill(0)

export default function Lobby() {
    return (
        <div className="w-[400px] h-[500px] bg-slate-500 p-4 shadow-lg drop-shadow-lg rounded-lg">
            <div className="mb-8">
                <CreateLobby/>
            </div>
            <div className="bg-slate-200 p-2 max-h-[400px] overflow-y-auto">
                {array.map((item,index) => {
                    return (
                        <div key={index} className="relative flex flex-row justify-between my-2 py-[0.25rem] bg-zinc-600 text-white rounded-sm shadow-md drop-shadow-md border-2 border-transparent hover:text-black hover:bg-stone-300 hover:border-gray-400  transition-all duration-200">
                            <div className="basis-1/3 flex ps-2">
                                HOST                               
                            </div>
                            <div className="basis-1/3 flex ps-2">
                                GUEST
                            </div>
                            <div className="basis-1/3 flex items-center justify-center">
                                JOIN
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}