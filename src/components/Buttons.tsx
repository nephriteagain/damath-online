
import { Button } from "./ui/button"
import ChangeGameMode from "./ChangeGameMode"

interface ButtonsProps {
    showRules: () => void
}

export default function Buttons({showRules}: ButtonsProps) {
    return (
        <div className="absolute top-4 left-4 flex flex-col gap-4">
           
            <Button variant="default"
                className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
                onClick={showRules}
            >
                Show Rules
            </Button>
            <Button variant="destructive"
                className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            >
                Restart Game
            </Button>
            <Button variant="destructive"
                className="text-md shadow-sm drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150"
            >
                Leave Game
            </Button>
            <ChangeGameMode/>

        </div>
    )
}