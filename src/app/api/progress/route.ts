import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { DailyProgress } from "@prisma/client"

type DailyProgress = Awaited<ReturnType<typeof prisma.dailyProgress.findFirst>>;

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const rawDates = url.searchParams.get("dates");

  if (!rawDates) {
    return NextResponse.json({ error: "Missing dates parameter" }, { status: 400 });
  }

  const dateList = rawDates.split(",");
  const datesAsISO = dateList.map((d) => new Date(d).toISOString().split("T")[0]);

  const records: NonNullable<DailyProgress>[] = await prisma.dailyProgress.findMany({
    where: {
      userId,
      date: {
        in: dateList.map((d) => new Date(d)),
      },
    },
  });

  const result = datesAsISO.map((dateStr) => {
    const record = records.find((r: DailyProgress) => r.date.toISOString().split("T")[0] === dateStr);
    const dateObj = new Date(dateStr);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    return {
      date: dateStr,
      day: dayName,
      workoutDone: record?.workoutDone ?? false,
      dietDone: record?.dietDone ?? false,
    };
  });

  return NextResponse.json(result);
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { date, workoutDone, dietDone } = await req.json();

  if (!date) {
    return NextResponse.json({ error: "Missing date" }, { status: 400 });
  }

  const parsedDate = new Date(date);
  const dayName = parsedDate.toLocaleDateString("en-US", { weekday: "long" });

  try {
    const existing = await prisma.dailyProgress.findUnique({
      where: { date: parsedDate },
    });

    let result;
    if (existing) {
      result = await prisma.dailyProgress.update({
        where: { date: parsedDate },
        data: {
          workoutDone,
          dietDone,
        },
      });
    } else {
      result = await prisma.dailyProgress.create({
        data: {
          userId,
          date: parsedDate,
          day: dayName,
          workoutDone,
          dietDone,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("POST /api/progress error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
