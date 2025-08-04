import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CalendarDays,
  PlusCircle,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import img1 from "../../../../public/image1.png";

export default function DashboardPage() {
  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div
      className="h-[1200px] bg-cover bg-center bg-no-repeat p-6 flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${img1.src})` }}
    >
      <div className="w-full max-w-3xl bg-black/50 backdrop-blur-md shadow-2xl rounded-2xl p-10">
        <h1 className="text-6xl font-extrabold text-white mb-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <ClipboardList className="w-20 h-20 text-indigo-500" />
          Welcome to your Fitness Journey!
        </h1>

        <h2 className="text-white text-2xl mb-6 font-medium">
          Track your workouts, monitor your progress, and stay motivated.
        </h2>

        <h4 className="text-2xl font-semibold text-white mb-6">
          Visit your plans and progress here:
        </h4>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href="/plan-generator" className="w-full sm:w-auto">
            <Button className="w-full h-[50px] bg-black sm:w-auto px-6 py-4 text-lg font-semibold flex items-center gap-3">
              <PlusCircle className="w-6 h-6" />
              Generate a New Plan
            </Button>
          </Link>
          <Link href="/progress" className="w-full sm:w-auto">
            <Button className="w-full h-[50px] bg-black sm:w-auto px-6 py-4 text-lg font-semibold flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              Track Your Progress
            </Button>
          </Link>
          <Link href="/plan" className="w-full sm:w-auto">
            <Button className="w-full h-[50px] bg-black sm:w-auto px-6 py-4 text-lg font-semibold flex items-center gap-3">
              <ClipboardList className="w-6 h-6" />
              View Current Plan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
