import normalizeMongoDoc from "@/helpers/normalizeMongoDoc";
import Rule, { type TRule, type TRulePopulated } from "@/models/Rule";
import Symptom, { type TSymptom } from "@/models/Symptom";
import { DiagnoseInputSchema } from "@/schemas/diagnose";
import type { MongoDoc } from "@/types";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data || !data.symptoms) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "No input data provided for diagnosis."
        }),
        { status: 400 }
      );
    }

    // Validate input data
    const validationResult = DiagnoseInputSchema.safeParse(data);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "Invalid input data",
          error: validationResult.error.flatten().fieldErrors
        }),
        { status: 400 }
      );
    }

    const { symptoms: inputSymptoms } = validationResult.data;

    if (inputSymptoms.length === 0) {
      return new Response(
        JSON.stringify({
          status: "error",
          message: "No symptoms provided for diagnosis."
        }),
        { status: 400 }
      );
    }

    const [rawRules, rawSymptoms] = await Promise.all([
      Rule.find().populate("disease_id").populate("symptom_ids").lean(),
      Symptom.find().lean()
    ]);

    // Clean up the populated data
    const rules = rawRules.map((rule: MongoDoc<TRule>) => {
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
    const symptoms = rawSymptoms.map(normalizeMongoDoc);

    // Create a map of expert CF values for quick lookup
    const expertCFMap = new Map<string, number>();
    symptoms.forEach((symptom) => expertCFMap.set(symptom.id, symptom.expertCF));

    const diagnosisResults: { diseaseId: string; diseaseName: string; percentageCF: string; cf: number }[] = [];

    // -- Start Forward Chaining Logic -- //
    for (const rule of rules) {
      const disease = rule.disease_id as unknown as TRulePopulated["disease_id"];
      const ruleSymptomIds = (rule.symptom_ids as TRulePopulated["symptom_ids"])
        .map((symptom) => symptom.id)
        .filter(Boolean);
      const matchedSymptoms = inputSymptoms.filter((symptom) => {
        return ruleSymptomIds.some((id) => id?.toString() === symptom.id);
      });

      if (matchedSymptoms.length > 0) {
        // --- Start Certainty Factor Calculation --- //
        const cfSymptomList: number[] = [];

        matchedSymptoms.forEach((symptom) => {
          const expertCF = expertCFMap.get(symptom.id) || 0;
          const combinedCF = expertCF * symptom.cf;

          cfSymptomList.push(combinedCF);
        });

        if (cfSymptomList.length > 0) {
          let combinedCF = cfSymptomList[0];

          for (let i = 1; i < cfSymptomList.length; i++) {
            const cf = cfSymptomList[i];

            combinedCF = combinedCF + cf * (1 - combinedCF);
          }

          const percentageCF = (combinedCF * 100).toFixed(2);

          diagnosisResults.push({
            diseaseId: disease.id!.toString(),
            diseaseName: disease.name,
            percentageCF,
            cf: combinedCF
          });
        }
      }
    }

    // Sort results by CF value in descending order
    diagnosisResults.sort((a, b) => b.cf - a.cf);

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Diagnosis completed successfully.",
        data: diagnosisResults
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during diagnosis:", error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "An error occurred during diagnosis. Please try again later.",
        error: error instanceof Error ? error.message : String(error)
      }),
      { status: 500 }
    );
  }
}
