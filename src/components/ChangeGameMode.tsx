import {  MouseEvent } from "react"

import { Button } from "@/components/ui/button"


import { requestChangeGameMode } from "@/redux/gameThunks/thunks"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


  
import { GameTypes } from "@/types/types"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"

export default function ChangeGameMode() {
    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.game)
    const { id: userId } = useAppSelector(state => state.user)

    async function handleClick(e: MouseEvent<HTMLButtonElement>) {
        const gameType = e.currentTarget.innerText.trim() as GameTypes
        const gameId = id as string
        dispatch(requestChangeGameMode({userId, gameId, gameType}))
    }

    return (
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="max-w-[200px] hover:scale-105 active:scale-95 transition-all duration-150">Change Game Mode</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select a Game Mode</AlertDialogTitle>
          <AlertDialogDescription>
            A request will be sent to your opponent.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleClick}>
            COUNTING
            </AlertDialogAction>
            <AlertDialogAction onClick={handleClick}>
            WHOLE
            </AlertDialogAction>
            <AlertDialogAction onClick={handleClick}>
            INTEGER
            </AlertDialogAction>

          <AlertDialogCancel>
            Cancel
            </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
        // <Dialog>
        // <DialogTrigger asChild>
        //     <Button variant="default"
        //         className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
        //     >            
        //         Change Game Mode
        //     </Button>
        // </DialogTrigger>
        // <DialogContent className="sm:max-w-[425px]">
        //     <DialogHeader>
        //     <DialogTitle className="font-bold text-center text-2xl">
        //         Select a Game Mode
        //     </DialogTitle>
        //     </DialogHeader>
        //     <div className="grid gap-4 py-4">
        //         <Button variant='outline'
        //         onClick={handleClick}
        //         >
        //             COUNTING
        //         </Button>
        //         <Button variant='outline'
        //         onClick={handleClick}
        //         >
        //             WHOLE
        //         </Button>
        //         <Button variant='outline'
        //         onClick={handleClick}
        //         >
        //             INTEGER
        //         </Button>
        //     <Select>
        //         {/* <SelectTrigger className="w-[180px]">
        //             <SelectValue placeholder="Timer" />
        //         </SelectTrigger>
        //         <SelectContent>
        //             <SelectItem value="5:00">5:00</SelectItem>
        //             <SelectItem value="1:00">1:00</SelectItem>
        //             <SelectItem value="3:00">3:00</SelectItem>
        //             <SelectItem value="10:00">10:00</SelectItem>
        //             <SelectItem value="No Timer">No Timer</SelectItem>
        //         </SelectContent> */}
        //     </Select>
        //     </div>
        //     {/* <DialogFooter>
        //     <Button>
        //         Start Game
        //     </Button>
        //     </DialogFooter> */}
        // </DialogContent>
        // </Dialog>
    )
}
