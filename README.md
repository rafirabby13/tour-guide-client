
#  GuideNest - Client 🌍



## https://tour-guide-client-lake.vercel.app/

GuideNest is a premium travel platform connecting curious travelers with passionate local experts. We believe the best way to see the world is through the eyes of someone who calls it home.

This repository contains the Next.js Frontend application, designed with a focus on immersive visuals, seamless user experience, and high-performance server-side rendering.
## ✨ Key Features

### Immersive Discovery:

- Hero Search Engine: "Smart" search that filters by City, Country, or Title simultaneously.
- Masonry City Directory: visually stunning grid of popular destinations derived dynamically from tour data.
- Advanced Filtering: Filter tours by price range, duration, and availability.

### User Roles & Dashboards:
- Tourists: Book trips, manage itineraries, and leave reviews.

- Guides: Apply to become a guide (with Admin approval workflow), manage bookings, and create tour listings.

- Admins: Comprehensive dashboard for managing users, approving guides, and overseeing platform activity.

### Authentication & Security:

- Secure Login/Register with JWT integration.

- Role-based route protection (Middleware).

### Modern UI/UX: 
- Glassmorphism Design: Premium frosted glass effects on cards and modals.

- Micro-interactions: Smooth hover states, loading skeletons, and toast notifications (Sonner).

- Responsive: Fully optimized for mobile, tablet, and desktop.
## 🛠️ Tech Stack




*  Framework: Next.js 15 (App Router)

*  Language: TypeScript

*  Styling: Tailwind CSS

*  UI Components: shadcn/ui (Radix Primitives)

*  Icons: Lucide React

*  State Management: React Server Actions & Hooks

*  Forms: React Hook Form + Zod Validation

*  Package Manager: Bun (Recommended) or NPM/Yarn

### Deployment

*  Render (Backend)

*  Vercel (frontend)
## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

* Node.js (v18 or higher)

* Bun (Optional, but recommended for speed)

### 2. Installation
* git clone https://github.com/your-username/tour-guide-client.git

-- cd tour-guide-client

*  Using Bun (Recommended)

-- bun install

*  Or using NPM

-- npm install
## 📁 Project Structure


```
src/
├─ app/
│  ├─ (commonLayout)/
│  │  ├─ (auth)/
│  │  │  ├─ forget-password/
│  │  │  ├─ login/
│  │  │  │  └─ page.tsx
│  │  │  ├─ register/
│  │  │  │  └─ page.tsx
│  │  │  └─ reset-password/
│  │  ├─ cities/
│  │  │  └─ page.tsx
│  │  ├─ guides/
│  │  │  └─ [id]/
│  │  │     └─ page.tsx
│  │  ├─ tours/
│  │  │  ├─ [id]/
│  │  │  │  └─ page.tsx
│  │  │  └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ (dashboardLayout)/
│  │  ├─ (touristDashboardLayout)/
│  │  │  └─ dashboard/
│  │  │     ├─ become-a-guide/
│  │  │     │  └─ page.tsx
│  │  │     ├─ book-a-trip/
│  │  │     │  └─ page.tsx
│  │  │     ├─ my-bookings/
│  │  │     │  └─ page.tsx
│  │  │     ├─ my-reviews/
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ admin/
│  │  │  └─ dashboard/
│  │  │     ├─ booking-management/
│  │  │     ├─ create-admin/
│  │  │     │  └─ page.tsx
│  │  │     ├─ create-guide/
│  │  │     │  └─ page.tsx
│  │  │     ├─ tour-management/
│  │  │     │  └─ page.tsx
│  │  │     ├─ users-management/
│  │  │     │  └─ page.tsx
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ change-password/
│  │  │  └─ page.tsx
│  │  ├─ guide/
│  │  │  └─ dashboard/
│  │  │     ├─ bookings/
│  │  │     │  └─ page.tsx
│  │  │     ├─ create-tour/
│  │  │     │  └─ page.tsx
│  │  │     ├─ tour-listings/
│  │  │     │  └─ page.tsx
│  │  │     ├─ tours/
│  │  │     │  └─ page.tsx
│  │  │     ├─ layout.tsx
│  │  │     └─ page.tsx
│  │  ├─ my-profile/
│  │  │  └─ page.tsx
│  │  └─ layout.tsx
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ not-found.tsx
├─ components/
│  ├─ modules/
│  │  ├─ admin/
│  │  │  ├─ CraeteAdmin.tsx
│  │  │  ├─ CreateGuide.tsx
│  │  │  ├─ TourManagementTable.tsx
│  │  │  └─ UserManagementTable.tsx
│  │  ├─ auth/
│  │  │  ├─ login-form.tsx
│  │  │  └─ register-form.tsx
│  │  ├─ dashboard/
│  │  │  ├─ DashboardMobileSidebar.tsx
│  │  │  ├─ DashboardNavbar.tsx
│  │  │  ├─ DashboardNavbarContent.tsx
│  │  │  ├─ DashboardSidebar.tsx
│  │  │  ├─ DashboardSidebarContent.tsx
│  │  │  └─ UserDropdown.tsx
│  │  ├─ guide/
│  │  │  ├─ CreateTourForm.tsx
│  │  │  ├─ EditTourModal.tsx
│  │  │  ├─ GuideBookingsTable.tsx
│  │  │  ├─ MyListingToursTable.tsx
│  │  │  └─ tour.schema.ts
│  │  ├─ home/
│  │  │  ├─ Categories.tsx
│  │  ├─ profile/
│  │  │  ├─ ChangePassword.tsx
│  │  │  ├─ EditProfileModal.tsx
│  │  │  └─ ProfileContent.tsx
│  │  ├─ tourist/
│  │  │  ├─ BecomeAGuideForm.tsx
│  │  │  ├─ MyBookingsTable.tsx
│  │  │  ├─ ReviewDialog.tsx
│  │  │  └─ TourBookingForm.tsx
│  │  └─ tours/
│  │     ├─ ToursFilter.tsx
│  │     ├─ ToursGrid.tsx
│  │     └─ ToursHeader.tsx
│  ├─ shared/
│  │  ├─ alert/
│  │  │  ├─ DeleteConfirmationDialog.tsx
│  │  │  ├─ EditUserDialog.tsx
│  │  │  └─ UpdateStatusDialogue.tsx
│  │  ├─ buttons/
│  │  │  ├─ LogoutButton.tsx
│  │  │  └─ RefreshButton.tsx
│  │  ├─ filters/
│  │  │  ├─ SearchFilter.tsx
│  │  │  └─ SelectFilter.tsx
│  │  ├─ home/
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Navbar.tsx
│  │  │  ├─ NavbarServer.tsx
│  │  │  └─ SectionHeader.tsx
│  │  ├─ multi-select/
│  │  │  └─ MultiSelectField.tsx
│  │  ├─ pages/
│  │  │  └─ ManagementPageHeader.tsx
│  │  ├─ tables/
│  │  │  ├─ ManagementTables.tsx
│  │  └─ toast/
│  │     └─ LogoutSuccessToast.tsx
│  ├─ ui/
│  │  ├─ alert-dialog.tsx
│  └─ carousel-01.tsx
├─ helper/
│  ├─ getCurrentTimeStr.ts
│  └─ minToTime.ts
├─ hooks/
│  └─ useDebounce.ts
├─ lib/
│  ├─ auth-utils.ts
├─ services/
│  ├─ admin/
│  │  ├─ createAdmin.ts
│  ├─ auth/
│  │  ├─ getUserInfo.ts
│  ├─ commmon/
│  │  ├─ changePassword.ts
│  ├─ guide/
│  │  ├─ booking.ts
│  ├─ payment/
│  │  └─ initiatePayment.ts
│  └─ tourist/
│     ├─ becomeAGuide.ts
├─ types/
│  ├─ dashboard.interface.ts
└─ proxy.ts


```

## Contact Information
- Email: rafiahmedrabby282@gmail.com
- Phone: +880 1894 356001
- Location: Dhaka, Bangladesh
- LinkedIn: Rafi Ahmed Rabby
- GitHub: rafirabby13
## Built with passion by Rafi Ahmed | TypeScript Expert & Full-Stack Developer




<!-- ![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png) -->

