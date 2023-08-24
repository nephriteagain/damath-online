import { useRef, MouseEvent } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function ChangeGameMode() {
    const countingRef = useRef<HTMLButtonElement>(null)
    const wholeRef = useRef<HTMLButtonElement>(null)
    const intergerRef = useRef<HTMLButtonElement>(null)


    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="default"
                className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            >            
                Change Game Mode
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle className="font-bold text-center text-2xl">
                Select a Game Mode
            </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Button variant='outline'
                    ref={countingRef}
                >
                    Counting
                </Button>
                <Button variant='outline'
                    ref={wholeRef}
                >
                    Whole
                </Button>
                <Button variant='outline'
                    ref={intergerRef}
                >
                    Integer
                </Button>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Timer" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="5:00">5:00</SelectItem>
                    <SelectItem value="1:00">1:00</SelectItem>
                    <SelectItem value="3:00">3:00</SelectItem>
                    <SelectItem value="10:00">10:00</SelectItem>
                    <SelectItem value="No Timer">No Timer</SelectItem>
                </SelectContent>
            </Select>
            </div>
            <DialogFooter>
            <Button>
                Start Game
            </Button>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}
