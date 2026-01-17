import * as motion from "motion/react-client";
import { PiBrainDuotone } from "react-icons/pi";

export default function Home() {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="container min-h-[calc(100vh-5rem)] flex flex-col justify-center py-8 text-center">
        <PiBrainDuotone className="text-7xl md:text-8xl lg:text-9xl mx-auto mb-4 text-primary" />
        <h1 className="mb-4 leading-tight">
          Sistem Pakar Diagnosa Hama dan Penyakit Pada Tanaman Padi Menggunakan Metode Forward Chaining dan Certainly
          Factor
        </h1>
        <p>
          <span className="block mb-2">
            Selamat datang di Sistem Pakar Diagnosa Hama dan Penyakit Pada Tanaman Padi. Sistem ini dirancang untuk
            membantu petani dalam mengidentifikasi hama dan penyakit yang menyerang tanaman padi mereka.
          </span>
        </p>
      </div>
    </motion.div>
  );
}
