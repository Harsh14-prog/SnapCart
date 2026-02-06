import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUser extends Document {
  id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  mobile?: string;
  role: "user" | "deliveryBoy" | "admin";
  image?: string | null;
  location?: {
    type: {
      type: String;
      enum: string[];
      default: string;
    };
    coordinates: {
      type: Number[];
      default: number[];
    };
  };
  socketId: string | null;
  isOnline: Boolean;
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
    image: { type: String },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    socketId: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const user: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", userSchema);

export default user;
