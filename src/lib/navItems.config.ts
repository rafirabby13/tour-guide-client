""
import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
    const defaultDashboard = getDefaultDashboardRoute(role);

    return [
        {
            items: [
                {
                    title: "Dashboard",
                    href: defaultDashboard,
                    icon: "LayoutDashboard",
                    roles: ["GUIDE", "TOURIST", "ADMIN"],
                },
                {
                    title: "My Profile",
                    href: `/my-profile`,
                    icon: "User",
                    roles: ["GUIDE", "TOURIST", "ADMIN"],
                },

            ]
        }

    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "Create A Tour",
                href: "/guide/dashboard/create-tour",
                icon: "MapPin", // updated for tours
                roles: ["GUIDE"],
            },
            {
                title: "My Listings",
                href: "/guide/dashboard/tour-listings",
                icon: "MapPin", // updated for tours
                roles: ["GUIDE"],
            },
            {
                title: "Bookings",
                href: "/guide/dashboard/bookings",
                icon: "CalendarCheck", // bookings icon
                roles: ["GUIDE"],
            },
        ],
    },
    {
        title: "Settings",
        items: [
            {
                title: "Change Password",
                href: "/change-password",
                icon: "Settings", // ✅ String
                roles: ["GUIDE"],
            },
        ],
    },
];
export const touristNavItems: NavSection[] = [
  
    {
        title: "My Trips",
        items: [
            {
                title: "My Bookings",
                href: "/dashboard/my-bookings",
                icon: "Calendar", // upcoming trips icon
                roles: ["TOURIST"],
            }
        ],
    },
    {
        title: "My Requests",
        items: [
            {
                title: "Become A Guide",
                href: "/dashboard/become-a-guide",
                icon: "User", // upcoming trips icon
                roles: ["TOURIST"],
            }
        ],
    },
];
export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "All Users",
                href: "/admin/dashboard/users-management",
                icon: "users",
                roles: ["ADMIN"],
            },
            {
                title: "Create Admin",
                href: "/admin/dashboard/create-admin",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "Create Guide",
                href: "/admin/dashboard/create-guide",
                icon: "UserCheck",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Listing Management",
        items: [
            {
                title: "All Tours",
                href: "/admin/dashboard/tour-management",
                icon: "MapPin",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Booking Management",
        items: [
            {
                title: "All Bookings",
                href: "/admin/dashboard/bookings-management",
                icon: "CalendarCheck",
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Requests",
        items: [
            {
                title: "Become Guide Request",
                href: "/admin/dashboard/tour-management",
                icon: "MapPin",
                roles: ["ADMIN"],
            },
        ],
    },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...guideNavItems];
        case "TOURIST":
            return [...commonNavItems, ...touristNavItems];
        default:
            return [];
    }
}