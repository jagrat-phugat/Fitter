"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Weight,
  Ruler,
  Venus,
  BarChart3,
  Dumbbell,
  Flame,
  Activity,
  Zap,
  Target,
  SplitSquareHorizontal,
  ArrowBigLeft,
  ArrowBigRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const textFields = [
  { label: "Age (in years)", icon: User, name: "age", placeholder: "Enter your age" },
  { label: "Weight (in kgs)", icon: Weight, name: "weight", placeholder: "Enter your weight" },
  { label: "Height (in cms)", icon: Ruler, name: "height", placeholder: "Enter your height" },
  { label: "Your BMI", icon: BarChart3, name: "bmi", placeholder: "Enter your BMI" },
];

const selectFields = [
  {
    label: "Gender",
    icon: Venus,
    name: "gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
  {
    label: "Tell us your goal",
    icon: Target,
    name: "goal",
    options: [
      { label: "Fat Loss", value: "fatloss" },
      { label: "Gain Muscle", value: "musclegain" },
      { label: "Lean Muscle Gain", value: "leanmuscle" },
      { label: "Gain Weight", value: "weightgain" },
      { label: "Lose Weight", value: "weightloss" },
    ],
  },
  {
    label: "Tell us about your body",
    icon: Activity,
    name: "bodyType",
    options: [
      { label: "Ectomorph", value: "ectomorph" },
      { label: "Endomorph", value: "endomorph" },
      { label: "Mesomorph", value: "mesomorph" },
    ],
  },
  {
    label: "Workout Intensity (Per Week)",
    icon: Flame,
    name: "intensity",
    options: [
      { label: "Low (1-3)", value: "1-3" },
      { label: "Medium (3-5)", value: "3-5" },
      { label: "High (5-7)", value: "5-7" },
    ],
  },
  {
    label: "Focus Area",
    icon: Zap,
    name: "focusArea",
    options: [
      { label: "Cardio", value: "cardio" },
      { label: "Strength Training", value: "strengthtraining" },
      { label: "Mix of Both", value: "cardioandstrengthtraining" },
    ],
  },
  {
    label: "Where do you Workout",
    icon: SplitSquareHorizontal,
    name: "workoutPlace",
    options: [
      { label: "Gym", value: "gym" },
      { label: "At Parks/Gardens", value: "parks" },
      { label: "At Home", value: "home" },
    ],
  },
];

export default function PlanGeneratorForm() {
  const router = useRouter()

  const [form, setForm] = useState({
    age: "",
    weight: "",
    height: "",
    gender: "male",
    bmi: "",
    goal: "",
    bodyType: "",
    pushups: "",
    pullups: "",
    squats: "",
    crunches: "",
    intensity: "1",
    focusArea: "",
    workoutPlace: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("api/formSubmit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Plan Created Successfully!")
    } else {
      console.error("Failed to create plan");
    }
  };

  return (
    
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-6">
      <div>
      <div className="p-4">
                <Link href="/plan">
                <Button className="bg-black hover:bg-gray-700 w-[200px] text-xl gap-4 h-[50px] rounded-3xl text-white font-bold">
                  Go To Plan
                  <ArrowBigRight/>
                </Button>
                </Link>
      </div>
      <div className="w-full bg-gradient-to-b from-gray-600 to-gray-700 via-gray-800 p-8 rounded-2xl shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">
            Welcome! Create your personalized plan here.
          </h1>
          <p className="text-white">
            Just fill out the form below to get started on your journey towards a better you!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {textFields.map(({ label, icon: Icon, name, placeholder }) => (
            <div key={name}>
              <Label className="flex items-center gap-2 text-sm font-medium text-white">
                <Icon size={18} /> {label}
              </Label>
              <Input
                type="number"
                required
                name={name}
                value={form[name as keyof typeof form]}
                onChange={handleChange}
                placeholder={placeholder}
                className="mt-1 text-white"
              />
            </div>
          ))}

          {selectFields.map(({ label, icon: Icon, name, options }) => (
            <div key={name}>
              <Label className="flex items-center gap-2 text-sm font-medium text-white">
                <Icon size={18} /> {label}
              </Label>
              <Select
              required
                value={form[name as keyof typeof form]}
                onValueChange={(value) => handleSelectChange(name, value)}
              >
                <SelectTrigger className="w-full mt-1 text-white">
                  <SelectValue placeholder={label} />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-sm font-medium text-white">
              <Dumbbell size={18} /> Your Fitness Count
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {["pushups", "pullups", "squats", "crunches"].map((item) => (
                <Input
                required
                className="mt-2 text-white"
                  key={item}
                  type="number"
                  name={item}
                  value={form[item as keyof typeof form]}
                  onChange={handleChange}
                  placeholder={item.charAt(0).toUpperCase() + item.slice(1)}
                />
              ))}
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" 
            className="w-full h-[50px] rounded-2xl text-white font-semibold"
            >
            Create Plan
            </Button>
            <div className="pt-4">
                <Link href="/plan">
                <Button className="w-full h-[50px] rounded-2xl text-white font-bold">
                  Go To Plan
                </Button>
                </Link>
              </div>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}
