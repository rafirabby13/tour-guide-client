export interface ITourGuide {
  id: string;
  name: string;
  profilePhoto: string;
  bio: string;
}

export interface ITourAvailability {
  id: string;
  tourId: string;
  dayOfWeek: number;      // 0 = Sunday, 1 = Monday, etc.
  startTimeMinutes: number; // e.g., 581 (minutes from midnight)
  endTimeMinutes: number;   // e.g., 1196
  maxBookings: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITourPricing {
  id: string;
  tourId: string;
  minGuests: number;
  maxGuests: number;
  pricePerHour: string | number; // Prisma Decimals often return as strings
  createdAt: string;
  updatedAt: string;
}

export interface ITour {
  id: string;
  guideId: string;
  title: string;
  description: string;
  location: string;
  status: "PUBLISHED" | "DRAFT" | "ARCHIVED"; // Add other statuses if needed
  isDeleted: boolean;
  
  // Relations
  guide?: ITourGuide;
  images: string[];
  tourAvailabilities: ITourAvailability[];
  tourPricings: ITourPricing[];
  blockedDates: string[]; // Or generic any[] if the structure varies
  
  // Timestamps
  createdAt: string;
  updatedAt?: string;
}