"use server";

import Symptom from "@/models/Symptom";
import { SymptomSchema } from "@/schemas/symptom";

export async function insertSymptom(formData: FormData) {
  try {
    const code = String(formData.get("code") ?? "").toUpperCase();
    const name = String(formData.get("name") ?? "");
    const expertCF = parseFloat(String(formData.get("expertCF") ?? "0"));

    //  Validation
    const validationResult = SymptomSchema.safeParse({ code, name, expertCF });

    if (!validationResult.success) {
      throw new Error("Data gejala tidak valid. Silakan periksa kembali input Anda.");
    }

    // Insert new symptom
    const result = await Symptom.create({ code, name, expertCF });

    if (!result) {
      throw new Error("Gagal menyimpan data gejala.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "Kode gejala sudah terdaftar."
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan data gejala. Silakan coba lagi."
    };
  }
}

export async function updateSymptom(formData: FormData) {
  try {
    const id = String(formData.get("id") ?? "");
    const code = String(formData.get("code") ?? "").toUpperCase();
    const name = String(formData.get("name") ?? "");
    const expertCF = parseFloat(String(formData.get("expertCF") ?? "0"));

    //  Validation
    const validationResult = SymptomSchema.safeParse({ code, name, expertCF });

    if (!id) {
      throw new Error("ID gejala tidak valid.");
    }

    if (!validationResult.success) {
      throw new Error("Data gejala tidak valid. Silakan periksa kembali input Anda.");
    }

    // Update symptom
    const result = await Symptom.findByIdAndUpdate(id, { code, name, expertCF });

    if (!result) {
      throw new Error("Gagal memperbarui data gejala.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "Kode gejala sudah terdaftar."
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui data gejala. Silakan coba lagi."
    };
  }
}

export async function deleteSymptom(id: string) {
  try {
    if (!id) {
      throw new Error("ID gejala tidak valid.");
    }

    const result = await Symptom.findByIdAndDelete(id);

    if (!result) {
      throw new Error("Gagal menghapus data gejala.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data gejala. Silakan coba lagi."
    };
  }
}
