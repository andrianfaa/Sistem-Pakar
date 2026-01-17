"use client";

import { insertDisease, updateDisease } from "@/app/action/disease";
import Input from "@/components/ui/Input";
import toast from "@/libs/toast";
import { type TDisease } from "@/models/Disease";
import * as motion from "motion/react-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type DiseaseModalProps = {
  disease?: Omit<TDisease, "createdAt" | "updatedAt">;
  onClose?: () => void;
};

export default function DiseaseModal({ disease, onClose }: DiseaseModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const action = async (formData: FormData) => {
    let result = null;

    setIsLoading(true);

    if (disease) {
      result = await updateDisease(formData);
    } else {
      result = await insertDisease(formData);
    }

    if (result.success) {
      toast.success("Data penyakit berhasil disimpan.");
      router.refresh();
      onClose?.();
    }

    if (result.error) {
      toast.error(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center-safe bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <motion.form
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full max-w-md md:w-md md:max-w-xl lg:w-xl rounded-lg bg-white p-6 shadow-lg"
        action={action}
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
              {disease ? `Edit Penyakit: ${disease.name}` : "Tambah Penyakit"}
            </h2>
            <p>Isi data penyakit dengan lengkap dan benar.</p>
          </div>

          <button
            type="button"
            className="-me-4 -mt-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-50 hover:text-gray-600 focus:outline-none"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="mt-4">
          {disease && (
            <Input
              name="id"
              label="ID"
              className="hidden"
              inputClassName="py-3 px-4 mb-4"
              readOnly
              required
              defaultValue={(disease?.id as unknown as string) ?? ""}
            />
          )}

          <Input
            name="code"
            label="Kode"
            inputClassName="py-3 px-4 mb-4"
            required
            autoFocus
            defaultValue={disease?.code ?? ""}
            disabled={isLoading}
          />
          <Input
            name="name"
            label="Nama"
            inputClassName="py-3 px-4 mb-4"
            required
            defaultValue={disease?.name ?? ""}
            disabled={isLoading}
          />
          <Input
            name="description"
            label="Deskripsi"
            inputClassName="py-3 px-4 mb-4"
            disabled
            readOnly
            defaultValue={disease?.description ?? ""}
          />
        </div>

        <footer className="mt-2 flex justify-end gap-2">
          <button
            title="Close Modal"
            type="button"
            className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            title={disease ? "Update Disease" : "Save Disease"}
            type="submit"
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            disabled={isLoading}
          >
            {disease ? (isLoading ? "Updating..." : "Update") : isLoading ? "Saving..." : "Save"}
          </button>
        </footer>
      </motion.form>
    </div>
  );
}
