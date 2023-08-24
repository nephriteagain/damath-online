
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

  export default function CreateLobby() {
    return (
        <Sheet>
            <SheetTrigger className="bg-green-300 px-3 py-1 text-lg font-semibold rounded-md shadow-md drop-shadow-md hover:scale-105 active:scale-95 transition-all duration-150">
                Create Lobby
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                <SheetTitle>LOBBY</SheetTitle>
                <SheetDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
  }