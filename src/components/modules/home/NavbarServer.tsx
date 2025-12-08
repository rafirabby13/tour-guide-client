import { getCookie } from "@/services/auth/tokenHandlers";
import Navbar from "./Navbar";

// Server component
export default async function NavbarServer() {
  const accessToken = await getCookie("accessToken")

  return <Navbar accessToken={accessToken} />;
}
