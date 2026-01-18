import DiagnosisForm from "@/components/forms/DiagnosisForm";
import normalizeMongoDoc from "@/helpers/normalizeMongoDoc";
import dbConnect from "@/libs/mongodb";
import Symptom, { type TSymptom } from "@/models/Symptom";
import type { MongoDoc } from "@/types";

const fetchDiagnosaData = async () => {
  await dbConnect();

  const symptoms = await Symptom.find()
    .select("_id code name")
    .sort({ createdAt: -1 })
    .lean<MongoDoc<Omit<TSymptom, "expertCF" | "createdAt" | "updatedAt">>[]>();

  return symptoms.map(normalizeMongoDoc);
};

export default async function DiagnosaPenyakitPage() {
  const symptoms = await fetchDiagnosaData();

  return (
    <div className="container p-4 md:p-6">
      <h1>Diagnosa Penyakit</h1>

      <DiagnosisForm symptoms={symptoms} />
    </div>
  );
}
