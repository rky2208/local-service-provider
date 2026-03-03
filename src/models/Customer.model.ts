import { Schema, model, Document, Types } from "mongoose";

export interface ICustomerProfile extends Document {
  userId: Types.ObjectId;
  defaultAddress?: string;
  savedAddresses?: string[];
  preferences?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const customerProfileSchema = new Schema<ICustomerProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    defaultAddress: {
      type: String,
      trim: true,
    },

    savedAddresses: [String],

    preferences: [String],
  },
  { timestamps: true }
);

export default model<ICustomerProfile>(
  "CustomerProfile",
  customerProfileSchema
);
