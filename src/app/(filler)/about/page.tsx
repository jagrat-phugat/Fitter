"use client";

import {
  Dumbbell,
  Activity,
  CheckCircle,
  LogIn,
  Calendar,
  RefreshCcw,
} from "lucide-react";

function FeatureItem({
  icon: Icon,
  text,
  color,
}: {
  icon: React.ElementType;
  text: string;
  color: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <Icon className={`w-5 h-5 ${color}`} />
      <span className="text-white">{text}</span>
    </li>
  );
}

function Section({
  title,
  children,
  center = true,
}: {
  title: string;
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <div
      className={`max-w-2xl mb-12 ${center ? "text-center" : ""}`}
    >
      <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
      {children}
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-600 flex flex-col items-center py-12 px-6 text-white">
      <Section title="About Us">
        <p className="text-lg">
          Welcome to our about page! Here you can learn more about our mission,
          values, and the team behind our project.
        </p>
      </Section>

      <Section title="Our Mission">
        <p className="text-lg">
          Our mission is to provide the best service possible while ensuring
          customer satisfaction and continuous improvement in everything we do.
        </p>
      </Section>

      <Section title="Our Features">
        <ul className="space-y-4 text-left">
          <FeatureItem
            icon={CheckCircle}
            text="High quality service"
            color="text-green-600"
          />
          <FeatureItem
            icon={Activity}
            text="Progressive activity tracking"
            color="text-blue-600"
          />
          <FeatureItem
            icon={Dumbbell}
            text="Free tools like BMI Calculator & Protein Intake Calculator"
            color="text-purple-600"
          />
          <FeatureItem
            icon={LogIn}
            text="Seamless SignIn/SignOut with Clerk"
            color="text-orange-600"
          />
          <FeatureItem
            icon={Calendar}
            text="Daily workout planning with a prepared diet plan"
            color="text-pink-600"
          />
          <FeatureItem
            icon={RefreshCcw}
            text="Regularly updated workout plans"
            color="text-indigo-600"
          />
        </ul>
      </Section>
    </div>
  );
}
