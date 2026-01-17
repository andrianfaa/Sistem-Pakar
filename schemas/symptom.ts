import { z } from "zod";

export const SymptomSchema = z.object({
  code: z.string().min(1, "Kode gejala wajib diisi").trim(),
  name: z.string().min(1, "Nama gejala wajib diisi").trim(),
  expertCF: z
    .number("Nilai CF Pakar wajib diisi")
    .min(0, "Nilai CF Pakar minimal 0")
    .max(1, "Nilai CF Pakar maksimal 1")
});

export type TSymptom = z.infer<typeof SymptomSchema>;
