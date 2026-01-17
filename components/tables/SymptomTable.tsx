"use client";

import { deleteSymptom } from "@/app/action/symptom";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import SymptomModal from "@/components/modals/SymptomModal";
import Button from "@/components/ui/Button";
import toast from "@/libs/toast";
import { TSymptom } from "@/models/Symptom";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { HiPlus } from "react-icons/hi";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

type SymptomTableProps = {
  symptoms: Omit<TSymptom, "createdAt" | "updatedAt">[];
  showActions?: boolean;
  showAddButton?: boolean;
};

export default function SymptomTable({ symptoms, showActions, showAddButton }: SymptomTableProps) {
  const [temporarySymptom, setTemporarySymptom] = useState<Omit<TSymptom, "createdAt" | "updatedAt"> | null>(null);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const editSymptom = useCallback(
    (id: string) => {
      const symptom = symptoms.find((s) => s.code === id);
      if (!symptom) return;

      setTemporarySymptom(symptom);
      setOpen(true);
    },
    [symptoms]
  );

  const delSymptom = useCallback(
    (id: string) => {
      const symptom = symptoms.find((s) => s.code === id);
      if (!symptom) return;

      setTemporarySymptom(symptom);
      setOpenDeleteModal(true);
    },
    [symptoms]
  );

  const clearTemporarySymptom = useCallback(() => {
    if (temporarySymptom) {
      setTemporarySymptom(null);
    }
  }, [temporarySymptom]);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (open) setOpen(false);
    if (openDeleteModal) setOpenDeleteModal(false);

    clearTemporarySymptom();
  }, [open, openDeleteModal, clearTemporarySymptom]);

  const deleteAction = async () => {
    if (!temporarySymptom?.id) {
      toast.error("Data gejala tidak ditemukan.");
      return;
    }

    setIsDeleting(true);

    const id = temporarySymptom.id.toString();
    const result = await deleteSymptom(id);

    if (result?.success) {
      toast.success("Data gejala berhasil dihapus.");
      router.refresh();
      closeModal();
    }

    if (result?.error) {
      toast.error(result.error);
    }

    setIsDeleting(false);
    router.refresh();
  };

  return (
    <>
      {showAddButton && (
        <Button className="my-4 px-4 py-3" onClick={openModal}>
          <HiPlus className="mr-2 inline-block" />
          Tambah Gejala
        </Button>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right bg-foreground">
            <tr className="*:font-medium *:text-white">
              <th className="px-3 py-2 whitespace-nowrap">Kode</th>
              <th className="px-3 py-2 whitespace-nowrap">Nama</th>
              <th className="px-3 py-2 whitespace-nowrap">Nilai CF Pakar</th>
              {showActions && <th className="px-3 py-2 whitespace-nowrap">Aksi</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {symptoms.length === 0 && (
              <tr>
                <td colSpan={showActions ? 4 : 3} className="px-3 py-6 text-center">
                  Tidak ada data gejala.
                </td>
              </tr>
            )}

            {symptoms.map((symptom) => (
              <tr className="*:text-gray-900 *:first:font-medium" key={symptom.code}>
                <td className="px-3 py-2 whitespace-nowrap">{symptom.code}</td>
                <td className="px-3 py-2 whitespace-nowrap">{symptom.name}</td>
                <td className="px-3 py-2 whitespace-nowrap">{symptom.expertCF}</td>
                {showActions && (
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="inline-flex">
                      <button
                        type="button"
                        title="Edit Gejala"
                        onClick={() => editSymptom(symptom.code)}
                        className="rounded-l-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
                      >
                        <IoPencilOutline className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => delSymptom(symptom.code)}
                        title="Hapus Gejala"
                        className="-ml-px rounded-r-sm border border-gray-200 px-3 py-2 font-medium text-red-600 transition-colors hover:bg-red-200 hover:border-red-200 focus:border-red-200 focus:z-10 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
                      >
                        <IoTrashOutline className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && <SymptomModal symptom={temporarySymptom ?? undefined} onClose={closeModal} />}
      {openDeleteModal && (
        <ConfirmationModal
          title="Hapus Gejala"
          text={`Apakah Anda yakin ingin menghapus gejala dengan kode ${temporarySymptom?.code}?`}
          onClose={closeModal}
          onConfirm={deleteAction}
          isLoading={isDeleting}
          confirmButtonText="Hapus"
          confirmButtonStyle="danger"
        />
      )}
    </>
  );
}
