"use client";

import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <Card className="shadow-lg p-6 flex flex-col items-center gap-4">
        <Loader2 className="h-10 w-10 animate-spin text-white" />
        <CardContent className="text-lg font-semibold text-white">
          Loading, please wait...
        </CardContent>
      </Card>
    </div>
  );
}
