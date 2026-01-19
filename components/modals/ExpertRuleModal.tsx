"use client";

import { insertRule, updateRule } from "@/app/action/rule";
import Input from "@/components/ui/Input";
import toast from "@/libs/toast";
import { type TDisease } from "@/models/Disease";
import { type TRulePopulated } from "@/models/Rule";
import { type TSymptom } from "@/models/Symptom";
import * as motion from "motion/react-client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

type ExpertRuleModalProps = {
  rule: Omit<TRulePopulated, "createdAt" | "updatedAt"> | null;
  diseases: TDisease[];
  symptoms: TSymptom[];
  onClose: () => void;
};

export default function ExpertRuleModal({ rule, diseases, symptoms, onClose }: ExpertRuleModalProps) {
  const [selected, setSelected] = useState<string[]>(
    rule ? rule.symptom_ids.map((symptom) => symptom.id?.toString()).filter((id): id is string => Boolean(id)) : []
  );
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const toggleSelect = useCallback(
    (symptomId: string) => {
      if (!symptomId) return;
      if (selected.includes(symptomId)) {
        setSelected(selected.filter((id) => id !== symptomId));
      } else {
        setSelected([...selected, symptomId]);
      }
    },
    [selected]
  );

  const action = async (formData: FormData) => {
    if (selected.length === 0) return;
    setIsLoading(true);

    let result = null;
    formData.set("symptomIds", JSON.stringify(selected));

    if (rule) {
      result = await updateRule(formData);
    } else {
      result = await insertRule(formData);
    }

    if (result?.success) {
      toast.success(`Data aturan pakar berhasil ${rule ? "diperbarui" : "disimpan"}.`);
      router.refresh();
      onClose();
    }

    if (result?.error) {
      toast.error(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 min-h-screen grid place-content-center-safe bg-black/50 px-4 pt-8 pb-24 overflow-auto"
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
              {rule ? `Edit Aturan: ${rule.rule_id}` : "Tambah Aturan"}
            </h2>
            <p>{rule ? `Memperbarui aturan pakar dengan id "${rule.rule_id}".` : "Membuat aturan pakar baru."}</p>
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
          {rule && (
            <Input
              name="id"
              label="ID"
              className="hidden"
              inputClassName="py-3 px-4 mb-4"
              readOnly
              required
              defaultValue={(rule?.id as unknown as string) ?? ""}
            />
          )}

          <Input
            name="ruleId"
            label="Kode Aturan"
            inputClassName="py-3 px-4 mb-4"
            required
            autoFocus
            defaultValue={rule?.rule_id ?? ""}
            disabled={isLoading}
          />

          <label>
            <span className="mt-0.5 w-full rounded border-gray-300 sm:text-sm">Penyakit</span>

            <select
              name="diseaseId"
              defaultValue={rule?.disease_id.id?.toString() ?? ""}
              className="mt-0.5 w-full bg-white rounded border-gray-300 hover:border-primary focus:border-primary active:border-primary ring-0 shadow-sm sm:text-sm disabled:cursor-not-allowed disabled:opacity-60 disabled:bg-gray-100 py-3 px-4 mb-4"
              disabled={isLoading}
              required
            >
              <option value="" disabled>
                -- Pilih Penyakit --
              </option>
              {diseases.map((disease) => (
                <option key={disease.code} value={disease.id?.toString() ?? ""}>
                  {disease.name}
                </option>
              ))}
            </select>
          </label>

          <details className="group [&amp;_summary::-webkit-details-marker]:hidden mb-4">
            <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white px-4 py-3 font-medium text-gray-900 hover:bg-gray-50">
              <span>Pilih Gejala</span>

              <svg
                className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </summary>

            <div className="p-4">
              <ul>
                {symptoms.map((symptom) => {
                  const isSelected = selected.includes(symptom.id?.toString() ?? "");

                  return (
                    <li key={symptom.code} className="mb-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          value={symptom.id?.toString() ?? ""}
                          checked={isSelected}
                          className="size-5 rounded border-gray-300 shadow-sm cursor-pointer checked:bg-primary focus:ring-2 focus:ring-primary"
                          onChange={() => toggleSelect(symptom.id?.toString() ?? "")}
                          required={selected.length === 0}
                        />
                        <span>{symptom.name}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          </details>
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
            title={rule ? "Update rule" : "Save rule"}
            type="submit"
            className="rounded bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            disabled={isLoading}
          >
            {rule ? (isLoading ? "Updating..." : "Update") : isLoading ? "Saving..." : "Save"}
          </button>
        </footer>
      </motion.form>
    </div>
  );
}
