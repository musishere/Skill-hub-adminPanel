import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: "positive" | "negative" | "neutral";
  change?: string;
  tooltip?: string;
}

const StatCard = ({ title, value, icon, trend, change, tooltip }: StatCardProps) => {
  const trendClasses = {
    positive: "bg-[rgba(82,196,26,0.1)] text-[#52C41A]",
    negative: "bg-[rgba(255,77,79,0.1)] text-[#FF4D4F]",
    neutral: "bg-[rgba(102,102,102,0.1)] text-[#666666]",
  };

  return (
    <div className="flex items-center bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      {/* Icon Section */}
      <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 bg-[var(--secondary-bg)] text-[var(--icon-default)]">
        {icon}
      </div>

      {/* Info Section */}
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-1">
          <h3 className="text-sm font-medium text-[var(--mobile-secondary)] truncate">
            {title}
          </h3>
          {tooltip && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="text-xs text-gray-700 bg-white border border-gray-200 rounded-md shadow-md px-2 py-1 max-w-[200px]">
                  {tooltip}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        <div className="flex items-center gap-2">
          <p className="text-xl font-semibold text-[var(--primary-text)]">{value}</p>
          {trend && change && (
            <span
              className={`text-xs font-medium px-1.5 py-0.5 rounded ${trendClasses[trend]}`}
            >
              {change}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
