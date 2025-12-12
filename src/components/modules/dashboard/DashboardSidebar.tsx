import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { NavSection } from "@/types/dashboard.interface";
import DashboardSidebarContent from "../dashboard/DashboardSidebarContent"
import { getMyProfile } from "@/services/commmon/myProfile";

const DashboardSidebar = async () => {
  const profile = await getMyProfile()
  // console.log(profile)
 let currentRole = profile?.data?.role; // Expected: "TOURIST", "GUIDE", "ADMIN"
  const lowerCaseRole = currentRole?.toLowerCase(); 
  const userData = profile && lowerCaseRole ? profile?.data[lowerCaseRole] : null;
  console.log(userData)
  if (currentRole === 'GUIDE') {
      // Check the 'isVerified' property on the guide data
      // Note: Ensure your backend returns 'isVerified' inside profile.data.guide
      if (userData && !userData.isVerified) {
          currentRole = 'TOURIST';
      }
  }
const userInfo={
    email: "",
    name: userData ? userData?.name : "user",
    role: currentRole
  }
  // console.log({currentRole})
  const navItems: NavSection[] = getNavItemsByRole(currentRole);
  const dashboardHome = getDefaultDashboardRoute(currentRole);
  

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;