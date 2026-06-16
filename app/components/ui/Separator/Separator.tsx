import { cn } from "@/app/utils/cn";
import * as React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
}

export const Separator = ({
  orientation = "horizontal",
  className,
  ...props
}: SeparatorProps) => {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-neutral-800",
        orientation === "horizontal" ? "h-px w-full" : "w-0.5 self-stretch",
        className,
      )}
      {...props}
    />
  );
};
