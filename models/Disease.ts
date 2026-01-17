import mongoose, { Schema } from "mongoose";

export interface TDisease {
  id?: mongoose.Types.ObjectId;
  code: string;
  name: string;
  description?: string;
  solution?: string;
  createdAt: Date;
  updatedAt: Date;
}

const DiseaseSchema = new Schema<TDisease>(
  {
    code: {
      type: String,
      required: true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    solution: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

DiseaseSchema.set("toJSON", {
  transform: (_, ret) => {
    const { _id, ...rest } = ret;
    return { id: _id, ...rest };
  }
});

const Disease = mongoose.models.Disease || mongoose.model<TDisease>("Disease", DiseaseSchema);

export default Disease;
