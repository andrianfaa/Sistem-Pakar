import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!mongoURI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  // if (mongoose.connection.readyState >= 1) {
  //   console.log("MongoDB connected");
  //   return;
  // }

  await mongoose.connect(mongoURI);

  console.log("MongoDB connected");

  return mongoose;
}

export default dbConnect;
