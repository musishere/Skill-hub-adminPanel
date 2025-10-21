"use client";

import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
  content: string;
  children: ReactNode;
}

export default function TooltipWrapper({ content, children }: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={150}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="inline-flex items-center justify-center cursor-pointer">
            {children}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
