import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  TrendingUp,
  Flame,
  AlertTriangle,
  CalendarCheck,
} from "lucide-react";
import { useEffect, useState } from "react";

type ProgressDay = {
  day: string;
  date: string;
  workoutDone: boolean;
  dietDone: boolean;
};
export function FitnessReview({ completedDays }: { completedDays: number }) {

    const [monthlyData, setMonthlyData] = useState<ProgressDay[]>([])
    const [averageCompleted, setAverageCompleted] = useState<number | null>(null);

    useEffect(() => {
    const fetchMonthlyProgress = async () => {
      const dates: string[] = [];
      const today = new Date();
      for (let i = 27; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split("T")[0]);
      }

      const res = await fetch(`/api/progress?dates=${dates.join(",")}`);
      const json: ProgressDay[] = await res.json();

      setMonthlyData(json);

      const totalWeeks = 4;
      const totalCompleted = json.filter(
        (d) => d.workoutDone && d.dietDone
      ).length;

      const weeklyAvg = +(totalCompleted / totalWeeks).toFixed(1);
      setAverageCompleted(weeklyAvg);
    };

    fetchMonthlyProgress();
  }, []);
    

  return (
    <>
      <Card className="bg-gray-900 text-white rounded-2xl shadow-md">
        <CardContent className="space-y-3 p-6">
          <div className="flex items-center gap-2 text-blue-400">
            <CalendarCheck className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Weekly Review</h2>
          </div>
          <p className="text-sm text-gray-300">
            You completed <span className="font-bold">{completedDays}</span> of 7
            days this week with both workout and diet tracked.
          </p>
          {completedDays === 7 && (
            <div className="flex items-center gap-2 text-green-400">
              <Flame className="w-5 h-5" />
              <p className="text-sm">
                <strong>Perfect streak!</strong> You're in beast mode. Momentum is your friend now.
              </p>
            </div>
          )}
          {completedDays >= 5 && completedDays < 7 && (
            <div className="flex items-center gap-2 text-lime-400">
              <TrendingUp className="w-5 h-5" />
              <p className="text-sm">
                <strong>Great work!</strong> You've shown consistency. Push for 7 next week!
              </p>
            </div>
          )}
          {completedDays >= 3 && completedDays < 5 && (
            <div className="flex items-center gap-2 text-yellow-400">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-sm">
                You’re halfway there. Recommit and eliminate common distractions.
              </p>
            </div>
          )}
          {completedDays < 3 && (
            <div className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <p className="text-sm">
                Rough week? Reset and bounce back. Start small and stay consistent.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-gray-950 text-white rounded-2xl shadow-md">
        <CardContent className="space-y-3 p-6">
          <div className="flex items-center gap-2 text-purple-400">
            <Award className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Monthly Progress</h2>
          </div>
          {averageCompleted !== null ? (
            <>
              <p className="text-sm text-gray-300">
                Over the last 4 weeks, your average consistency was{" "}
                <span className="font-bold">{averageCompleted}</span> out of 7
                days/week.
              </p>

              {averageCompleted >= 6 && (
                <p className="text-green-400 text-sm">
                  🔥 You’re on a transformation streak. Results are compounding now.
                </p>
              )}
              {averageCompleted >= 4 && averageCompleted < 6 && (
                <p className="text-yellow-300 text-sm">
                  ✅ Good job! Refocus on weaker days (maybe weekends?) to level up.
                </p>
              )}
              {averageCompleted < 4 && (
                <p className="text-red-400 text-sm">
                  ⚠️ You’ve got more in the tank. Reset and rebuild your momentum.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-gray-400">Loading monthly stats...</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
