/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User as UserIcon, LayoutDashboard, Settings } from "lucide-react";
import LogoutButton from "@/components/shared/buttons/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Define navigation items
type NavItem = {
  label: string;
  href: string;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Explore", href: "/tours" }, 
  { label: "Cities", href: "/cities" },
  { label: "Become a Guide", href: "/register?role=guide" },
];

export default function Navbar({ profile }: { profile: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // console.log(profile.length)

  // --- 1. User Data Extraction ---
  const role = profile?.role; // Expected: "TOURIST", "GUIDE", "ADMIN"
  const lowerCaseRole = role?.toLowerCase(); 
  const userData = profile && lowerCaseRole ? profile[lowerCaseRole] : null;

  const user = {
    name: userData?.name || profile?.email || "User",
    email: profile?.email || "",
    avatarUrl: userData?.profilePhoto || "",
    // Generate initials for avatar fallback (e.g., "John Doe" -> "JD")
    initials: userData?.name 
      ? userData.name.split(' ').map((n:string) => n[0]).join('').substring(0, 2).toUpperCase() 
      : "U",
  };

  // --- 2. Dynamic Dashboard Link Logic ---
  const getDashboardLink = () => {
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "GUIDE") return "/guide/dashboard";
    return "/dashboard"; // Default for Tourist
  };

  // --- 3. Scroll Effect for Glassmorphism ---
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 backdrop-blur-md border-gray-200 shadow-sm" 
          : "bg-white border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        
        {/* --- Logo --- */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <svg
              className="h-6 w-6 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C8 2 4 4 3 8c-1 4 2 9 9 14 7-5 10-10 9-14-1-4-5-6-9-6z"
                className="fill-current"
              />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">GuideNest</span>
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? "text-primary" : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* --- Right Side (Auth & Mobile Toggle) --- */}
        <div className="flex items-center gap-4">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-md"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {profile.length == 0 ? (
              // Guest State
              <>
                <Button variant="outline" asChild className="text-slate-600 hover:text-primary">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Sign up</Link>
                </Button>
              </>
            ) : (
              // Logged In State (Dropdown)
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent">
                    <Avatar className="h-9 w-9 border border-gray-200 transition-all hover:ring-2 hover:ring-primary/20">
                      <AvatarImage src={user.avatarUrl} alt={user.name} className="object-cover" />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                
                <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()} className="cursor-pointer w-full flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4 text-slate-500" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem asChild>
                    <Link href="/my-profile" className="cursor-pointer w-full flex items-center">
                      <UserIcon className="mr-2 h-4 w-4 text-slate-500" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  {role === "ADMIN" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin/settings" className="cursor-pointer w-full flex items-center">
                        <Settings className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  
                  {/* Logout Button Integration */}
                  <div className="p-1">
                     <LogoutButton /> 
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* --- Mobile Drawer (Slide-over) --- */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Drawer Panel */}
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between mb-8">
              <span className="font-bold text-lg text-slate-900">Menu</span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-slate-500" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      pathname === item.href 
                        ? "bg-primary/5 text-primary" 
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="h-px bg-gray-100 my-2" />

              {/* Mobile Auth Section */}
              {!profile ? (
                <div className="flex flex-col gap-3">
                  <Button asChild className="w-full h-12 text-base">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full h-12 text-base">
                    <Link href="/register">Sign Up</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* User Info Card */}
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <Avatar>
                      <AvatarImage src={user.avatarUrl} className="object-cover" />
                      <AvatarFallback className="bg-white text-primary font-bold">{user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="font-semibold text-sm text-slate-900 truncate">{user.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <Link 
                      href={getDashboardLink()} 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-5 w-5 text-slate-400" /> Dashboard
                    </Link>
                    <Link 
                      href="/my-profile" 
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-lg text-sm font-medium text-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserIcon className="h-5 w-5 text-slate-400" /> Profile
                    </Link>
                  </div>
                  
                  <div className="pt-2">
                    {/* Ensure LogoutButton is full width in mobile */}
                    <div className="w-full [&>button]:w-full [&>button]:justify-center [&>button]:h-11 [&>button]:bg-red-50 [&>button]:text-red-600 hover:[&>button]:bg-red-100">
                       <LogoutButton />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="text-xs text-slate-400 text-center mt-6 pt-6 border-t">
              © {new Date().getFullYear()} GuideNest Inc.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}