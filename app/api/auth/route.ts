import User from "@/models/User";
import { RegisterSchema } from "@/schemas/auth";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const validationResult = RegisterSchema.safeParse({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password
    });

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Input tidak valid. Silakan periksa kembali data yang Anda masukkan."
        }),
        { status: 400 }
      );
    }

    const { name, email, username, password } = validationResult.data;

    await User.create({
      name,
      email,
      username,
      password
    });

    return new Response(
      JSON.stringify({
        success: true,
        error: undefined
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Terjadi kesalahan saat proses registrasi. Silakan coba lagi."
      }),
      { status: 500 }
    );
  }
}
