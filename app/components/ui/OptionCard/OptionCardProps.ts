import { LucideIcon } from "lucide-react";

export type OptionCardVariant = "Primary" | "Secondary";

interface OptionCardBase {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  variant?: OptionCardVariant;
  className?: string;
}

interface OptionCardLink extends OptionCardBase {
  href: string;
  onClick?: never;
}

interface OptionCardButton extends OptionCardBase {
  onClick: () => void;
  href?: never;
}

export type OptionCardProps = OptionCardLink | OptionCardButton;
