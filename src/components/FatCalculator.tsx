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

export default function FatCalculator() {
  const [age, setAge] = useState("");
  const [BMI, setBMI] = useState("");
  const [gender, setGender] = useState("");
  const [fatPercentage, setFatPercentage] = useState("");

  const calculateFat = () => {
    if (age && BMI && gender) {
      let fatValue;
      if (gender === "male") {
        fatValue = 1.2 * parseFloat(BMI) + 0.23 * parseInt(age) - 16.2;
      } else {
        fatValue = 1.2 * parseFloat(BMI) + 0.23 * parseInt(age) - 5.4;
      }
      setFatPercentage(fatValue.toFixed(2));
    } else {
      alert("Please fill in all fields.");
    }
  };

  const isHighFat =
    fatPercentage !== "" && parseFloat(fatPercentage) > 25;

  return (
    <div className="bg-gray-700 p-4 rounded-lg shadow-inner">
      <h4 className="text-xl font-semibold mb-1 text-black">
        Fat % Calculator
      </h4>
      <p className="text-black text-sm mb-4">
        Calculate your Fat Percentage here
      </p>

      <Label className="block mb-1">Gender</Label>
      <Select onValueChange={(value) => setGender(value)}>
        <SelectTrigger className="w-full mb-3">
          <SelectValue placeholder="Your Gender" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
        </SelectContent>
      </Select>

      <Label className="block mb-1">Age (in years)</Label>
      <Input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="mb-3"
      />

      <Label className="block mb-1">BMI</Label>
      <Input
        type="number"
        value={BMI}
        onChange={(e) => setBMI(e.target.value)}
        className="mb-4"
      />

      <Button
        onClick={calculateFat}
        className="w-full bg-gray-500 hover:bg-gray-800 text-white font-semibold flex items-center justify-center gap-2"
      >
        <Activity className="w-4 h-4" />
        Calculate Fat %
      </Button>

      {fatPercentage && (
        <div
          className={`mt-6 text-center p-3 rounded-lg `}
        >
          <h4
            className={`text-lg font-bold ${
              isHighFat ? "text-red-400" : "text-green-600"
            }`}
          >
            Your Theoretical Fat % is: {fatPercentage}
            <p>
              {isHighFat
                ? "You may want to consult a healthcare provider."
                : "You look healthy!"}
            </p>
          </h4>
        </div>
      )}
    </div>
  );
}
