import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  mobile?: string;
  role: "user" | "deliveryboy" | "admin";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String },
    role: {
      type: String,
      enum: ["user", "deliveryboy", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

const user: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", userSchema);

export default user;
