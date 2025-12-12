
import Navbar from "./Navbar";
import { getMyProfile } from "@/services/commmon/myProfile";

// Server component
export default async function NavbarServer() {


  const profile = await getMyProfile()
  console.log(profile?.data)

  return <Navbar profile={profile?.data || []} />;
}
