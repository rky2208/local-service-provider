import { Types } from "mongoose";
import Provider from "../models/Provider.model";
import AppError from "../utils/AppError";

interface GetProviderProfileProps {
  userId: Types.ObjectId;
}

interface AddProviderProfileProps {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  businessName?: string;
  description: string;
  experienceYears: number;
  serviceCity: string;
  availabilityStatus: "Available" | "Unavailable";
  basePrice?: number;
  priceDescription?: string;
  languagesSpoken?: string[];
}

const getProfile = async ({ userId }: GetProviderProfileProps) => {
  const providerProfile = await Provider.findOne({ userId });

  if (!providerProfile) {
    throw new AppError("User Profile doesn't exist", 404);
  }
  return { providerProfile };
};

const addProfile = async ({
  userId,
  categoryId,
  businessName,
  description,
  experienceYears,
  serviceCity,
  availabilityStatus,
  basePrice,
  priceDescription,
  languagesSpoken,
}: AddProviderProfileProps) => {
  // 1. Check if profile already exists and completed
  const existingProfile = await Provider.findOne({ userId });

  if (!existingProfile) {
    throw new AppError("Can't create new ,user Profile already exist", 400);
  }

  // 3️. Create a new provider profile
  const providerProfile = await Provider.create({
    userId,
    categoryId,
    businessName,
    description,
    experienceYears,
    serviceCity,
    availabilityStatus,
    basePrice,
    priceDescription,
    languagesSpoken,
  });

  return { providerProfile };
};

export default {
  getProfile,
  addProfile,
};
