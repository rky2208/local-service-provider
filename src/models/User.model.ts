import { Schema, model, Document } from "mongoose";
import { Role } from "../constants/roles";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  isActive: boolean;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  profileImage?: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.CUSTOMER,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    phone: String,
    city: String,
    state: String,
    country: String,
    profileImage: String,

    emailVerified: {
      type: Boolean,
      default: false,
    },

    phoneVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model<IUser>("User", userSchema);
