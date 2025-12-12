import { UserInfo } from "@/types/user.interface";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import DashboardNavbarContent from "../dashboard/DashboardNavbarContent";
import { getMyProfile } from "@/services/commmon/myProfile";

const DashboardNavbar = async () => {
  const profile = await getMyProfile()
  console.log(profile)
  const role = profile?.data?.role; // Expected: "TOURIST", "GUIDE", "ADMIN"
  const lowerCaseRole = role?.toLowerCase();
  const userData = profile && lowerCaseRole ? profile?.data[lowerCaseRole] : null;
  // as UserInfo;
  // console.log(lowerCaseRole,userData)
  const userInfo = {
    email: "",
    name: userData.name,
    role
  }
  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;