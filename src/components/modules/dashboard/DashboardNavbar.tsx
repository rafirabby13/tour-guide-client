
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import DashboardNavbarContent from "../dashboard/DashboardNavbarContent";
import { getMyProfile } from "@/services/commmon/myProfile";

const DashboardNavbar = async () => {
  const profile = await getMyProfile()
  // console.log({ profile })
  const role = profile?.data?.role; // Expected: "TOURIST", "GUIDE", "ADMIN"
  // console.log({ role })
  const lowerCaseRole = role?.toLowerCase();
  const userData = profile && lowerCaseRole ? profile?.data[lowerCaseRole] : null;
  // console.log({ userData })
  // as UserInfo;
  // console.log(lowerCaseRole,userData)
  const userInfo = {
    email: "",
    name: userData ? userData?.name : "user",
    role
  }
  const navItems = getNavItemsByRole(role);
  const dashboardHome = getDefaultDashboardRoute(role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;