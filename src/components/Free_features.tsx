"use client";

import { Activity } from "lucide-react";
import BMICalculator from "./BMICalculator";
import FatCalculator from "./FatCalculator";
import DietIntakeCalculator from "./DietIntake";

export default function FreeFeatures() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 via-gray-80 to-gray-900 flex items-center justify-center p-8">
      <div className="w-full max-w-3xl bg-gray-600 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-2">
            <Activity className="w-7 h-7 text-blue-600" />
            Free Features
          </h2>
          <p className="text-white mt-2 text-sm">
            Explore some of our free health calculators.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-500 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <BMICalculator />
          </div>
          <div className="bg-gray-500 rounded-xl p-5 shadow-sm hover:shadow-md transition">
            <FatCalculator />
          </div>
          <div className="bg-gray-500 rounded-xl p-5 shadow-sm hover:shadow-md transition sm:col-span-2">
            <DietIntakeCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}
