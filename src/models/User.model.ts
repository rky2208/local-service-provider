import { Schema, model, Document } from "mongoose";
import { Role } from "../constants/roles";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  isApproved: boolean;
}

new Schema<IUser>();

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true },
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
  },
  { timestamps: true }
);

export default model("User", userSchema);
