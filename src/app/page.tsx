"use client"
import { Toaster } from "@/components/ui/toaster"
import Lobby from "@/components/Lobby"

export default function Home() {
  


  return (
    <main className="flex items-center justify-center w-[100vw] h-[100vh] relative">
      <Lobby />
      <Toaster />
    </main>
  )
}
