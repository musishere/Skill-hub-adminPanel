"use client";

import { ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

interface IconButtonProps {
  icon: ReactNode;
  tooltip?: string;
}

export default function IconButton({ icon, tooltip }: IconButtonProps) {
  // Clone icon to apply consistent sizing and color
  const sizedIcon = isValidElement(icon)
    ? cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className:
          "w-[14px] h-[14px] text-[var(--icon-default)] transition-colors duration-200 group-hover:text-white",
      })
    : icon;


  return (
    <button
      className="
        group relative flex items-center justify-center
        w-[28px] h-[28px] rounded-full
        bg-[var(--secondary-bg)] text-[var(--icon-default)]
        cursor-pointer transition-all duration-200
        hover:-translate-y-[2px]
        hover:bg-[var(--button-glow)]
        hover:text-white
      "
    >
      {sizedIcon}

      {/* Tooltip */}
      {tooltip && (
        <span
          className="
            absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2
            bg-[var(--primary-text)] text-white
            px-[10px] py-[6px] rounded-[4px]
            text-xs whitespace-nowrap
            opacity-0 invisible transition-all duration-200
            z-10 pointer-events-none
            group-hover:opacity-100 group-hover:visible
          "
        >
          {tooltip}
          <span
            className="
              absolute left-1/2 top-full -translate-x-1/2
              border-[6px] border-solid border-transparent
              border-t-[var(--primary-text)]
            "
            aria-hidden="true"
          />
        </span>
      )}
    </button>
  );
}
