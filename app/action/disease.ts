"use server";

import Disease from "@/models/Disease";
import { DiseaseSchema } from "@/schemas/disease";

export async function insertDisease(formData: FormData) {
  try {
    const code = String(formData.get("code") ?? "").toUpperCase();
    const name = String(formData.get("name") ?? "");
    const description = String(formData.get("description") ?? "");

    //  Validation
    const validationResult = DiseaseSchema.safeParse({ code, name, description });

    if (!validationResult.success) {
      throw new Error("Data penyakit tidak valid. Silakan periksa kembali input Anda.");
    }

    // Insert new disease
    const result = await Disease.create({ code, name, description });

    if (!result) {
      throw new Error("Gagal menyimpan data penyakit.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    console.error(error);

    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "Kode penyakit sudah terdaftar."
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Terjadi kesalahan saat menyimpan data penyakit. Silakan coba lagi."
    };
  }
}

export async function updateDisease(formData: FormData) {
  try {
    const id = String(formData.get("id") ?? "");
    const code = String(formData.get("code") ?? "").toUpperCase();
    const name = String(formData.get("name") ?? "");
    const description = String(formData.get("description") ?? "");

    //  Validation
    const validationResult = DiseaseSchema.safeParse({ code, name, description });

    if (!id) {
      throw new Error("ID penyakit tidak valid.");
    }

    if (!validationResult.success) {
      throw new Error("Data penyakit tidak valid. Silakan periksa kembali input Anda.");
    }

    // Update disease
    const result = await Disease.updateOne({ _id: id }, { code, name, description });

    if (result.matchedCount === 0) {
      throw new Error("Penyakit tidak ditemukan.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    console.error(error);

    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "Kode penyakit sudah terdaftar."
      };
    }

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui data penyakit. Silakan coba lagi."
    };
  }
}

export async function deleteDisease(id: string) {
  try {
    if (!id) {
      throw new Error("ID penyakit tidak valid.");
    }

    const deleteDisease = await Disease.deleteOne({ _id: id });

    if (deleteDisease.deletedCount === 0) {
      throw new Error("Gagal menghapus data penyakit. Silakan coba lagi.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data penyakit. Silakan coba lagi."
    };
  }
}
