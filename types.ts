import mongoose from "mongoose";

export type MongoDoc<T> = T & {
  _id: mongoose.Types.ObjectId;
};
