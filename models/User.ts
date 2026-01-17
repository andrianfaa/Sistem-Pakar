import mongoose, { Schema } from "mongoose";
import crypto from "node:crypto";

interface TUser {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.set("toJSON", {
  transform: (_, ret) => {
    const { _id, ...rest } = ret;
    return { id: _id, ...rest };
  }
});

// Hash password before saving
UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hash = crypto
      .createHmac("sha256", process.env.SECRET_KEY as string)
      .update(this.password as string)
      .digest("hex");

    this.password = hash;
  }
});

const User = mongoose.models.User || mongoose.model<TUser>("User", UserSchema);

export default User;
