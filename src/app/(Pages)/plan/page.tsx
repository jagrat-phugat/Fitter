import { auth } from "@clerk/nextjs/server";
import NoLogin from "./_components/noLogin";
import ShowPlan from "./_components/showPlan";



export default async function PlanPage() {

  const { userId } = await auth();
  if (!userId) return (
        <NoLogin/>
  )


  return (
    <div className="bg-black">
    <ShowPlan userId = {userId}/>
    </div>
  );
}
