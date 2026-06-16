import React from "react";

export type TextVariant = "Primary" | "Secondary" | "Terciary";

export interface TextProps extends Omit<React.AllHTMLAttributes<HTMLElement>, "as"> {
  as?: React.ElementType;
  asChild?: boolean;
  variant?: TextVariant;
}
