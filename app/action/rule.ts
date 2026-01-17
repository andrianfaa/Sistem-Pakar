"use server";

import Rule from "@/models/Rule";
import { RuleSchema } from "@/schemas/rule";

export async function insertRule(formData: FormData) {
  try {
    const ruleId = String(formData.get("ruleId") ?? "");
    const diseaseId = String(formData.get("diseaseId") ?? "");
    const symptomIds = JSON.parse(String(formData.get("symptomIds") ?? "[]")) as string[];

    //  Validation
    const validationResult = RuleSchema.safeParse({ ruleId, diseaseId, symptomIds });

    if (!validationResult.success) {
      console.log(validationResult.error);
      throw new Error("Data aturan tidak valid. Silakan periksa kembali input Anda.");
    }

    // Insert new rule
    const result = await Rule.create({
      rule_id: ruleId,
      disease_id: diseaseId,
      symptom_ids: symptomIds
    });
    if (!result) {
      throw new Error("Gagal menyimpan data aturan.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "ID aturan sudah terdaftar."
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan data aturan. Silakan coba lagi."
    };
  }
}

export async function updateRule(formData: FormData) {
  try {
    const id = String(formData.get("id") ?? "");
    const ruleId = String(formData.get("ruleId") ?? "");
    const diseaseId = String(formData.get("diseaseId") ?? "");
    const symptomIds = JSON.parse(String(formData.get("symptomIds") ?? "[]")) as string[];

    //  Validation
    const validationResult = RuleSchema.safeParse({ ruleId, diseaseId, symptomIds });

    if (!id) {
      throw new Error("ID aturan tidak valid.");
    }

    if (!validationResult.success) {
      throw new Error("Data aturan tidak valid. Silakan periksa kembali input Anda.");
    }

    // Update rule
    const result = await Rule.findByIdAndUpdate(
      id,
      { rule_id: ruleId, disease_id: diseaseId, symptom_ids: symptomIds },
      { new: true }
    );

    if (!result) {
      throw new Error("Gagal memperbarui data aturan.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "ID aturan sudah terdaftar."
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui data aturan. Silakan coba lagi."
    };
  }
}

export async function deleteRule(id: string) {
  try {
    if (!id) {
      throw new Error("ID aturan tidak valid.");
    }

    const result = await Rule.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Gagal menghapus data aturan.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data aturan. Silakan coba lagi."
    };
  }
}
