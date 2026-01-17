import SymptomTable from "@/components/tables/SymptomTable";
import normalizeMongoDoc from "@/helpers/normalizeMongoDoc";
import dbConnect from "@/libs/mongodb";
import Symptom, { type TSymptom } from "@/models/Symptom";
import type { MongoDoc } from "@/types";

const fetchSymptoms = async () => {
  await dbConnect();

  const symptoms = await Symptom.find().sort({ createdAt: -1 }).lean<MongoDoc<TSymptom>[]>();

  return symptoms.map(normalizeMongoDoc);
};

export default async function GejalaPage() {
  const symptoms = await fetchSymptoms();

  return (
    <div className="container p-4 md:p-6">
      <h1>Daftar Gejala</h1>
      <p>Halaman ini menampilkan daftar gejala yang telah terdaftar dalam sistem.</p>
      <p className="mb-4">Kamu dapat menambahkan, mengedit, atau menghapus data gejala sesuai kebutuhan.</p>

      <SymptomTable symptoms={symptoms} showActions showAddButton />
    </div>
  );
}
