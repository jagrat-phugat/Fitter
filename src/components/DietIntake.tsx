"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Activity } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function DietIntakeCalculator() {
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [protein1, setProtein1] = useState("");
  const [protein2, setProtein2] = useState("");
  const [carb1, setCarb1] = useState("");
  const [carb2, setCarb2] = useState("");
  const [fat1, setFat1] = useState("");
  const [fat2, setFat2] = useState("");

  const calculateDiet = () => {
    if(weight && goal) {
      const weightInKg = parseFloat(weight);
      let proteinIntake1, proteinIntake2,
        carbIntake1, carbIntake2, fatIntake1, fatIntake2;

      switch (goal) {
        case "fatloss":
          proteinIntake1 = weightInKg * 1.2;
          proteinIntake2 = weightInKg * 1.6;
          carbIntake1 = weightInKg * 2.5;
          carbIntake2 = weightInKg * 4.3;
          fatIntake1 = weightInKg * 0.3;
          fatIntake2 = weightInKg * 0.7;
          break;
        case "buildmuscle":
          proteinIntake1 = weightInKg * 1.6;
          proteinIntake2 = weightInKg * 2.0; 
          carbIntake1 = weightInKg * 4.5;
          carbIntake2 = weightInKg * 5.4;
          fatIntake1 = weightInKg * 0.8;
          fatIntake2 = weightInKg * 1.0;
          break;
        case "maintain":
          proteinIntake1 = weightInKg * 0.8;
          proteinIntake2 = weightInKg * 1.2;
          carbIntake1 = weightInKg * 4;
          carbIntake2 = weightInKg * 5;
          fatIntake1 = weightInKg * 0.8;
          fatIntake2 = weightInKg * 0.9;
          break;
        default:
          proteinIntake1 = 0;
            proteinIntake2 = 0;
          carbIntake1 = 0;
          carbIntake2 = 0; 
          fatIntake1 = 0;
          fatIntake2 = 0;
      }

      setProtein1(proteinIntake1.toFixed(2));
        setProtein2(proteinIntake2.toFixed(2));
      setCarb1(carbIntake1.toFixed(2));
      setCarb2(carbIntake2.toFixed(2));
      setFat1(fatIntake1.toFixed(2));
      setFat2(fatIntake2.toFixed(2));

    } else {
      alert("Please fill in all fields.");
    }
  };


  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
      <h4 className="text-xl font-semibold mb-1 text-black">
        Diet Requirements
      </h4>
      <p className="text-black text-sm mb-4">
        Calculate your Daily Diet requirement
      </p>

      <Label className="block mb-1">Your Goal</Label>
      <Select onValueChange={(value) => setGoal(value)}>
        <SelectTrigger className="w-full mb-3">
          <SelectValue placeholder="Set your Goal" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fatloss">Loose Fat</SelectItem>
          <SelectItem value="buildmuscle">Build Muscle</SelectItem>
            <SelectItem value="maintain">Maintain</SelectItem>
        </SelectContent>
      </Select>

      <Label className="block mb-1">Weight (in kgs)</Label>
      <Input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="mb-3"
      />

      <Button
        onClick={calculateDiet}
        className="w-full bg-gray-500 hover:bg-gray-800 text-white font-semibold flex items-center justify-center gap-2"
      >
        <Activity className="w-4 h-4" />
        Go !
      </Button>

      {protein1 && protein2 && carb1 && carb2 && fat1 && fat2 && (
        <div
          className="mt-6 text-center p-3 rounded-lg"
        >
          <h4
            className="text-lg font-bold text-yellow-600"
          >
            Your daily Protein requirement is: {protein1} to {protein2} grams.
            Your daily Carb requirement is: {carb1} to {carb2} grams. 
            Your daily Fat requirement is: {fat1} to {fat2} grams.
          </h4>
        </div>
      )}
    </div>
  );
}
