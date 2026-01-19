"use client";

import { login } from "@/app/action/auth";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import toast from "@/libs/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { FiArrowLeft } from "react-icons/fi";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const action = async (formData: FormData) => {
    setIsLoading(true);

    const result = await login(formData);

    if (result?.success) {
      toast.success("Login berhasil! Selamat datang kembali.");
      router.replace("/admin");
      router.refresh();
    }

    if (result?.error) {
      toast.error(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 w-full max-w-md lg:max-w-lg md:bg-background rounded-lg md:shadow-md">
      {/* Back to homepage */}
      <Link href="/" className="text-primary hover:underline mb-6 inline-block">
        <FiArrowLeft className="inline align-middle mr-1.5" /> Kembali ke Halaman Utama
      </Link>

      <h1 className="leading-tight mb-2">Halo 👋</h1>
      <p className="mb-6">Silahkan masuk dengan akun Anda untuk melanjutkan.</p>

      <form action={action}>
        <Input name="username" label="Username" inputClassName="py-3 px-4 mb-4" disabled={isLoading} />
        <Input name="password" label="Password" type="password" inputClassName="py-3 px-4 mb-4" disabled={isLoading} />

        <Button type="submit" className="py-3 px-4 w-full" disabled={isLoading}>
          {isLoading ? "Memproses..." : "Masuk"}
        </Button>
      </form>
    </div>
  );
}
