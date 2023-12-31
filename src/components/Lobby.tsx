
import { useAppDispatch, useAppSelector } from "@/redux/hooks"


import CreateLobbySheet from "./CreateLobbySheet"
import JoinLobbySheet from "./JoinLobbySheet"

// TODO fix the player x not working
export default function Lobby() {

    const {
        lobbies : lobbyList,
    } = useAppSelector(state => state.user)

    // console.log(lobbyList)
    

    return (
        <div className="w-[600px] h-[500px] bg-slate-500 p-4 shadow-lg drop-shadow-lg rounded-lg">
            <div className="mb-8">
                <CreateLobbySheet/>
            </div>
            <div className="bg-slate-200 p-2 max-h-[400px] overflow-y-auto">
            <div className="relative flex flex-row font-bold text-lg items-center justify-between my-2 py-[0.25rem] bg-zinc-800 text-white rounded-sm shadow-md drop-shadow-md border-2 border-transparent">
                            <div className="basis-1/4 flex ps-2 items-center justify-center">
                                TYPE
                            </div>
                            <div className="basis-1/4 flex ps-2 items-center justify-center">
                                HOST
                            </div>
                            <div className="basis-1/4 flex ps-2 items-center justify-center">
                                GUEST
                            </div>
                            <div className="basis-1/4 flex items-center justify-center ">
                            </div>
                        </div>
                {lobbyList.map((item, index) => {
                    const { id, gameType, guest, host } = item
                    return (
                        <div key={id || index} className="relative flex flex-row items-center justify-between my-2 py-1 bg-zinc-600 text-white rounded-sm shadow-md drop-shadow-md border-2 border-transparent hover:text-black hover:bg-stone-300 hover:border-gray-400  transition-all duration-200">
                            <div className="basis-1/4 flex ps-2 items-center justify-center">
                                {gameType}
                            </div>
                            <div className="basis-1/4 flex ps-2 items-center justify-center">
                                {host}                               
                            </div>
                            <div className="basis-1/4 flex ps-2 items-center justify-center">
                                {guest.length > 0 ? guest : 'EMPTY'}
                            </div>
                            <div className="basis-1/4 flex items-center justify-center ">
                                <JoinLobbySheet 
                                    lobbyId={id}
                                    guest={guest}
                                /> 
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}