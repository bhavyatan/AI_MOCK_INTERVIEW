"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"

export default function Home() {
  const [fadeIn, setFadeIn] = useState(false)
  const [exitAnimation, setExitAnimation] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleEnter = () => {
    setExitAnimation(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000) // Wait for animation to complete
  }

  return (
    <div className="relative h-screen w-screen ">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          src='/bg1.png'
          alt="Background"
          fill
          priority
          className="object-"
          sizes="70vh"
          quality={100}
        />
        {/* Purple Overlay */}
        <div className="absolute inset-0 bg-purple-900/30 backdrop-blur-md" />
      </div>

      {/* Content Container */}
      <div
        className={`relative z-10 flex flex-col justify-center items-center h-full text-white font-sans
          ${exitAnimation ? "animate-content-exit" : ""}`}
      >
        <div
          className={`text-center transform transition-all duration-1000 ease-in-out
            ${fadeIn ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"}`}
        >
          <h1 className="text-6xl p-4  rounded-lg font-bold mb-6 animate-[glow_1.5s_infinite_alternate]">Welcome to VirtuView✒️</h1>
          <p className="text-2xl mb-12 max-w-2xl mx-auto">
            Your AI-powered mock interview platform to excel in your career.
          </p>
          <button
            onClick={handleEnter}
            className="bg-white text-purple-800 border-2 border-white rounded-full 
              py-3 px-12 text-xl font-bold cursor-pointer transition-all duration-300 
              hover:bg-purple-800 hover:text-white hover:scale-105 
              active:scale-95"
          >
            Enter
          </button>
        </div>
        <div className="absolute top-5 right-5">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  )
}


