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

export const doctorNavItems: NavSection[] = [
    {
        title: "Patient Management",
        items: [
            {
                title: "Appointments",
                href: "/doctor/dashboard/appoinments",
                icon: "Calendar", // ✅ String
                badge: "3",
                roles: ["GUIDE"],
            },
            {
                title: "My Schedules",
                href: "/doctor/dashboard/my-schedules",
                icon: "Clock", // ✅ String
                roles: ["GUIDE"],
            },
            {
                title: "Prescriptions",
                href: "/doctor/dashboard/prescriptions",
                icon: "FileText", // ✅ String
                roles: ["GUIDE"],
            },
        ],
    }
]

export const patientNavItems: NavSection[] = [
    {
        title: "Appointments",
        items: [
            {
                title: "My Appointments",
                href: "/dashboard/my-appointments",
                icon: "Calendar", // ✅ String
                roles: ["TOURIST"],
            },
            {
                title: "Book Appointment",
                href: "/consultation",
                icon: "ClipboardList", // ✅ String
                roles: ["TOURIST"],
            },
        ],
    },
    {
        title: "Medical Records",
        items: [
            {
                title: "My Prescriptions",
                href: "/dashboard/my-prescriptions",
                icon: "FileText", // ✅ String
                roles: ["TOURIST"],
            },
            {
                title: "Health Records",
                href: "/dashboard/health-records",
                icon: "Activity", // ✅ String
                roles: ["TOURIST"],
            },
        ],
    },

]

export const adminNavItems: NavSection[] = [
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/admin/dashboard/admins-management",
                icon: "Shield", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Doctors",
                href: "/admin/dashboard/doctors-management",
                icon: "Stethoscope", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Patients",
                href: "/admin/dashboard/patients-management",
                icon: "Users", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    },
    {
        title: "Hospital Management",
        items: [
            {
                title: "Appointments",
                href: "/admin/dashboard/appointments-management",
                icon: "Calendar", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Schedules",
                href: "/admin/dashboard/schedules-management",
                icon: "Clock", // ✅ String
                roles: ["ADMIN"],
            },
            {
                title: "Specialities",
                href: "/admin/dashboard/specialities-management",
                icon: "Hospital", // ✅ String
                roles: ["ADMIN"],
            },
        ],
    }
]

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
    const commonNavItems = getCommonNavItems(role);

    switch (role) {
        case "ADMIN":
            return [...commonNavItems, ...adminNavItems];
        case "GUIDE":
            return [...commonNavItems, ...doctorNavItems];
        case "TOURIST":
            return [...commonNavItems, ...patientNavItems];
        default:
            return [];
    }
}