"use client";

import { type DiagnosisRequestPayload } from "@/components/forms/DiagnosisForm";
import Button from "@/components/ui/Button";
import * as motion from "motion/react-client";
import { useEffect } from "react";

interface DiagnosisResultModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  diagnosisResult: DiagnosisRequestPayload | null;
}

export default function DiagnosisResultModal({
  isOpen,
  isLoading,
  onClose,
  diagnosisResult
}: DiagnosisResultModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 grid place-content-center-safe bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      {isLoading ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full md:w-xl lg:w-2xl rounded-lg bg-white p-6 shadow-lg"
        >
          <div className="p-4 md:p-6">
            <div className="text-center">
              <svg
                className="mx-auto size-10 animate-spin text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>

              <p className="mt-4 font-medium text-gray-700">Memproses hasil diagnosis Anda...</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="w-full max-w-md md:w-md md:max-w-xl lg:w-xl rounded-lg bg-white p-6 shadow-lg"
        >
          {diagnosisResult?.data ? (
            <div>
              <h2 className="text-green-800">Hasil Diagnosa Tertinggi</h2>
              <p className="md:text-lg mb-2">Tanaman Anda kemungkinan besar terkena:</p>

              <div className="bg-green-50 p-4 md:p-6 rounded-lg border border-green-600">
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-heading">
                  {diagnosisResult.data[0]?.diseaseName}
                </span>
                <p className="text-sm md:text-base lg:text-lg mt-3 font-semibold text-green-600">
                  Tingkat Keyakinan:{" "}
                  <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full font-bold">
                    {diagnosisResult.data[0]?.percentageCF}%
                  </span>
                </p>
              </div>

              <div className="mt-3 flex flex-col items-center gap-2">
                {diagnosisResult.data.map((result, idx: number) => {
                  return idx === 0 ? null : (
                    <div
                      key={idx}
                      className={`border border-gray-200 p-4 rounded shadow-sm bg-white ${idx === 1 ? "w-11/12" : idx === 2 ? "w-10/12" : "w-9/12"}`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold">{result.diseaseName}</span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-bold">
                          {result.percentageCF}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">Tidak ada hasil diagnosis yang tersedia.</p>
          )}

          <div className="mt-6 text-center">
            <Button title="Tutup hasil diagnosis" type="button" className="px-6 py-3" onClick={onClose}>
              Tutup
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
