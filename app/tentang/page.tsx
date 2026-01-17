import Image from "next/image";
import Link from "next/link";
// import { FaUser } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="container p-4 md:p-6">
      <h1 className="text-2xl font-bold mb-4">Tentang</h1>

      <p className="mb-6">
        <strong>Sistem Pakar Diagnosa Hama dan Penyakit Tanaman Padi</strong> ini dirancang untuk membantu petani dalam
        mengidentifikasi dan mengelola berbagai penyakit yang dapat mempengaruhi tanaman padi mereka. Dengan menggunakan
        teknologi terkini, sistem ini menyediakan informasi yang akurat dan relevan untuk mendukung keputusan pertanian
        yang lebih baik.
      </p>

      <p className="mb-3">Sistem ini dibangun dan dikembangkan oleh:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:grid-cols-3">
        <div className="p-4 border border-gray-300 shadow-sm rounded-lg">
          {/* <div className="rounded-full w-20 h-20 flex items-center justify-center bg-gray-200/50 mx-auto">
            <FaUser className="size-8 text-heading" />
          </div> */}
          {/* Rounded image */}
          <Image
            src={"https://avatars.githubusercontent.com/u/74356783?v=4"}
            alt="Andrian Fadhilla"
            width={80}
            height={80}
            className="rounded-full mx-auto"
          />

          <div className="mt-4 text-center">
            <h3 className="text-lg/tight font-semibold text-heading">Andrian Fadhilla</h3>

            <p className="mt-0.5 text-sm">109220640085</p>
            <p className="mt-3 text-pretty">Mahasiswa Teknik Informatika di STMIK Pranata Indonesia.</p>
            <Link
              href="https://www.anfa.my.id"
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              www.anfa.my.id
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
