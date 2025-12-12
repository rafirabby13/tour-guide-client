/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import SectionHeader from '@/components/shared/home/SectionHeader'
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { becomeGuideAction } from '@/services/tourist/becomeAGuide'
import { Briefcase, CheckCircle2, Compass, Globe, Building2, Loader2, Phone } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'
import { toast } from 'sonner'

const BecomeAGuideForm = () => {
    const [state, formAction, isPending] = useActionState(becomeGuideAction, null);
    const router = useRouter();

      const getFieldError = (fieldName: string) => {
        if (state?.errors) {
            const error = state.errors.find((err: any) => err.field === fieldName);
            return error ? error.message : null;
        }
        return null;
    };

    useEffect(() => {
        if (state?.error) toast.error(state.error);
        if (state?.success) {
            toast.success("Application Submitted!", {
                description: "Redirecting to your new dashboard...",
                icon: <CheckCircle2 className="text-emerald-500" />
            });
            setTimeout(() => router.push("/"), 1500);
        }
    }, [state, router]);

    return (
        <div className="min-h-screen bg-slate-50 py-10 relative overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                <SectionHeader
                    title="Turn your passion into"
                    highlight="Profession"
                    subtitle="Join our community of expert local guides and start earning by sharing your city."
                />

                <div className="max-w-2xl mx-auto">
                    {/* Main Card */}
                    <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[2rem] p-8 md:p-10 animate-in fade-in zoom-in-95 duration-700">

                        <form action={formAction} className="space-y-8">

                            {/* Bio Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <Compass className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900">About You</h3>
                                </div>

                                <Field>
                                    <FieldLabel className="text-gray-600">Professional Bio</FieldLabel>
                                    <Textarea
                                        name="bio"
                                        placeholder="Tell travelers why they should book a tour with you..."
                                        className={`min-h-[120px] bg-gray-50 focus:bg-white transition-all rounded-xl resize-none ${
                                            getFieldError("bio") ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                                        }`}
                                    />
                                    {getFieldError("bio") && (
                                        <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1 font-medium">
                                            {getFieldError("bio")}
                                        </p>
                                    )}
                                </Field>
                            </div>

                            {/* Location Grid (Country & City) */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel className="text-gray-600 flex items-center gap-2">
                                        <Globe className="w-3.5 h-3.5" /> Country
                                    </FieldLabel>
                                    <Input
                                        name="country"
                                        placeholder="e.g. Japan"
                                        className={`h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl ${
                                            getFieldError("country") ? "border-red-500 focus:ring-red-200" : ""
                                        }`}
                                    />
                                    {getFieldError("country") && (
                                        <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1 font-medium">
                                            {getFieldError("country")}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel className="text-gray-600 flex items-center gap-2">
                                        <Building2 className="w-3.5 h-3.5" /> City
                                    </FieldLabel>
                                    <Input
                                        name="city"
                                        placeholder="e.g. Kyoto"
                                        className={`h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl ${
                                            getFieldError("city") ? "border-red-500 focus:ring-red-200" : ""
                                        }`}
                                    />
                                    {getFieldError("city") && (
                                        <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1 font-medium">
                                            {getFieldError("city")}
                                        </p>
                                    )}
                                </Field>
                            </div>

                            {/* Professional Details Grid */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <Field>
                                    <FieldLabel className="text-gray-600 flex items-center gap-2">
                                        <Briefcase className="w-3.5 h-3.5" /> Years Experience
                                    </FieldLabel>
                                    <Input
                                        name="experience"
                                        type="number"
                                        placeholder="e.g. 3"
                                        min="0"
                                        className={`h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl ${
                                            getFieldError("experience") ? "border-red-500 focus:ring-red-200" : ""
                                        }`}
                                    />
                                    {getFieldError("experience") && (
                                        <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1 font-medium">
                                            {getFieldError("experience")}
                                        </p>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel className="text-gray-600 flex items-center gap-2">
                                        <Phone className="w-3.5 h-3.5" /> Contact Number
                                    </FieldLabel>
                                    <Input
                                        name="contactNo"
                                        type="tel"
                                        placeholder="+1 (555) 000-0000"
                                        className={`h-12 bg-gray-50 border-gray-200 focus:bg-white rounded-xl ${
                                            getFieldError("contactNo") ? "border-red-500 focus:ring-red-200" : ""
                                        }`}
                                    />
                                    {getFieldError("contactNo") && (
                                        <p className="text-xs text-red-500 mt-1 animate-in slide-in-from-top-1 font-medium">
                                            {getFieldError("contactNo")}
                                        </p>
                                    )}
                                </Field>
                            </div>

                            {/* Action Button */}
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="w-full h-14 text-lg font-semibold rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:to-primary shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
                            >
                                {isPending ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Submitting Application...
                                    </div>
                                ) : (
                                    "Submit Application"
                                )}
                            </Button>

                            <p className="text-center text-xs text-gray-400">
                                By submitting, you agree to our <a href="#" className="underline hover:text-primary">Terms of Service</a> for guides.
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BecomeAGuideForm