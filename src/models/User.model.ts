import { Schema, model, Document } from "mongoose";
import { Role } from "../constants/roles";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "customer" | "provider" | "admin";
  isApproved: boolean;
}

new Schema<IUser>();

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: {
      type: String,
      enum: Object.values(Role),
      default: "customer",
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
