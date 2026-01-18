import * as motion from "motion/react-client";
import Link from "next/link";
import { PiBrainDuotone } from "react-icons/pi";

export default function Home() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="container min-h-[calc(100vh-5rem)] flex justify-center items-center py-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4 max-w-xl lg:max-w-2xl xl:max-w-3xl">
          <PiBrainDuotone className="text-7xl md:text-8xl lg:text-9xl mx-auto mb-4 text-primary" />
          <h1 className="mb-4 leading-tight">
            Sistem Pakar Diagnosa Hama dan Penyakit Pada Tanaman Padi Menggunakan Metode Forward Chaining dan Certainly
            Factor
          </h1>
          <p>
            <span className="block">
              Selamat datang di Sistem Pakar Diagnosa Hama dan Penyakit Pada Tanaman Padi. Sistem ini dirancang untuk
              membantu petani dalam mengidentifikasi hama dan penyakit yang menyerang tanaman padi mereka.
            </span>
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-4 sm:mt-6">
            <Link
              className="inline-block rounded border border-primary bg-primary px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-primary-dark"
              href="/diagnosa"
              title="Mulai Diagnosa"
            >
              Mulai Diagnosa
            </Link>
            <Link
              className="inline-block rounded border border-primary bg-transparent px-5 py-3 font-medium text-primary shadow-sm transition-colors hover:bg-primary/10"
              href="/penyakit"
              title="Daftar Penyakit"
            >
              Daftar Penyakit
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
