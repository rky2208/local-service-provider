import { Schema, model, Document, Types } from "mongoose";

export interface IProviderProfile extends Document {
  userId: Types.ObjectId;
  categoryId: Types.ObjectId;
  businessName?: string;
  description: string;
  experienceYears: number;
  serviceCity: string;
  isApproved: boolean;
  profileCompleted: boolean;
  availabilityStatus: "Available" | "Unavailable";
  basePrice?: number;
  priceDescription?: string;
  languagesSpoken?: string[];
  rating: number;
  totalReviews: number;
  createdAt: Date;
  updatedAt: Date;
}

const providerProfileSchema = new Schema<IProviderProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    businessName: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },

    serviceCity: {
      type: String,
      required: true,
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    availabilityStatus: {
      type: String,
      enum: ["Available", "Unavailable"],
      default: "Unavailable",
    },

    basePrice: {
      type: Number,
      min: 0,
    },

    priceDescription: {
      type: String,
      trim: true,
    },

    languagesSpoken: [String],

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model<IProviderProfile>(
  "ProviderProfile",
  providerProfileSchema
);
