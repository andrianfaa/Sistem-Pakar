import mongoose, { Schema } from "mongoose";
import Disease, { type TDisease } from "./Disease";
import Symptom, { type TSymptom } from "./Symptom";

export type TRule = {
  id?: mongoose.Types.ObjectId;
  rule_id: string;
  disease_id: mongoose.Types.ObjectId;
  symptom_ids: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
};

export interface TRulePopulated {
  id?: mongoose.Types.ObjectId;
  rule_id: string;
  disease_id: TDisease;
  symptom_ids: TSymptom[];
  createdAt: Date;
  updatedAt: Date;
}

const RuleSchema = new Schema<TRule>(
  {
    rule_id: {
      type: String,
      required: true,
      unique: true
    },
    disease_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Disease,
      required: true
    },
    symptom_ids: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Symptom,
        required: true
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

RuleSchema.set("toJSON", {
  transform: (_, ret) => {
    const { _id, ...rest } = ret;
    return { id: _id, ...rest };
  }
});

const Rule = mongoose.models.Rule || mongoose.model<TRule>("Rule", RuleSchema);

export default Rule;
