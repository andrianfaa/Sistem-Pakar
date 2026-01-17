import ExpertRuleTable from "@/components/tables/ExpertRuleTable";
import normalizeMongoDoc from "@/helpers/normalizeMongoDoc";
import dbConnect from "@/libs/mongodb";
import Disease, { type TDisease } from "@/models/Disease";
import Rule, { type TRule, type TRulePopulated } from "@/models/Rule";
import Symptom, { type TSymptom } from "@/models/Symptom";
import type { MongoDoc } from "@/types";

const fetchExpertRules = async () => {
  await dbConnect();

  const [rules, diseases, symptoms] = await Promise.all([
    Rule.find().sort({ createdAt: -1 }).lean<MongoDoc<TRule>[]>().populate("disease_id").populate("symptom_ids"),
    Disease.find().lean<MongoDoc<TDisease>[]>(),
    Symptom.find().lean<MongoDoc<TSymptom>[]>()
  ]);

  const normalizedRules = rules.map((rule: MongoDoc<TRule>) => {
    const cleanDisease = normalizeMongoDoc(rule.disease_id);
    const cleanSymptoms = (rule.symptom_ids as unknown as MongoDoc<TSymptom>[]).map((symptom) =>
      normalizeMongoDoc(symptom)
    );
    const cleanRule = normalizeMongoDoc(rule);

    return {
      ...cleanRule,
      disease_id: cleanDisease,
      symptom_ids: cleanSymptoms
    };
  });

  return {
    rules: normalizedRules,
    diseases: diseases.map(normalizeMongoDoc),
    symptoms: symptoms.map(normalizeMongoDoc)
  };
};

export default async function AturanPakarPage() {
  const data = await fetchExpertRules();

  return (
    <div className="container p-4 md:p-6">
      <h1>Daftar Aturan Pakar</h1>
      <p className="mb-4">Halaman ini menampilkan daftar aturan pakar yang telah terdaftar dalam sistem.</p>

      {/* Client Component */}
      <ExpertRuleTable
        rules={data.rules as unknown as Omit<TRulePopulated, "createdAt" | "updatedAt">[]}
        diseases={data.diseases}
        symptoms={data.symptoms}
        showActions
        showAddButton
      />
    </div>
  );
}
