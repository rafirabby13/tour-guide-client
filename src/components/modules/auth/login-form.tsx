/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "@/services/auth/loginUser";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { Mail, Lock, Loader2, MapPin, ShieldCheck, UserCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Carousel Imports
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

const LoginForm = ({ redirect }: { redirect?: string }) => {
    const [state, formAction, isPending] = useActionState(loginUser, null);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Carousel Plugin
    const plugin = useRef(
        Autoplay({ delay: 4000, stopOnInteraction: false })
    );

    // Slider Images (High quality travel photos)
    const slides = [
        { id: 1, src: "https://img.freepik.com/free-vector/user-verification-unauthorized-access-prevention-private-account-authentication-cyber-security-people-entering-login-password-safety-measures_335657-3530.jpg", alt: "Travel 1" }, // Mountain
        { id: 2, src: "https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg", alt: "Travel 2" }, // Ocean
        { id: 3, src: "https://img.freepik.com/free-vector/cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37328.jpg", alt: "Travel 3" }, // City
    ];

    const getFieldError = (fieldName: string) => {
        if (state && state.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error ? error.message : null;
        }
        return null;
    };

    useEffect(() => {
        if (state?.error) {
            toast.error(state?.message || "Login failed");
        }
        if (state?.success) {
            toast.success(state?.success || "User Logged In Successfully.");
            router.push(redirect || "/");
        }
    }, [state, router, redirect]);

    const handleAutoFill = (role: 'ADMIN' | 'GUIDE' | 'USER') => {
        if (role === 'ADMIN') {
            setEmail("admin@gmail.com");
            setPassword("admin123");
        } else if (role === 'GUIDE') {
            setEmail("guide@gmail.com");
            setPassword("guide123");
        } else {
            setEmail("tourist@gmail.com");
            setPassword("tourist123");
        }
        toast.info(`Auto-filled ${role} credentials`);
    };

    return (
        <div className="flex w-full max-w-5xl mx-auto overflow-hidden bg-card rounded-[2.5rem] shadow-2xl shadow-primary/50 min-h-[650px] border border-border">

            {/* --- LEFT SIDE: IMAGE SLIDER --- */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-900 text-primary-foreground p-12 flex-col justify-between overflow-hidden">
                
                {/* Carousel Background */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Carousel
                        plugins={[plugin.current]}
                        opts={{ loop: true, align: "start" }}
                        className="w-full h-full"
                    >
                        <CarouselContent className="h-full ml-0 bg-primary/10"> 
                            {slides.map((slide) => (
                                <CarouselItem key={slide.id} className="relative h-full pl-0 w-full">
                                    <Image
                                        src={slide.src}
                                        alt={slide.alt}
                                        width={1000}
                                        height={100}
                                        className="object-cover"
                                        priority={slide.id === 1}
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                    {/* Dark Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
                </div>

                {/* Branding Content (Z-Index ensures it sits on top of slider) */}
                <div className="relative z-10 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10">
                            <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-bold text-2xl tracking-wide text-white">GuideNest</span>
                    </div>
                </div>

                <div className="relative z-10 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    <h2 className="text-4xl xl:text-5xl font-bold leading-tight text-white">
                        Your Journey <br/>
                        Starts <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Here.</span>
                    </h2>
                    <p className="text-white/80 max-w-sm text-lg font-light leading-relaxed">
                        Connect with expert locals, explore hidden gems, and create memories that last a lifetime.
                    </p>
                    
                    {/* Testimonial / Trust Badge */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-3">
                            {[1,2,3].map((i) => (
                                <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-200" /> 
                            ))}
                        </div>
                        <div className="text-sm">
                            <p className="text-white font-semibold">10k+ Travelers</p>
                            <p className="text-white/60 text-xs">Joined this month</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 text-xs text-white/40 pt-12">
                    © 2024 GuideNest Inc. All rights reserved.
                </div>
            </div>

            {/* --- RIGHT SIDE: FORM WITH GRID --- */}
            <div className="w-full lg:w-1/2 relative bg-card">
                
                {/* 1. Subtle Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-[0.15] pointer-events-none" />

                <div className="relative z-10 h-full p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                    <div className="max-w-md mx-auto w-full space-y-8">
                        
                        <div className="text-center lg:text-left space-y-2">
                            <h1 className="text-3xl font-bold text-foreground tracking-tight">Welcome Back</h1>
                            <p className="text-muted-foreground text-sm">Please enter your details to access your account.</p>
                        </div>

                        {/* Quick Access */}
                        <div className="p-4 bg-muted/40 rounded-2xl border border-border/60 backdrop-blur-sm">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center lg:text-left">
                                Instant Demo Login
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                                <RoleButton 
                                    icon={ShieldCheck} 
                                    label="Admin" 
                                    onClick={() => handleAutoFill('ADMIN')} 
                                    colorClass="hover:border-primary hover:text-primary hover:bg-primary/5" 
                                />
                                <RoleButton 
                                    icon={MapPin} 
                                    label="Guide" 
                                    onClick={() => handleAutoFill('GUIDE')} 
                                    colorClass="hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50" 
                                />
                                <RoleButton 
                                    icon={UserCircle2} 
                                    label="Tourist" 
                                    onClick={() => handleAutoFill('USER')} 
                                    colorClass="hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50" 
                                />
                            </div>
                        </div>

                        <form action={formAction} className="space-y-5">
                            {redirect && <input type="hidden" name="redirect" value={redirect} />}
                            
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-foreground font-medium">Email</Label>
                                    <div className="relative group">
                                        <Mail className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="name@example.com"
                                            className="pl-11 h-12 rounded-xl bg-background border-input shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {getFieldError("email") && <p className="text-destructive text-xs ml-1 font-medium">{getFieldError("email")}</p>}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                                        <Link href="/forgot-password" className="text-xs text-primary font-medium hover:underline">
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="••••••••"
                                            className="pl-11 h-12 rounded-xl bg-background border-input shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {getFieldError("password") && <p className="text-destructive text-xs ml-1 font-medium">{getFieldError("password")}</p>}
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isPending}
                                className="w-full h-12 rounded-xl text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] transition-all active:scale-[0.98]"
                            >
                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    <span className="flex items-center gap-2">Sign in <ArrowRight className="w-4 h-4" /></span>
                                )}
                            </Button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                            </div>
                        </div>

                        <div className="text-center">
                             <p className="text-muted-foreground text-sm">
                                Don&apos;t have an account?{" "}
                                <Link href="/register" className="font-bold text-primary hover:underline underline-offset-4">
                                    Sign up for free
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper Component for the Auto-Fill Buttons to keep JSX clean
const RoleButton = ({ icon: Icon, label, onClick, colorClass }: any) => (
    <button 
        type="button"
        onClick={onClick}
        className={cn(
            "flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl bg-background border border-border shadow-sm transition-all active:scale-95 group",
            colorClass
        )}
    >
        <Icon className="h-5 w-5 text-muted-foreground group-hover:text-current transition-colors" />
        <span className="text-xs font-medium group-hover:text-current">{label}</span>
    </button>
);

export default LoginForm;