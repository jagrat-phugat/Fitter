"use server"

import { NextResponse } from 'next/server'
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from '@prisma/client'
import { generatePlan } from '@/lib/gemini'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body
  try {
    body = await req.json()
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  if (
    !body.age || !body.weight || !body.height || !body.gender ||
    !body.bmi || !body.goal || !body.bodyType ||
    body.pushups === undefined || body.pullups === undefined ||
    body.squats === undefined || body.crunches === undefined ||
    !body.intensity || !body.focusArea || !body.workoutPlace
  ) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const prismaData = {
  age: parseInt(body.age),
  weight: parseInt(body.weight),
  height: parseInt(body.height),
  bmi: parseFloat(body.bmi),
  gender: body.gender,
  goal: body.goal,
  bodyType: body.bodyType,
  intensity: body.intensity,
  focusArea: body.focusArea,
  workoutPlace: body.workoutPlace,
  pushups: parseInt(body.pushups),
  pullups: parseInt(body.pullups),
  squats: parseInt(body.squats),
  crunches: parseInt(body.crunches),
}

  const existing = await prisma.userForm.findUnique({
    where: { id: userId }
  })

  const form = existing
    ? await prisma.userForm.update({
        where: { id: userId },
        data: prismaData,
      })
    : await prisma.userForm.create({
        data: { ...prismaData, id: userId },
      })

  const planContent = await generatePlan(form)

  if (planContent.error || planContent.err) {
    return NextResponse.json({ error: planContent.error || planContent.err })
  }

  const plan = await prisma.plan.upsert({
    where: { userFormId: userId },
    update: { content: planContent },
    create: { content: planContent, userFormId: userId },
  })

  return NextResponse.json({success: true}, {status: 201})
}
