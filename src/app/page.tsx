import Image from "next/image";
import img1 from "../../public/dashboard1.jpg";
import img2 from "../../public/dashboard2.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dumbbell } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 p-2">
      <div className="relative w-full h-[800px]">
        <Image
          src={img1}
          alt="Fitness Banner"
          fill
          priority
          className="object-cover w-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white">
          <h1 className="text-5xl font-bold mb-4">
            Welcome to <span className="text-blue-400">FiTTeR</span>!
          </h1>
          <p className="text-lg max-w-xl text-center mb-6">
            Your all-in-one fitness companion to track workouts, monitor
            progress, and reach your goals.
          </p>
          <Link href="/dashboard" className="block">
            <Button className="bg-black h-[50px] w-[200px] hover:bg-gray-800 text-white flex items-center gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      <div className="relative w-full h-[800px] mt-0">
        <Image
          src={img2}
          alt="Fitness Image 2"
          fill
          className="object-cover object-top w-full pt-4"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <div className=" shadow-xl rounded-xl p-10 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold text-white mb-4">
              Take Your Fitness to the Next Level
            </h2>
            <p className="text-white mb-8">
              Try Some of our advanced calculators to optimize your workouts and nutrition.
              They are free to use and designed to help you achieve your fitness goals.
            </p>
            <Link href="/calculators" className="block">
              <Button className="bg-black w-[200px] h-[50px] hover:bg-zinc-700 text-white flex items-center gap-2 mx-auto">
                <Dumbbell className="w-4 h-4" /> Explore Calculators
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
