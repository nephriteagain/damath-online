"use client"

import { useState } from "react"


import GameArea from "@/components/GameArea"
import Rules from "@/components/Rules"
import Buttons from "@/components/Buttons"

import { DialogDemo } from "@/components/DialogDemo"

export default function Home() {
  const [ openRules, setOpenRules ] = useState(true)
  
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

    </main>
  )
}
