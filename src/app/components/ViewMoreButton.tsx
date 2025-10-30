"use client";

interface ViewMoreButtonProps {
  count?: number;
  tooltip?: string;
}

export default function ViewMoreButton({ count = 4 }: ViewMoreButtonProps) {
  return (
    <button
      className="
        flex items-center justify-center
        w-[28px] h-[28px] rounded-full
        bg-[var(--secondary-bg)] text-[var(--icon-default)]
        text-[11px] font-semibold
        cursor-pointer transition-all duration-200
        hover:bg-[var(--button-glow)] hover:text-white
      "
    >
      +{count}
    </button>
  );
}
