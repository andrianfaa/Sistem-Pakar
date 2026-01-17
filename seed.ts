import dbConnect from "@/lib/dbConnect"; // Sesuaikan path koneksi DB kamu
import Disease from "@/models/Disease";
import Symptom from "@/models/Symptom";
import Rule from "@/models/Rule";

const rulesData = [
  {
    rule_id: "R01",
    disease_code: "P01", // Kuning Virus
    symptom_codes: ["G22", "G01", "G06"] // [cite: 96]
  },
  {
    rule_id: "R02",
    disease_code: "P02", // BLAS
    symptom_codes: ["G02", "G06", "G05", "G07"] // [cite: 98]
  },
  {
    rule_id: "R03",
    disease_code: "P03", // Fusarium
    symptom_codes: ["G08", "G06", "G09"] // [cite: 100]
  },
  {
    rule_id: "R04",
    disease_code: "P04", // Tungro
    symptom_codes: ["G03", "G10", "G01"] // [cite: 102]
  },
  {
    rule_id: "R05",
    disease_code: "P05", // Kresek Hawar Daun
    symptom_codes: ["G11", "G01", "G03"] // [cite: 104]
  },
  {
    rule_id: "R06",
    disease_code: "P06", // Kerdil
    symptom_codes: ["G12", "G13", "G14", "G17"] // [cite: 106]
  },
  {
    rule_id: "R07",
    disease_code: "P07", // Wereng Batang Coklat
    symptom_codes: ["G01", "G03", "G04", "G15", "G16", "G21"] // [cite: 108]
  },
  {
    rule_id: "R08",
    disease_code: "P08", // Pelapah Daun
    symptom_codes: ["G18", "G19", "G20"] // [cite: 110]
  }
];

async function seedRules() {
  await dbConnect();

  try {
    console.log("Mulai seeding Rules...");

    // Hapus data rules lama agar tidak duplikat (Opsional)
    await Rule.deleteMany({});

    for (const data of rulesData) {
      // 1. Cari _id Penyakit berdasarkan kodenya (misal P01)
      const disease = await Disease.findOne({ code: data.disease_code });

      if (!disease) {
        console.error(`Penyakit dengan kode ${data.disease_code} tidak ditemukan!`);
        continue; // Lanjut ke rule berikutnya jika penyakit tidak ada
      }

      // 2. Cari _id Gejala-gejala berdasarkan array kodenya (misal ["G22", "G01"])
      // Kita menggunakan $in untuk mencari banyak sekaligus
      const symptoms = await Symptom.find({
        code: { $in: data.symptom_codes }
      });

      // Validasi: Pastikan semua gejala ditemukan
      if (symptoms.length !== data.symptom_codes.length) {
        console.warn(`Peringatan: Beberapa gejala untuk rule ${data.rule_id} mungkin tidak ditemukan di database.`);
      }

      // Ambil array ID-nya saja
      const symptomIds = symptoms.map((s) => s._id);

      // 3. Buat Rule Baru
      await Rule.create({
        rule_id: data.rule_id,
        disease_id: disease._id, // Masukkan ObjectId Penyakit
        symptom_ids: symptomIds // Masukkan Array ObjectId Gejala
      });

      console.log(`Rule ${data.rule_id} berhasil dibuat untuk penyakit ${data.disease_code}.`);
    }

    console.log("Seeding Rules Selesai!");
  } catch (error) {
    console.error("Gagal melakukan seeding:", error);
  }
}

// Jalankan fungsi (jika dijalankan sebagai script standalone)
seedRules();
