interface DashboardCardProps {
  icon?: React.ReactNode;
  title: string;
  count: number;
}

export default function DashboardCard({ icon, title, count }: DashboardCardProps) {
  return (
    <div className="p-4 border border-gray-300 rounded shadow">
      {icon && <div className="mb-4 w-14 h-14 rounded bg-gray-200/50 flex items-center justify-center">{icon}</div>}
      <p className="font-semibold mb-2">{title}</p>
      <p className="text-2xl text-heading font-bold">{count}</p>
    </div>
  );
}
