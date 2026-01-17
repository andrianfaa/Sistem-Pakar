import mongoose from "mongoose";

const mongoURI = process.env.MONGODB_URI;

async function dbConnect() {
  if (!mongoURI) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  if (mongoose.connection.readyState >= 1) {
    return;
  }

  await mongoose.connect(mongoURI);

  return mongoose;
}

export default dbConnect;
