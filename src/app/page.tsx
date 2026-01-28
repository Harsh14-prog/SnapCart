import { auth } from "@/auth";
import AdminDashboard from "@/components/AdminDashboard";
import EditRoleMobile from "@/components/EditRoleMobile";
import Nav from "@/components/Nav";
import UserDashboard from "@/components/UserDashboard";
import DeliveryBoy from "@/components/DeliveryBoy";
import HeroSection from "@/components/HeroSection";
import connectdb from "@/lib/db";
import userModel from "@/models/user.model";
import { redirect } from "next/navigation";

const Home = async () => {
  await connectdb();

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const dbUser = await userModel.findById(session.user.id).lean();
  if (!dbUser) redirect("/login");

  const incomplete =
    !dbUser.mobile ||
    !dbUser.role ||
    (dbUser.role === "user" && !dbUser.mobile);

  if (incomplete) return <EditRoleMobile />;

  const user = {
    id: dbUser._id.toString(),
    name: dbUser.name,
    email: dbUser.email,
    role: dbUser.role,
    image: dbUser.image ?? undefined,
    mobile: dbUser.mobile ?? undefined,
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      <Nav user={user} />

      {/* USER HOME */}
      {user.role === "user" && (
        <>
          <HeroSection />
          <div className="max-w-7xl mx-auto px-4 mt-12">
            <UserDashboard />
          </div>
        </>
      )}

      {/* ADMIN */}
      {user.role === "admin" && (
        <div className="mt-32 max-w-7xl mx-auto px-4">
          <AdminDashboard />
        </div>
      )}

      {/* DELIVERY */}
      {user.role === "deliveryBoy" && (
        <div className="mt-32 max-w-7xl mx-auto px-4">
          <DeliveryBoy />
        </div>
      )}
    </div>
  );
};

export default Home;
