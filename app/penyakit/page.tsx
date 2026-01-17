import DiseaseTable from "@/components/tables/DiseaseTable";
import normalizeMongoDoc from "@/helpers/normalizeMongoDoc";
import dbConnect from "@/libs/mongodb";
import Disease, { type TDisease } from "@/models/Disease";
import type { MongoDoc } from "@/types";

const fetchDiseases = async () => {
  await dbConnect();

  const diseases = await Disease.find().sort({ createdAt: -1 }).select("id code name").lean<MongoDoc<TDisease>[]>();

  return diseases.map(normalizeMongoDoc);
};

export default async function DaftarPenyakitPage() {
  const diseases = await fetchDiseases();

  return (
    <div className="container p-4 md:p-6">
      <h1>Daftar Penyakit</h1>
      <p className="mb-4">
        Di bawah ini adalah daftar penyakit yang dapat diidentifikasi oleh sistem pakar berdasarkan gejala yang
        diberikan.
      </p>

      {/* Client Component */}
      <DiseaseTable diseases={diseases} />
    </div>
  );
}
