"use client";

import { deleteRule } from "@/app/action/rule";
import ConfirmationModal from "@/components/modals/ConfirmationModal";
import ExpertRuleModal from "@/components/modals/ExpertRuleModal";
import Button from "@/components/ui/Button";
import toast from "@/libs/toast";
import { type TDisease } from "@/models/Disease";
import { type TRulePopulated } from "@/models/Rule";
import { type TSymptom } from "@/models/Symptom";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { HiPlus } from "react-icons/hi";
import { IoPencilOutline, IoTrashOutline } from "react-icons/io5";

type Props = {
  rules: Omit<TRulePopulated, "createdAt" | "updatedAt">[];
  diseases: TDisease[];
  symptoms: TSymptom[];
  showActions?: boolean;
  showAddButton?: boolean;
};

export default function ExpertRuleTable({ rules, showActions, diseases, symptoms, showAddButton }: Props) {
  const [temporaryRule, setTemporaryRule] = useState<Omit<TRulePopulated, "createdAt" | "updatedAt"> | null>(null);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const editRule = useCallback(
    (id: string) => {
      const rule = rules.find((r) => r.rule_id === id);
      if (!rule) return;

      setTemporaryRule(rule);
      setOpen(true);
    },
    [rules]
  );

  const delRule = useCallback(
    (id: string) => {
      const rule = rules.find((r) => r.rule_id === id);
      if (!rule) return;

      setTemporaryRule(rule);
      setOpenDeleteModal(true);
    },
    [rules]
  );

  const clearTemporaryRule = useCallback(() => {
    if (temporaryRule) {
      setTemporaryRule(null);
    }
  }, [temporaryRule]);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (open) setOpen(false);
    if (openDeleteModal) setOpenDeleteModal(false);

    clearTemporaryRule();
  }, [open, openDeleteModal, clearTemporaryRule]);

  const deleteAction = async () => {
    if (!temporaryRule?.id) {
      toast.error("ID aturan pakar tidak valid.");
      return;
    }

    setIsDeleting(true);

    const id = String(temporaryRule.id.toString() ?? "");
    const result = await deleteRule(id);

    if (result?.success) {
      toast.success("Data aturan pakar berhasil dihapus.");
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
              <th className="px-3 py-2 whitespace-nowrap">Kode Aturan</th>
              <th className="px-3 py-2 whitespace-nowrap">Penyakit</th>
              <th className="px-3 py-2 whitespace-nowrap">Gejala</th>
              {showActions && <th className="px-3 py-2 whitespace-nowrap">Aksi</th>}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 *:even:bg-gray-50">
            {rules.length === 0 && (
              <tr>
                <td colSpan={showActions ? 4 : 3} className="px-3 py-6 text-center">
                  Tidak ada data aturan pakar.
                </td>
              </tr>
            )}

            {rules.map((rule) => (
              <tr key={rule.rule_id}>
                <td className="px-3 py-2 whitespace-nowrap font-bold">{rule.rule_id}</td>
                <td className="px-3 py-2 whitespace-nowrap">{rule.disease_id.name}</td>
                <td className="px-3 py-2 whitespace-wrap min-w-md max-w-lg">
                  {rule.symptom_ids.map((symptom) => symptom.name).join(", ")}
                </td>
                {showActions && (
                  <td className="px-3 py-2 whitespace-nowrap">
                    <div className="inline-flex">
                      <button
                        type="button"
                        title="Edit Aturan Pakar"
                        onClick={() => editRule(rule.rule_id)}
                        className="rounded-l-sm border border-gray-200 px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 hover:text-gray-900 focus:z-10 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white focus:outline-none disabled:pointer-events-auto disabled:opacity-50"
                      >
                        <IoPencilOutline className="h-5 w-5" />
                      </button>

                      <button
                        type="button"
                        onClick={() => delRule(rule.rule_id)}
                        title="Hapus Aturan Pakar"
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

      {open && (
        <ExpertRuleModal rule={temporaryRule ?? null} diseases={diseases} symptoms={symptoms} onClose={closeModal} />
      )}
      {openDeleteModal && (
        <ConfirmationModal
          title="Hapus Aturan Pakar"
          text={`Apakah Anda yakin ingin menghapus aturan dengan id "${temporaryRule?.rule_id}"? Tindakan ini tidak dapat dibatalkan.`}
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
