"use client";


import { FileWarning } from "lucide-react";
import Link from "next/link";

export default function NoPlan() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 px-4">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 bg-yellow-50 border border-yellow-400 p-6 rounded-2xl shadow-md">
        <FileWarning className="w-8 h-8 text-yellow-600" />
        <span className="text-lg font-semibold text-yellow-700 text-center sm:text-left">
          No plan found. Fill the form first.
        </span>
        <div>
        <Link href="/plan-generator"
        className=" text-blue-900 hover:bg-blue-950">
            Generate a New Plan Here
        </Link>
        </div>
      </div>
    </div>
  );
}
