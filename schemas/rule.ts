import { z } from "zod";

export const RuleSchema = z.object({
  ruleId: z.string().min(1, "Rule ID wajib diisi"),
  diseaseId: z.string().min(1, "Disease ID tidak valid"),
  symptomIds: z.array(z.string().min(1)).min(1, "Minimal 1 gejala harus dipilih")
});

export type Rule = z.infer<typeof RuleSchema>;
