"use client";

import { deleteDisease } from "@/app/action/disease";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import DiseaseModal from "@/components/modals/DiseaseModal";
import Button from "@/components/ui/Button";
import toast from "@/libs/toast";
import { type TDisease } from "@/models/Disease";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { HiPlus } from "react-icons/hi";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

type Props = {
  diseases: Omit<TDisease, "createdAt" | "updatedAt">[];
  showActions?: boolean;
  showAddButton?: boolean;
};

export default function DiseaseTable({ diseases, showActions = false, showAddButton = false }: Props) {
  const [temporaryDisease, setTemporaryDisease] = useState<Omit<TDisease, "createdAt" | "updatedAt"> | null>(null);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const editDisease = useCallback(
    (id: string) => {
      const disease = diseases.find((d) => d.code === id);
      if (!disease) return;

      setTemporaryDisease(disease);
      setOpen(true);
    },
    [diseases]
  );

  const delDisease = useCallback(
    (id: string) => {
      const disease = diseases.find((d) => d.code === id);
      if (!disease) return;

      setTemporaryDisease(disease);
      setOpenDeleteModal(true);
    },
    [diseases]
  );

  const clearTemporaryDisease = useCallback(() => {
    if (temporaryDisease) {
      setTemporaryDisease(null);
    }
  }, [temporaryDisease]);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (open) setOpen(false);
    if (openDeleteModal) setOpenDeleteModal(false);

    clearTemporaryDisease();
  }, [clearTemporaryDisease, open, openDeleteModal]);

  const deleteAction = async () => {
    if (!temporaryDisease?.id) {
      toast.error("ID penyakit tidak valid.");
      return;
    }

    setIsDeleting(true);

    const id = temporaryDisease.id.toString();
    const result = await deleteDisease(id);

    if (result.success) {
      toast.success("Data penyakit berhasil dihapus.");
      closeModal();
    }

    if (result.error) {
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
          Tambah Penyakit
        </Button>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200">
          <thead className="ltr:text-left rtl:text-right bg-foreground">
            <tr className="*:font-medium *:text-white">
              <th className="px-3 py-2 whitespace-nowrap">Kode</th>
              <th className="px-3 py-2 whitespace-nowrap">Nama</th>
              {showActions && <th className="px-3 py-2 whitespace-nowrap">Aksi</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {diseases.length === 0 && (
              <tr>
                <td colSpan={showActions ? 3 : 2} className="px-3 py-6 text-center">
                  Tidak ada data penyakit.
                </td>
              </tr>
            )}

            {diseases.map((disease) => (
              <tr className="*:text-gray-900 *:first:font-medium" key={disease.code}>
                <td className="px-3 py-2 whitespace-nowrap">{disease.code}</td>
                <td className="px-3 py-2 whitespace-nowrap">{disease.name}</td>
                {showActions && (
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="inline-flex">
                      <button
                        type="button"
                        title="Edit Penyakit"
                        onClick={() => editDisease(disease.code)}
                        className="rounded-l-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
                      >
                        <IoPencilOutline className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => delDisease(disease.code)}
                        title="Hapus Penyakit"
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

      {open && <DiseaseModal disease={temporaryDisease ?? undefined} onClose={closeModal} />}
      {openDeleteModal && (
        <ConfirmationModal
          title="Hapus Penyakit"
          text={`Apakah Anda yakin ingin menghapus penyakit dengan kode ${temporaryDisease?.code}?`}
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
