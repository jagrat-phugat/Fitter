"use client"

import { LogIn } from "lucide-react"
import Link from "next/link"


export default function NoLogin() {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700">
              <div className="flex items-center space-x-3 bg-gray-600 p-6 rounded-2xl shadow-md">
                <LogIn className="w-6 h-6 text-zinc-400" />
                <span className="text-lg font-semibold text-zinc-400">Please log in.</span>
                <div>
        <Link href="/plan-generator"
        className=" text-blue-900 hover:bg-blue-950">
            Generate a New Plan Here
        </Link>
        </div>
              </div>
            </div>
    )
}