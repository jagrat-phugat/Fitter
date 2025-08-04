"use client";

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn, ArrowRightCircle } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-600 to-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">

        <div>
          <SignedIn>
            <h2 className="text-lg text-green-600 mb-4 font-semibold">
               You are logged in! Welcome back.
            </h2>
            <Link href="/dashboard">
              <Button className="w-full flex items-center justify-center gap-2">
                <ArrowRightCircle className="w-5 h-5" />
                Continue
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Login Page</h1>
        <p className="text-gray-600 mb-6">Please log in to continue.</p>
            <h2 className="text-lg text-red-600 mb-4 font-semibold">
               You are not logged in. Please log in to access your account.
            </h2>
            <SignInButton>
              <Button className="w-full flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                Log In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
