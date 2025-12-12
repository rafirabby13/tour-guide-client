/* eslint-disable @typescript-eslint/no-explicit-any */
export const dynamic = "force-dynamic";

import React from 'react';
import Link from 'next/link';
import { 
    Users, 
    ShieldCheck, 
    Activity, 
    Map, 
    UserPlus,
    FileText,
    CreditCard,
    TrendingUp
} from 'lucide-react';

// Shadcn UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAdminDashboardStats } from '@/services/stats/stats';


const AdminDashboard = async () => {
    // 1. Fetch Real Data
    const response = await getAdminDashboardStats();
    const data = response?.data || {};
    const overview = data?.overview || {};
    const trends = data?.trends || {};

    // 2. Map Data to UI
    const adminStats = [
        { 
            label: "Total Users", 
            value: overview.totalUsers || 0, 
            icon: Users, 
            trend: trends.userTrend,
            change: trends.userChange,
            className: "text-violet-500"
        },
        { 
            label: "Active Tours", 
            value: overview.totalTours || 0, 
            icon: Map, 
            trend: "neutral", // Example
            change: "+0%",
            className: "text-blue-500"
        },
        { 
            label: "Total Bookings", 
            value: overview.totalBookings || 0, 
            icon: FileText, 
            trend: trends.bookingTrend,
            change: trends.bookingChange ? `${trends.bookingChange}%` : "0%",
            className: "text-emerald-500"
        },
        { 
            label: "Total Revenue", 
            value: `$${overview.totalRevenue || 0}`, 
            icon: CreditCard, 
            trend: trends.revenueTrend,
            change: trends.revenueChange ? `${trends.revenueChange}%` : "0%",
            className: "text-amber-500"
        },
    ];

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 animate-in fade-in-50 duration-500">
            
            {/* 1. Page Header */}
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <p className="text-muted-foreground">
                        Overview of your platform&apos;s performance and activity.
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    {/* <Button disabled variant="outline">Download Report</Button> */}
                </div>
            </div>
            
            <Separator />

            {/* 2. Stats Overview Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {adminStats.map((stat, index) => (
                    <Card key={index} className="hover:bg-muted/50 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {stat.label}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.className}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-emerald-500" />}
                                <span className={stat.trend === 'up' ? 'text-emerald-500 font-medium' : ''}>
                                    {stat.change}
                                </span>
                                from last month
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* 3. Main Content Split */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                
                {/* Quick Actions Panel (4 cols) */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                        <CardDescription>
                            Manage your application efficiently.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        
                        {/* Create Admin */}
                        <Link href="/admin/dashboard/create-admin" className="group">
                            <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted transition-all hover:scale-[1.02]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/50 group-hover:bg-blue-100 transition-colors">
                                    <UserPlus className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Create Admin</p>
                                    <p className="text-xs text-muted-foreground">Add new system administrators.</p>
                                </div>
                            </div>
                        </Link>

                        {/* Manage Users */}
                        <Link href="/admin/dashboard/users-management" className="group">
                            <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted transition-all hover:scale-[1.02]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100/50 group-hover:bg-emerald-100 transition-colors">
                                    <Users className="h-6 w-6 text-emerald-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Manage Users</p>
                                    <p className="text-xs text-muted-foreground">View and edit user roles.</p>
                                </div>
                            </div>
                        </Link>

                        {/* Manage Tours */}
                        <Link href="/admin/dashboard/tour-management" className="group">
                            <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted transition-all hover:scale-[1.02]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100/50 group-hover:bg-amber-100 transition-colors">
                                    <Map className="h-6 w-6 text-amber-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Manage Tours</p>
                                    <p className="text-xs text-muted-foreground">Approve or edit listings.</p>
                                </div>
                            </div>
                        </Link>

                         {/* Verify Guides */}
                         <Link href="/admin/dashboard/users-management" className="group">
                            <div className="flex items-center gap-4 rounded-md border p-4 hover:bg-muted transition-all hover:scale-[1.02]">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100/50 group-hover:bg-violet-100 transition-colors">
                                    <ShieldCheck className="h-6 w-6 text-violet-600" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Verify Guides</p>
                                    <p className="text-xs text-muted-foreground">Check pending applications.</p>
                                </div>
                            </div>
                        </Link>

                    </CardContent>
                </Card>

                {/* Recent Activity / System Health (3 cols) */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            Latest actions across the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {/* Empty State / System Health */}
                            <div className="flex flex-col items-center justify-center h-[200px] text-center space-y-4">
                                <div className="rounded-full bg-muted p-4">
                                    <Activity className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-medium">System Healthy</p>
                                    <p className="text-sm text-muted-foreground">
                                        All systems operational. No recent errors.
                                    </p>
                                </div>
                                <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                                    Operational
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminDashboard;