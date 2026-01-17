import DashboardCard from "@/components/DashboardCard";
import dbConnect from "@/libs/mongodb";
import Disease from "@/models/Disease";
import Rule from "@/models/Rule";
import Symptom from "@/models/Symptom";

import { HiClipboardDocumentList } from "react-icons/hi2";
import { TbVirus, TbVirusSearch } from "react-icons/tb";

const fetchAdminData = async () => {
  await dbConnect();

  // Count total number of records in each collection
  const [rules, diseases, symptoms] = await Promise.all([
    Rule.countDocuments(),
    Disease.countDocuments(),
    Symptom.countDocuments()
  ]);

  return { rules, diseases, symptoms };
};

export default async function AdminPage() {
  const { rules, diseases, symptoms } = await fetchAdminData();
  const data = [
    {
      icon: <HiClipboardDocumentList className="w-7 h-7 text-heading" />,
      title: "Total Aturan Pakar",
      count: rules
    },
    {
      icon: <TbVirus className="w-7 h-7 text-heading" />,
      title: "Total Penyakit",
      count: diseases
    },
    {
      icon: <TbVirusSearch className="w-7 h-7 text-heading" />,
      title: "Total Gejala",
      count: symptoms
    }
  ];

  return (
    <div className="container p-4 md:p-6">
      <h1>Admin Page</h1>
      <p className="mb-4">Selamat datang di halaman admin. Berikut adalah ringkasan data dalam sistem.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item) => (
          <DashboardCard key={item.title} icon={item.icon} title={item.title} count={item.count} />
        ))}
      </div>
    </div>
  );
}
