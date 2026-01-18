"use server";

import dbConnect from "@/libs/mongodb";
import { createSession, deleteSession } from "@/libs/session";
import User from "@/models/User";
import { LoginSchema, RegisterSchema } from "@/schemas/auth";
import { redirect } from "next/navigation";
import crypto from "node:crypto";

export async function login(formData: FormData) {
  await dbConnect();

  try {
    const rawUsername = String(formData.get("username") ?? "");
    const rawPassword = String(formData.get("password") ?? "");

    // Validate input
    const validationResult = LoginSchema.safeParse({ username: rawUsername, password: rawPassword });

    if (!validationResult.success) {
      throw new Error("Input tidak valid. Silakan periksa kembali username dan password Anda.");
    }

    const { username, password } = validationResult.data;

    // Find user by username
    const user = await User.findOne({ username });
    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET_KEY as string)
      .update(password)
      .digest("hex");

    if (!user || user?.password !== hashedPassword) {
      throw new Error("Login gagal. Silakan periksa kembali username dan password Anda.");
    }

    // Create session
    await createSession(user.id.toString(), user.username);

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat proses login. Silakan coba lagi."
    };
  }
}

export async function register(formData: FormData) {
  await dbConnect();

  try {
    const rawName = String(formData.get("name") ?? "");
    const rawEmail = String(formData.get("email") ?? "");
    const rawUsername = String(formData.get("username") ?? "");
    const rawPassword = String(formData.get("password") ?? "");

    // Validate input
    const validationResult = RegisterSchema.safeParse({
      name: rawName,
      email: rawEmail,
      username: rawUsername,
      password: rawPassword
    });

    if (!validationResult.success) {
      console.log(validationResult.error);

      return {
        success: false,
        error: "Input tidak valid. Silakan periksa kembali data yang Anda masukkan."
      };
    }

    const hashedPassword = crypto
      .createHmac("sha256", process.env.SECRET_KEY as string)
      .update(rawPassword)
      .digest("hex");
    const result = await User.create({
      name: rawName,
      email: rawEmail,
      username: rawUsername,
      password: hashedPassword
    });

    if (!result) {
      throw new Error("Gagal menyimpan data pengguna.");
    }

    return {
      success: true,
      error: undefined
    };
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === 11000) {
      return {
        success: false,
        error: "Username atau email sudah terdaftar."
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : "Terjadi kesalahan saat proses registrasi. Silakan coba lagi."
    };
  }
}

export async function logout() {
  await deleteSession();

  redirect("/");
}
