import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import connectdb from "@/lib/db";
import userModel from "@/models/user.model";
import { redirect } from "next/navigation";

const Home = async () => {
  await connectdb();
  const session = await auth();
  console.log(session)
  let dbUser = await userModel.findById(session?.user?.id)

  if(!dbUser){
    redirect("/login")
  }
  
  const incomplete = !dbUser?.mobile || !dbUser?.role || (!dbUser?.mobile && dbUser.role == "user")

  if(incomplete){
    return <EditRoleMobile/>
  }
  
  return <div>

  </div>;
};

export default Home;
