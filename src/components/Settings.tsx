
import { Button } from "./ui/button"
import ChangeGameMode from "./ChangeGameMode"
import LeaveGame from "./LeaveGame"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

import { requestRestart } from "@/redux/gameThunks/thunks"
import { IoMdSettings } from 'react-icons/io'

import {
    Sheet,
    SheetContent,
    SheetTrigger,
  } from "@/components/ui/sheet"

interface ButtonsProps {
    showRules: () => void
}


export default function Settings({showRules}: ButtonsProps) {
    const dispatch = useAppDispatch()
    const { id: gameId } = useAppSelector(state => state.game)
    const { id: userId } = useAppSelector(state => state.user)

    return (
        <Sheet>
      <SheetTrigger asChild>
        <Button variant={null}
            className="absolute top-4 left-2 hover:scale-125 hover:rotate-90  transition-all duration-150"
        >
            <span className="text-3xl">
                <IoMdSettings />
            </span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className="flex flex-col gap-4 w-[280px]">
           
           <Button variant="default"
               className="max-w-[200px] text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
               onClick={showRules}
           >
               Show Rules
           </Button>
           <Button variant="destructive"
               className="max-w-[200px] text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
               onClick={() => dispatch(requestRestart({gameId: gameId as string, userId}))}
           >
               Restart Game
           </Button>
           <LeaveGame />
           <ChangeGameMode/>

      </SheetContent>
    </Sheet>
        
    )
}