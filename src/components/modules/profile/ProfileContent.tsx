"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Edit,
  MapPin,
  Shield,
  Star,
  Briefcase,
  Languages,
} from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import EditProfileModal from "./EditProfileModal";

interface ProfileProps {
  user: {
    id: string;
    email: string;
    role: "ADMIN" | "TOURIST" | "GUIDE";
    createdAt: string;
    updatedAt: string;
    admin?: {
      id: string;
      name: string;
      contactNumber: string;
      profilePhoto?: string;
    } | null;
    tourist?: {
      id: string;
      name: string;
      contactNumber: string;
      profilePhoto?: string;
      gender?: string;
      category?: string[];
      languages?: string[];
    } | null;
    guide?: {
      id: string;
      name: string;
      contactNumber: string;
      profilePhoto?: string;
      gender?: string;
      bio?: string;
      city?: string;
      country?: string;
      experienceLevel?: string;
      experience?: number;
      languages?: string[];
      category?: string[];
      averageRating?: number;
      totalReviews?: number;
      isAvailable?: boolean;
    } | null;
  };
}

export default function ProfileContent({ user }: ProfileProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Get profile data based on role
  const profile = user.admin || user.tourist || user.guide;
  const isAdmin = user.role === "ADMIN";
  const isTourist = user.role === "TOURIST";
  const isGuide = user.role === "GUIDE";

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/10">
                  {profile.profilePhoto ? (
                    <Image
                      src={profile.profilePhoto}
                      alt={profile.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <User className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary" className="text-sm">
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role}
                      </Badge>
                      {isGuide && user.guide?.isAvailable && (
                        <Badge variant="default" className="text-sm">
                          Available
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button onClick={() => setIsEditModalOpen(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                {/* Guide Rating */}
                {isGuide && user.guide && (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-lg">
                        {user.guide.averageRating?.toFixed(1) || "0.0"}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      ({user.guide.totalReviews || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Guide Bio */}
                {isGuide && user.guide?.bio && (
                  <p className="text-muted-foreground">{user.guide.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{profile.contactNumber}</p>
                </div>
              </div>

              {isGuide && user.guide?.city && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-medium">
                      {user.guide.city}
                      {user.guide.country && `, ${user.guide.country}`}
                    </p>
                  </div>
                </div>
              )}

              {isGuide && user.guide?.experienceLevel && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-medium">
                      {user.guide.experienceLevel} • {user.guide.experience || 0}{" "}
                      years
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Interests/Categories Card */}
        {(isTourist || isGuide) && (
          <Card>
            <CardHeader>
              <CardTitle>
                {isTourist ? "Interests" : "Expertise"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(user.tourist?.category || user.guide?.category || []).map(
                  (cat: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {cat}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Languages Card */}
        {(isTourist || isGuide) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {(user.tourist?.languages || user.guide?.languages || []).map(
                  (lang: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {lang}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Account Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Member Since</p>
                    <p className="font-medium">
                      {format(new Date(user.createdAt), "MMMM dd, yyyy")}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="font-mono text-sm">{user.id}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium">
                    {format(new Date(user.updatedAt), "MMMM dd, yyyy")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
      />
    </>
  );
}