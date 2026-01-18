import { z } from "zod";

export const DiagnoseInputSchema = z.object({
  symptoms: z.array(
    z.object({
      id: z.string(),
      cf: z.number().min(0).max(1)
    })
  )
});
