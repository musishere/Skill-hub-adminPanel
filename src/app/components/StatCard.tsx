import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string; // Added change property
  sub?: string;
}

const StatCard = ({ title, value, icon, change }: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
      <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
        {change && (
          <p className="text-xs text-green-500 mt-1">{change}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;