"use client";

import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  tooltip?: string;
}

export default function IconButton({ icon, tooltip }: IconButtonProps) {
  return (
    <button
      className="relative p-2 rounded-full hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
      title={tooltip}
    >
      {icon}
    </button>
  );
}
