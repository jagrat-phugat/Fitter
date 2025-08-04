"use client";

import Image from "next/image";
import logo from "../../public/logo.png";
import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";
import { Button } from "./ui/button";
import Link from "next/link";
import { Home, Info, Phone } from "lucide-react";

export default function Header() {
  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-900 via-gray-800">
    <header className="w-full bg-transparent backdrop-blur-2xl backdrop-saturate-250 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={40} height={40}/>
          <span className="text-xl font-semibold">FiTTeR</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-gray-200 transition"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="flex items-center gap-1 hover:text-gray-200 transition"
              >
                <Info className="w-4 h-4" />
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="flex items-center gap-1 hover:text-gray-200 transition"
              >
                <Phone className="w-4 h-4" />
                Contact Us
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton>
              <Button className="bg-gray-700 text-white hover:bg-gray-600 font-semibold">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </header>
    </div>
  );
}
