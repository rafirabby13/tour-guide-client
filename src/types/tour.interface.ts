export interface ITour {
  id: string;
  title: string;
  description: string;
  location: string;
  status: string;
  // Arrays
  images: string[];
  availableDates: string[]; // These come as ISO date strings from the API
  
  // Relations & Timestamps
  guideId: string;
  createdAt: string;
  updatedAt: string;
  
  // Optional: If you expand the query to include the guide details later
  guide?: {
    id: string;
    name: string;
    profilePhoto?: string;
  };
}