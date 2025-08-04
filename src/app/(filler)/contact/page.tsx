"use client";

import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Github } from "lucide-react";

export default function Contact() {
  const handleLinkedInClick = () => {
    window.location.href = "https://www.linkedin.com/in/jagrat-phugat-916aa4253/";
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:jagratphugat111@gmail.com";
  };

  const handleGitHubClick = () => {
    window.location.href = "https://github.com/jagrat-phugat";
  };

  return (
    <div>
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-700 to-gray-900 p-6">
      <div className="bg-white shadow-lg rounded-2xl max-w-md w-full p-8 text-center border border-gray-500">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Built by <span className="text-blue-600">Jagrat Phugat</span>
        </h1>
        <p className="text-gray-600 mb-8">
          A student at IIT Ropar. Feel free to reach out if you have any questions or feedback.
        </p>

        <div className="flex flex-col gap-4">
          <Button
            onClick={handleLinkedInClick}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white hover:bg-gray-900"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </Button>

          <Button
            onClick={handleEmailClick}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white hover:bg-gray-900"
          >
            <Mail className="w-5 h-5" />
            Email : jagratphugat111@gmail.com
          </Button>

          <Button
            onClick={handleGitHubClick}
            className="flex items-center justify-center gap-2 bg-gray-600 text-white hover:bg-gray-900"
          >
            <Github className="w-5 h-5" />
            GitHub
          </Button>
        </div>
      </div>
    </section>
    </div>
  );
}
