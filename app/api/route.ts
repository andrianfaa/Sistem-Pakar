// import Rule from "@/models/Rule";
// import Desease from "@/models/Disease";
// import Symptom from "@/models/Symptom";

// const rulesData = [
//   {
//     rule_id: "R01",
//     disease_code: "P01", // Kuning Virus
//     symptom_codes: ["G22", "G01", "G06"] // [cite: 96]
//   },
//   {
//     rule_id: "R02",
//     disease_code: "P02", // BLAS
//     symptom_codes: ["G02", "G06", "G05", "G07"] // [cite: 98]
//   },
//   {
//     rule_id: "R03",
//     disease_code: "P03", // Fusarium
//     symptom_codes: ["G08", "G06", "G09"] // [cite: 100]
//   },
//   {
//     rule_id: "R04",
//     disease_code: "P04", // Tungro
//     symptom_codes: ["G03", "G10", "G01"] // [cite: 102]
//   },
//   {
//     rule_id: "R05",
//     disease_code: "P05", // Kresek Hawar Daun
//     symptom_codes: ["G11", "G01", "G03"] // [cite: 104]
//   },
//   {
//     rule_id: "R06",
//     disease_code: "P06", // Kerdil
//     symptom_codes: ["G12", "G13", "G14", "G17"] // [cite: 106]
//   },
//   {
//     rule_id: "R07",
//     disease_code: "P07", // Wereng Batang Coklat
//     symptom_codes: ["G01", "G03", "G04", "G15", "G16", "G21"] // [cite: 108]
//   },
//   {
//     rule_id: "R08",
//     disease_code: "P08", // Pelapah Daun
//     symptom_codes: ["G18", "G19", "G20"] // [cite: 110]
//   }
// ];

// export async function GET() {
//   try {
//     const disease = await Desease.find();
//     const symptom = await Symptom.find();

//     for (const ruleData of rulesData) {
//       const diseaseRecord = disease.find((d) => d.code === ruleData.disease_code);
//       const symptomRecords = symptom.filter((s) => ruleData.symptom_codes.includes(s.code));

//       console.log(`Seeding rule ${ruleData.rule_id}`);

//       if (diseaseRecord && symptomRecords.length === ruleData.symptom_codes.length) {
//         const newRule = new Rule({
//           rule_id: ruleData.rule_id,
//           disease_id: diseaseRecord._id,
//           symptom_ids: symptomRecords.map((s) => s._id)
//         });
//         await newRule.save();
//       } else {
//         console.warn(`Disease or symptoms not found for rule ${ruleData.rule_id}`);
//       }
//     }

//     return new Response(JSON.stringify({ message: "Seeding completed" }), {
//       status: 200
//     });
//   } catch (error) {
//     console.error("Error during seeding:", error);
//     return new Response(JSON.stringify({ message: "Seeding failed" }), {
//       status: 500
//     });
//   }
// }
