import { auth } from "@/auth";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav";
import connectdb from "@/lib/db";
import userModel from "@/models/user.model";
import { redirect } from "next/navigation";

const Home = async () => {
  await connectdb();

  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const dbUser = await userModel
    .findById(session.user.id)
    .lean(); 

  if (!dbUser) {
    redirect("/login");
  }

  const incomplete =
    !dbUser.mobile ||
    !dbUser.role ||
    (dbUser.role === "user" && !dbUser.mobile);

  if (incomplete) {
    return <EditRoleMobile />;
  }

const user = {
  id: dbUser._id.toString(),   
  name: dbUser.name,
  email: dbUser.email,
  role: dbUser.role,
  image: dbUser.image ?? undefined,
  mobile: dbUser.mobile ?? undefined,
};

  return (
    <div>
      <Nav user = {user}/>
    </div>
  );
};

export default Home;
