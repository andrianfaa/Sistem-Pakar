import { z } from "zod";

export const DiseaseSchema = z.object({
  code: z.string().min(1, "Kode penyakit wajib diisi").trim(),
  name: z.string().min(1, "Nama penyakit wajib diisi").trim(),
  description: z.string().optional()
});

export type Disease = z.infer<typeof DiseaseSchema>;
