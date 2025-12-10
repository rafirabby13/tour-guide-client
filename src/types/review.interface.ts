import { ITour } from "./tour.interface";
// import { ITourist } from "./tourist.interface"; // Uncomment if you have this

export interface IReview {
  id: string;
  rating: number;
  comment: string;
  
  touristId: string;
  // Nested tourist data is often needed for displaying the review (name, photo)
  tourist?: {
    id: string;
    name: string;
    profilePhoto?: string | null;
  };

  tourId: string;
  tour?: ITour; // Optional relation

  bookingId: string;

  createdAt: string; // Dates usually come as ISO strings from the API
  updatedAt: string;
}

// Optional: Type for creating a review (matching your Zod schema)
export interface ICreateReviewInput {
  rating: number;
  comment: string;
  bookingId: string;
  tourId?: string; // Sometimes inferred from booking
}