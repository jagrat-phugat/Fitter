"use client";

import { useEffect, useState } from "react";
import Tips from "./_components/tips";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ArrowBigRight,
} from "lucide-react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
  CartesianGrid,
} from "recharts";
import Link from "next/link";
import { FitnessReview } from "./_components/review";

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const getWeekDates = (offset = 0) => {
  const now = new Date();
  const day = now.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff + offset * 7);
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split("T")[0];
  });
};

const formatDateRange = (dates: string[]) => {
  const start = new Date(dates[0]);
  const end = new Date(dates[6]);
  return `${start.toDateString()} - ${end.toDateString()}`;
};

export default function ProgressTrackerPage() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [data, setData] = useState<
    { day: string; date: string; workoutDone: boolean; dietDone: boolean }[]
  >([]);

  const weekDates = getWeekDates(weekOffset);
  const today = new Date().toDateString();

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch(`/api/progress?dates=${weekDates.join(",")}`);
      const json = await res.json();
      setData(json);
    };

    fetchProgress();
  }, [weekOffset]);

  const completedDays = data.filter((d) => d.workoutDone && d.dietDone).length;
  const progressPercent = (completedDays / 7) * 100;

  const chartData = data.map((d, index) => ({
    day: dayNames[index],
    Workout: d.workoutDone ? 1 : 0,
    Diet: d.dietDone ? 1 : 0,
  }));

  return (
    <div className="max-w-full mx-auto px-4 py-6 space-y-6 bg-[#0f172a] min-h-screen text-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{today}</h1>
          <p className="text-sm text-gray-300">
           This Week: {formatDateRange(weekDates)}
          </p>
        </div>
        <Link href="/plan">
          <Button variant="default" className="bg-black hover:bg-zinc-800 h-[50px] text-white w-[200px]">
            Go to Plan <ArrowBigRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-800 shadow-md p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setWeekOffset((prev) => prev - 1)}>
            <ArrowLeft />
          </button>
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <Calendar className="w-4 h-4" />
            Weekly Progress
          </h2>
          <button
            onClick={() => setWeekOffset((prev) => Math.min(prev + 1, 0))}
            disabled={weekOffset === 0}
            className={weekOffset === 0 ? "opacity-50 cursor-not-allowed" : ""}
          >
            <ArrowRight />
          </button>
        </div>

        <Progress value={progressPercent} className="h-4 bg-gray-700" />
        <p className="text-sm mt-2">
          {completedDays}/7 days completed ({Math.round(progressPercent)}%)
        </p>

        <ResponsiveContainer width="100%" height={250}>
          <ComposedChart data={chartData}>
            <CartesianGrid stroke="#374151" />
            <XAxis dataKey="day" stroke="#9ca3af" />
            <YAxis domain={[0, 1]} ticks={[0, 1]} stroke="#9ca3af" />
            <Tooltip />
            <Bar dataKey="Workout" fill="#4ade80" radius={[10, 10, 0, 0]} />
            <Bar dataKey="Diet" fill="#60a5fa" radius={[10, 10, 0, 0]} />
            <Line type="monotone" dataKey="Workout" stroke="#34d399" />
            <Line type="monotone" dataKey="Diet" stroke="#3b82f6" />
          </ComposedChart>
        </ResponsiveContainer>
      </Card>

      <FitnessReview completedDays={completedDays}/>
      
      <Tips/>
    </div>
  );
}
