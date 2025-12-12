export interface IGuideProfile {
  id: string;
  userId: string;
  name: string;
  bio: string;
  contactNumber: string;
  country: string;
  city: string;
  
  // Numeric stats
  experience: number;
  rating: number;
  totalReviews: number;
  totalTours: number;
  
  // Status flags
  isAvailable: boolean;
  isVerified: boolean;
  isDeleted: boolean;
  
  // Arrays
  category: string[];
  languages: string[];
  
  // Nullable fields
  gender: string | null;
  profilePhoto: string | null;
  
  // Enums or Strings
  experienceLevel: "BEGINNER" | "INTERMEDIATE" | "EXPERT" | string; // Suggesting likely Enum values
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}