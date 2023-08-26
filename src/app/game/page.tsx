"use client"

import { useState } from "react"


import GameArea from "@/components/GameArea"
import Rules from "@/components/Rules"
import Buttons from "@/components/Settings"
import { useAppSelector } from "@/redux/hooks"
import { Toaster } from "@/components/ui/toaster"

import { redirect } from "next/navigation" 

export default function Home() {
  const [ openRules, setOpenRules ] = useState(false)
  const { id } = useAppSelector(state => state.game)

  if (!id) {
    redirect('/')
  }

  function showRules() {
    setOpenRules((rule) => !rule)
  }

  return (
    // temporary style
    <main className="flex items-center justify-center w-[100vw] h-[100vh] relative">
      <GameArea />
      { openRules && <Rules
        openRules={openRules}
        setOpenRules={setOpenRules}
        /> }
      <Buttons 
        showRules={showRules}
        />
      <Toaster />

    </main>
  )
}
