"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp, Dumbbell, Salad, CheckCheck } from "lucide-react";
import NoPlan from "./noPlan";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const todayStr = new Date().toISOString().split("T")[0];
const todayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

type DayPlan = {
  day: string;
  diet: string;
  workout: string;
};

type Plan = {
  week: DayPlan[];
};

export default function ShowPlan({ userId }: { userId: string }) {
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  const currentDay = dayNames[today.getDay()];

  const [plan, setPlan] = useState<Plan | null>(null);
  const [expandedDay, setExpandedDay] = useState<string | null>(currentDay);
  const [progress, setProgress] = useState({ workoutDone: false, dietDone: false });

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await fetch(`/api/plan?userId=${userId}`);
      const data = await res.json();
      if(res.ok) {
      setPlan(data);
      return;
      }
    };
    fetchPlan();
  }, [userId]);

  useEffect(() => {
    const fetchProgress = async () => {
      const res = await fetch(`/api/progress?date=${todayStr}`);
      const data = await res.json();
      if (data) setProgress({ workoutDone: data.workoutDone, dietDone: data.dietDone });
    };
    fetchProgress();
  }, []);

  const handleCheck = async (type: "workout" | "diet") => {
    const updated = { ...progress, [`${type}Done`]: !progress[`${type}Done`] };
    setProgress(updated);
    await fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: todayStr, ...updated }),
    });
  };

  const toggleDay = (day: string) => {
    setExpandedDay((prev) => (prev === day ? null : day));
  };

  if (!plan) return <NoPlan />;

  return (
    <div className="max-w-full mx-auto px-4 py-6 space-y-4 bg-gradient-to-b from-gray-600 to-gray-800 via-gray-700">
      <div className="p-4">
        <Link href="/progress">
        <Button className="text-white w-[200px] bg-black hover:bg-zinc-900">
          View Progress
        </Button>
        </Link>
      </div>
      {plan.week.map(({ day, diet, workout }) => {
        const isOpen = expandedDay === day;
        const isToday = day === todayName;

        return (
          <Card
            key={day}
            className="p-4 rounded-xl bg-white shadow border border-gray-200"
          >
            <div
              onClick={() => toggleDay(day)}
              className="flex items-center justify-between cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                {isToday && <CheckCheck className="text-green-600 w-4 h-4" />}
                {day}
              </h2>
              {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </div>

            {isOpen && (
              <div className="mt-4 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-blue-600 font-semibold text-sm">
                    <div className="flex items-center gap-2">
                      <Salad className="w-4 h-4" />
                      <span>Diet Plan</span>
                    </div>
                    {isToday && (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="diet"
                          checked={progress.dietDone}
                          onCheckedChange={() => handleCheck("diet")}
                        />
                        <Label htmlFor="diet" className="text-gray-700 text-xs">
                          Mark as done
                        </Label>
                      </div>
                    )}
                  </div>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-black">{children}</strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-1">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-sm text-gray-700">{children}</li>
                      ),
                    }}
                  >
                    {diet}
                  </ReactMarkdown>
                </div>

                <div>
                  <div className="flex items-center justify-between text-green-600 font-semibold text-sm">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4" />
                      <span>Workout Plan</span>
                    </div>
                    {isToday && (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="workout"
                          checked={progress.workoutDone}
                          onCheckedChange={() => handleCheck("workout")}
                        />
                        <Label htmlFor="workout" className="text-gray-700 text-xs">
                          Mark as done
                        </Label>
                      </div>
                    )}
                  </div>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => (
                        <p className="text-sm text-gray-700 mt-1 leading-relaxed">{children}</p>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-black">{children}</strong>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-1">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-1">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-sm text-gray-700">{children}</li>
                      ),
                    }}
                  >
                    {workout}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </Card>
        );
      })}
      <div className="pt-4">
        <Link href="/progress">
        <Button className="text-white rounded-2xl w-full h-[50px] bg-black hover:bg-zinc-900">
          View Progress
        </Button>
        </Link>
      </div>
    </div>
    
  );
}
