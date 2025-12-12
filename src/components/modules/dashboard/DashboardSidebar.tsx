import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { NavSection } from "@/types/dashboard.interface";
import DashboardSidebarContent from "../dashboard/DashboardSidebarContent"
import { getMyProfile } from "@/services/commmon/myProfile";

const DashboardSidebar = async () => {
  const profile = await getMyProfile()
  // console.log(profile)
  const role = profile?.data?.role; // Expected: "TOURIST", "GUIDE", "ADMIN"
  const lowerCaseRole = role?.toLowerCase(); 
  const userData = profile && lowerCaseRole ? profile?.data[lowerCaseRole] : null;
  // as UserInfo;
  // console.log(lowerCaseRole,userData)
const userInfo={
    email: "",
    name: userData.name,
    role
  }
  const navItems: NavSection[] = getNavItemsByRole(profile?.data?.role);
  const dashboardHome = getDefaultDashboardRoute(profile?.data?.role);
  

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;