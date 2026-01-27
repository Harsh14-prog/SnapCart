import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  id? : mongoose.Types.ObjectId
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image? : string | null
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    mobile: { type: String },
    role: {
      type: String,
      enum: ["user", "deliveryBoy", "admin"],
      default: "user",
    },
    image : {type : String}
  },
  { timestamps: true }
);

const user: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", userSchema);

export default user;
