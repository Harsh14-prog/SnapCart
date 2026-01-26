import mongoose from "mongoose";

const url = process.env.MONGODB_URL;

console.log("MONGO URL:", process.env.MONGODB_URL);


if(!url){
    throw new Error("db error")
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectdb = async () => {

  // already connected → reuse
  if (cached.conn) {
    return cached.conn;
  }

  // not connecting yet → start connecting
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(url)
      .then((mongooseInstance) => mongooseInstance.connection);
  }

  try {
       // first checked in cached , if it is null then so there can be possibility connection happening in promise
      cached.conn = await cached.promise;
      return cached.conn;
  } catch (error) {

    console.error("MongoDB connection failed", error);
    throw error;
  }
};

export default connectdb;
