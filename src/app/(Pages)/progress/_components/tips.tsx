"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Flame,
  Moon,
  Droplet,
  Dumbbell,
  Bolt,
  ShieldCheck,
  TrendingUp,
  Utensils,
} from "lucide-react";

const defaultFitnessTips = {
  proper_warmup: `Always start your workout with a 5–10 minute warmup. This can include light cardio (like jogging or jumping jacks) and dynamic stretches (such as leg swings, arm circles, and hip openers). A warm body reduces risk of injury and prepares your muscles for better performance.`,

  cooldown: `Post-workout cooldown is essential. Spend 5–10 minutes doing static stretches to bring your heart rate down gradually and relax tight muscles. Stretching helps prevent soreness and improves flexibility over time.`,

  sleep: `Aim for 7–9 hours of quality sleep every night. Sleep is when muscle repair and growth happens. Poor sleep leads to slower recovery, reduced performance, and even weight gain due to hormonal imbalance.`,

  hydration: `Stay well-hydrated throughout the day. Aim for 3–4 liters of water, more if you’re training or in a hot climate. Dehydration affects energy levels, muscle recovery, digestion, and even focus.`,

  prevention_of_injury: `Never compromise form for heavier weights. Start with manageable loads, master the technique, and increase gradually (progressive overload). Take rest days seriously and listen to your body's signals — sharp pain is a red flag.`,

  calorie_burning_and_maintenance: `Fat loss = calorie deficit; muscle gain = calorie surplus. Track your food if needed. Combine resistance training with moderate cardio for optimal body recomposition. Don’t crash diet — sustainable habits win.`,

  progressive_overloading: `To build strength and muscle, your body must be challenged. Each week aim to slightly increase weight, reps, or sets. Log your progress and avoid plateauing by changing tempo, rest time, or exercise variation.`,
};

export default function Tips() {
  const tips = [
    {
      title: "Warmup",
      icon: <Bolt className="text-yellow-400 w-5 h-5" />,
      text: defaultFitnessTips.proper_warmup,
    },
    {
      title: "Cooldown",
      icon: <Flame className="text-orange-500 w-5 h-5" />,
      text: defaultFitnessTips.cooldown,
    },
    {
      title: "Sleep",
      icon: <Moon className="text-purple-400 w-5 h-5" />,
      text: defaultFitnessTips.sleep,
    },
    {
      title: "Hydration",
      icon: <Droplet className="text-blue-400 w-5 h-5" />,
      text: defaultFitnessTips.hydration,
    },
    {
      title: "Injury Prevention",
      icon: <ShieldCheck className="text-green-400 w-5 h-5" />,
      text: defaultFitnessTips.prevention_of_injury,
    },
    {
      title: "Calorie Management",
      icon: <Utensils className="text-pink-400 w-5 h-5" />,
      text: defaultFitnessTips.calorie_burning_and_maintenance,
    },
    {
      title: "Progressive Overload",
      icon: <TrendingUp className="text-cyan-400 w-5 h-5" />,
      text: defaultFitnessTips.progressive_overloading,
    },
  ];

  return (
    <div className="max-w-full mx-auto mt-10 px-4">
      <Card className="bg-gray-900 text-white shadow-xl rounded-2xl p-6">
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Dumbbell className="text-green-400 w-6 h-6" />
            Important Fitness Tips
          </h2>
          {tips.map((tip, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-lg font-medium text-white">
                {tip.icon}
                {tip.title}
              </div>
              <p className="text-gray-300 text-sm pl-7">{tip.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
