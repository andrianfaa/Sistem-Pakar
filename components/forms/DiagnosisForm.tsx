"use client";

import DiagnosisResultModal from "@/components/modals/DiagnosisResultModal";
import Button from "@/components/ui/Button";
import redaxios from "@/libs/redaxios";
import toast from "@/libs/toast";
import { type TSymptom } from "@/models/Symptom";
import { type FormEvent, useCallback, useState } from "react";

interface DiagnosisFormProps {
  symptoms: Omit<TSymptom, "expertCF" | "createdAt" | "updatedAt">[];
}

interface SelectedSymptom {
  id: string;
  cf: number; // Certainty Factor provided by the user
}

export interface DiagnosisRequestPayload {
  status: string;
  message: string;
  data?: Array<{
    diseaseId: string;
    diseaseName: string;
    percentageCF: string;
    cf: number;
  }>;
  error?: unknown;
}

const CONFIDENCE_LEVELS: number[] = [0, 0.2, 0.4, 0.6, 0.8, 1];
const LABELS: Record<number, string> = {
  0: "Tidak Yakin",
  0.2: "Sedikit",
  0.4: "Cukup",
  0.6: "Yakin",
  0.8: "Sangat",
  1: "Pasti"
};

export default function DiagnosisForm({ symptoms }: DiagnosisFormProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([]);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisRequestPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleSelectSymptom = useCallback((symptomId: string) => {
    setSelectedSymptoms((prev) => {
      if (prev.find((s) => s.id === symptomId)) {
        return prev.filter((s) => s.id !== symptomId);
      } else {
        return [...prev, { id: symptomId, cf: 0 }];
      }
    });
  }, []);

  const handleCFChange = useCallback((symptomId: string, cfValue: number) => {
    setSelectedSymptoms((prev) => prev.map((s) => (s.id === symptomId ? { ...s, cf: cfValue } : s)));
  }, []);

  const handleResetSelections = useCallback(() => {
    setSelectedSymptoms([]);
  }, []);

  const clearDiagnosisResult = useCallback(() => {
    setDiagnosisResult(null);
  }, []);

  const closeModal = useCallback(() => {
    setOpenModal(false);
    clearDiagnosisResult();
  }, [clearDiagnosisResult]);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      // Validate at least 2 symptoms selected with CF > 0
      if (selectedSymptoms.length < 2 || selectedSymptoms.filter((s) => s.cf > 0).length < 2) {
        toast.error("Pilih minimal 2 gejala dengan tingkat keyakinan lebih dari 0.");
        return;
      }

      setOpenModal(true);
      setIsLoading(true);

      try {
        const filteredSymptoms = selectedSymptoms.filter((s) => s.cf > 0);
        const response = await redaxios.post("/api/diagnosa", {
          symptoms: filteredSymptoms
        });

        setDiagnosisResult(response.data);
      } catch (error) {
        console.error("Error during diagnosis request:", error);
        toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim data diagnosis.");
        closeModal();
      } finally {
        setIsLoading(false);
      }
    },
    [selectedSymptoms, closeModal]
  );

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <p className="text-lg font-medium">Pilih Gejala yang Anda Alami</p>

        <div
          className={`flex flex-col md:flex-row md:flex-wrap items-start justify-between gap-4 transition-all ${selectedSymptoms.length > 0 ? "mb-28" : ""}`}
        >
          {symptoms.map((symptom) => {
            if (!symptom.id) return null;

            const id = symptom.id.toString();
            const isSelected = selectedSymptoms.some((s) => s.id === id);
            const selectedSymptom = selectedSymptoms.find((s) => s.id === id);

            return (
              <div
                key={id}
                className={`border rounded ${isSelected ? "border-primary bg-primary/2.5" : "border-gray-300"} w-full md:w-[calc(50%-8px)] transition-all ${isLoading ? "opacity-50 pointer-events-none" : ""}`}
              >
                <label className="flex items-start space-x-3 p-4 mb-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelectSymptom(id)}
                    className="form-checkbox mt-[1.65px] h-5 w-5 text-primary rounded transition-all hidden"
                    hidden
                    disabled={isLoading}
                  />
                  <span className={`${isSelected ? "text-primary font-bold" : "font-medium"}`}>{symptom.name}</span>
                </label>

                {isSelected && (
                  <div className="px-4 pb-4">
                    <label className="block text-sm mb-2">Tingkat Keyakinan Anda (0 - 1):</label>

                    {/* if you want to use radio buttons instead of button group, uncomment this section */}
                    {/* <div>
                    {CONFIDENCE_LEVELS.map((val) => (
                      <label key={val} className="mb-2 cursor-pointer block w-full">
                        <input
                          type="radio"
                          name={`cf-${id}`}
                          value={val}
                          checked={selectedSymptom?.cf === val}
                          onChange={() => handleCFChange(id, val)}
                          className="form-radio h-4 w-4 text-primary transition-all"
                        />
                        <span
                          className={`ml-2 text-sm ${val === selectedSymptom?.cf ? "font-semibold text-primary" : ""}`}
                        >
                          {LABELS[val]}
                        </span>
                      </label>
                    ))}
                  </div> */}

                    {/* Button group */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {CONFIDENCE_LEVELS.map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleCFChange(id, val)}
                          className={`
                          px-2 py-3 border text-sm
                          ${selectedSymptom?.cf === val ? "bg-primary text-white border-primary font-semibold" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
                          rounded 
                        `}
                        >
                          {LABELS[val]} ({val})
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`fixed left-0 w-full p-4 shadow-md ${selectedSymptoms.length > 0 ? "bottom-0" : "-bottom-28"} transition-all bg-white border-t border-t-gray-200`}
        >
          <div className="container flex items-center justify-end">
            <button
              type="button"
              className="text-sm text-gray-600 px-6 py-3 border rounded hover:bg-gray-100 transition disabled:opacity-50 disabled:pointer-events-none mr-4 w-1/2 md:w-auto"
              onClick={handleResetSelections}
              disabled={selectedSymptoms.length === 0}
            >
              Reset Pilihan
            </button>

            <Button type="submit" className="px-6 py-3 w-1/2 md:w-auto" disabled={selectedSymptoms.length === 0}>
              Diagnosis
            </Button>
          </div>
        </div>
      </form>

      <DiagnosisResultModal
        isOpen={openModal}
        isLoading={isLoading}
        onClose={closeModal}
        diagnosisResult={diagnosisResult}
      />
    </>
  );
}
