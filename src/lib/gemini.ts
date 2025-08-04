import {GoogleGenAI} from "@google/genai"

const AI = new GoogleGenAI({
    apiKey:process.env.GEMINI_API_KEY!,
})


export async function generatePlan(data: any) {
  const prompt = `
You are an expert in Fitness Training and Diet Planning. You provide best services to your customer, whiever provides you the details about him/her.
Generate a 7-day fitness and diet plan based on:
Age: ${data.age}, Gender: ${data.gender}, Height: ${data.height} cm, Weight: ${data.weight} kg,
BMI: ${data.bmi}, Goal: ${data.goal}, Body Type: ${data.bodyType}, 
Pushups: ${data.pushups}, Pullups: ${data.pullups}, Squats: ${data.squats}, Crunches: ${data.crunches},
Workout Intensity: ${data.intensity}, Focus Area: ${data.focus}, Workout Place: ${data.workoutPlace}

Response format:
{
  "week": [
    {
      "day": "Monday",
      "workout": "...",
      "diet": "..."
    },
    ...
  ],
  "important_tips" : [
  {
    "proper_warmup" : "...",
    "cooldown" : "...",
    "sleep" : "...",
    "hydration" : "...",
    "prevention_of_injury" : "..."
  }
  ]
}`


  const response = await AI.models.generateContent({
    model: "gemini-2.5-pro",
    contents: prompt
  })

  const textResponse = response.candidates?.[0]?.content?.parts?.[0]?.text

  if(!textResponse) {
    return {error: "Empty Response from Gemini"}
  }

  if(!textResponse) {
    return {error: "Empty Response from Gemini"}
  }

  try {
        const firstBrace = textResponse.indexOf("{")
        const lastBrace = textResponse.lastIndexOf("}")
        const jsonString = textResponse.slice(firstBrace, lastBrace+1)

        const parsedResponse = JSON.parse(jsonString)
        return parsedResponse
  } catch (err) {
    console.error("Failed tp parse Gemini Response as JSON", err);
    return {err : "Invalid JSON response"}
    
  }


}
