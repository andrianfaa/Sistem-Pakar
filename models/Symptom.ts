import mongoose, { Schema, model, models } from "mongoose";

export interface TSymptom {
  id?: mongoose.Types.ObjectId;
  code: string;
  name: string;
  expertCF: number;
  createdAt: Date;
  updatedAt: Date;
}

const SymptomSchema = new Schema<TSymptom>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    expertCF: {
      type: Number,
      required: true,
      min: 0,
      max: 1
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

SymptomSchema.set("toJSON", {
  transform: (_, ret) => {
    const { _id, ...rest } = ret;
    return { id: _id, ...rest };
  }
});

const Symptom = models.Symptom || model<TSymptom>("Symptom", SymptomSchema);

export default Symptom;
