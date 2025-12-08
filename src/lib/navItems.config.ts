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
    ]
}

export const guideNavItems: NavSection[] = [
    {
        title: "Tour Management",
        items: [
            {
                title: "My Listings",
                href: "/dashboard/listings",
                icon: "MapPin", // updated for tours
                roles: ["GUIDE"],
            },
            {
                title: "Bookings",
                href: "/dashboard/bookings",
                icon: "CalendarCheck", // bookings icon
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
                title: "Upcoming Trips",
                href: "/dashboard/my-trips/upcoming",
                icon: "Calendar", // upcoming trips icon
                roles: ["TOURIST"],
            },
            {
                title: "Past Trips",
                href: "/dashboard/my-trips/past",
                icon: "Clock", // past trips icon
                roles: ["TOURIST"],
            },
            {
                title: "Wishlist",
                href: "/dashboard/wishlist",
                icon: "Heart", // wishlist icon
                roles: ["TOURIST"],
            },
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
                title: "Tourists",
                href: "/admin/dashboard/tourists-management",
                icon: "Users",
                roles: ["ADMIN"],
            },
            {
                title: "Guides",
                href: "/admin/dashboard/guides-management",
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
                href: "/admin/dashboard/listings-management",
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