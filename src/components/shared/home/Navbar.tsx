/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoutButton from "@/components/shared/buttons/LogoutButton";

// GuideNest Navbar
// - Next.js + TypeScript + Tailwind
// - Responsive: desktop, tablet, mobile drawer
// - Avatar dropdown for authenticated users
// - Expanded menu items
// - Uses Tailwind utility classes; swap colors easily

type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Explore", href: "/explore" },
  { label: "Become a Guide", href: "/become-guide" },
  { label: "Cities", href: "/cities" },
  { label: "Categories", href: "/categories" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Support", href: "/support" },
];

export default function Navbar({ profile }: { profile: any }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  // console.log(profile)
  const role = profile?.role;
  const lowerCaseRole = role?.toLowerCase()
  const userData = profile[lowerCaseRole]
  console.log(userData)
  const pathname = usePathname();
  // console.log(profile)
  const user = {
    name: userData ? userData?.name : "user",
    email: "alex@example.com",
    avatarUrl: userData ? userData?.profilePhoto : "https://ui-avatars.com/api/?name=AN&background=0D8ABC&color=fff",
  };

  return (
    <nav className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <svg
              className="h-7 w-7 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M12 2C8 2 4 4 3 8c-1 4 2 9 9 14 7-5 10-10 9-14-1-4-5-6-9-6z"
                className="fill-current"
              />
            </svg>
            <span className="font-extrabold text-lg text-slate-900">GuideNest</span>
          </Link>
        </div>

        {/* Middle: Nav items (desktop) */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors ${pathname === item.href ? "text-primary" : "text-slate-700 hover:text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Auth actions / mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop auth actions */}
          <div className="hidden md:flex items-center gap-3">
            {!profile ? (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen((s) => !s)}
                  aria-expanded={profileOpen}
                  aria-haspopup
                  className="flex items-center gap-2 rounded-md px-2 py-1 hover:bg-slate-100"
                >
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium hidden lg:inline">{user.name}</span>
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5">
                    <div className="py-2">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm hover:bg-slate-50">
                        Dashboard
                      </Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-slate-50">
                        Profile
                      </Link>
                      <LogoutButton />
                      {/* <button
                        onClick={() => {
                          // sign out logic
                        }}
                        className="w-full text-left block px-4 py-2 text-sm hover:bg-slate-50"
                      >
                        Sign out
                      </button> */}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />

          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl p-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <svg
                  className="h-7 w-7 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C8 2 4 4 3 8c-1 4 2 9 9 14 7-5 10-10 9-14-1-4-5-6-9-6z" className="fill-current" />
                </svg>
                <span className="font-extrabold text-lg text-slate-900">GuideNest</span>
              </Link>

              <button className="p-2 rounded-md hover:bg-slate-100" onClick={() => setDrawerOpen(false)}>
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-6 space-y-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.href ? "text-primary" : "text-slate-700 hover:text-primary"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 border-t pt-4">
              {!profile ? (
                <div className="space-y-3">
                  <Link href="/login" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-50">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-primary text-white text-center"
                  >
                    Create account
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link href="/dashboard" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-50">
                    Dashboard
                  </Link>
                  <Link href="/profile" className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-50">
                    Profile
                  </Link>
                </div>
              )}

              <div className="mt-6 text-xs text-slate-500">
                © {new Date().getFullYear()} GuideNest
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
