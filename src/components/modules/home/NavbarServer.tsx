import { getCookie } from "@/services/auth/tokenHandlers";
import Navbar from "./Navbar";
import { getMyProfile } from "@/services/commmon/myProfile";

// Server component
export default async function NavbarServer() {
  const accessToken = await getCookie("accessToken")


  const profile = await getMyProfile()
  // console.log(profile)

  return <Navbar profile={profile?.data || []} />;
}
