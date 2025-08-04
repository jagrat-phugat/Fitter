"use client";

import { useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Activity } from "lucide-react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const bmiValue =
        parseFloat(weight) / (heightInMeters * heightInMeters);
      setBmi(bmiValue.toFixed(2));
    } else {
      alert("Please fill in all fields.");
    }
  };

  const isUnhealthy =
    bmi !== "" && (parseFloat(bmi) < 18 || parseFloat(bmi) > 25);

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-inner mb-6">
      <h4 className="text-xl font-semibold mb-1 text-black">
        BMI Calculator
      </h4>
      <p className="text-black text-sm mb-4">
        Calculate your Body Mass Index here
      </p>

      <Label className="block mb-1">Height (in cm)</Label>
      <Input
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        className="mb-3"
      />

      <Label className="block mb-1">Weight (in kg)</Label>
      <Input
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="mb-4"
      />

      <Button
        onClick={calculateBMI}
        className="w-full bg-gray-500 hover:bg-gray-800 text-white font-semibold flex items-center justify-center gap-2"
      >
        <Activity className="w-4 h-4" />
        Calculate BMI
      </Button>

      {bmi && (
        <div
          className={`mt-6 text-center p-3 rounded-lg`}
        >
          <h4
            className={`text-lg font-bold ${
              isUnhealthy ? "text-red-400" : "text-green-600"
            }`}
          >
            Your BMI is: {bmi}
            <p>
              {isUnhealthy
                ? "This indicates that you may be underweight or overweight. Please consult a healthcare professional for advice."
                : "Congrats! Your BMI is within the healthy range."}
            </p>
          </h4>
        </div>
      )}
    </div>
  );
}
