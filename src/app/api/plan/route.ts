import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";




export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  try {
    const planRecord = await prisma.plan.findFirst({
      where: { userFormId:  userId  },
      select: { content: true }, 
    });

    if (!planRecord?.content) {
      return NextResponse.json({ error: "No plan found" }, { status: 404 });
    }

    const parsed = typeof planRecord.content === "string"
      ? JSON.parse(planRecord.content)
      : planRecord.content;

    return NextResponse.json(parsed); 
  } catch (err) {
    console.error("Plan fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


