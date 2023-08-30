import { MouseEvent } from "react"

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
  
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { leaveGame } from "@/redux/gameThunks/thunks"

export default function LeaveGame() {
    const dispatch = useAppDispatch()
    const { id } = useAppSelector(state => state.game)

    function handleClick(e: MouseEvent, id: string) {
        dispatch(leaveGame(id))
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger
                className="max-w-[200px] bg-destructive text-white py-[0.5rem] text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150 rounded-md"
            >
                Leave Game
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>
                    Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                    onClick={(e) => handleClick(e,id as string)}
                >
                    Continue
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}