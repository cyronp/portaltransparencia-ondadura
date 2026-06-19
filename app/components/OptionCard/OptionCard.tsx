"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleHelp } from "lucide-react";
import { cn } from "@/app/utils/cn";
import { OptionCardProps, OptionCardVariant } from "./OptionCardProps";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Separator } from "../ui/Separator/Separator";

const cardClasses: Record<OptionCardVariant, string> = {
  Primary: "bg-neutral-900",
  Secondary: "bg-neutral-800",
};

const actionClasses: Record<OptionCardVariant, string> = {
  Primary: "border-2 border-white text-white hover:bg-white hover:text-black",
  Secondary:
    "bg-ondadura-yellow-200 border-2 border-ondadura-yellow-200 text-black hover:bg-transparent hover:text-white hover:border-white",
};

export default function OptionCard({
  icon: Icon,
  title,
  description,
  actionLabel,
  variant = "Primary",
  className,
  ...rest
}: OptionCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const actionBaseClasses =
    "uppercase text-xs font-bold tracking-widest py-2 lg:py-3 px-6 transition-all duration-200 text-center";

  return (
    <div
      className={cn(
        "border-2 border-neutral-700 hover:border-ondadura-yellow-200 p-4 sm:p-6 flex flex-col justify-between gap-6 sm:gap-8 transition-all duration-300 group",
        cardClasses[variant],
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="relative flex items-center gap-4">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-ondadura-yellow-200" />
          <Heading
            as="h3"
            variant="Terciary"
            className="text-white font-extrabold uppercase tracking-wide text-base sm:text-sm lg:text-xl"
          >
            {title}
          </Heading>
          <button
            type="button"
            onClick={() => setShowTooltip((prev) => !prev)}
            className="ml-auto shrink-0 text-white cursor-pointer lg:hidden block"
            aria-label="Ver descrição"
          >
            <CircleHelp size={18} />
          </button>

          {/* Tooltip bubble */}
          {showTooltip && (
            <div className="absolute bottom-full left-0 -right-1 z-10 show-on-short">
              <div className="bg-neutral-900 text-white text-xs leading-relaxed rounded-lg px-4 py-3 shadow-lg border border-neutral-700">
                {description}
                <div className="absolute -bottom-1 right-2 w-2 h-2 bg-neutral-900 border-r border-b border-neutral-700 rotate-45" />
              </div>
            </div>
          )}
        </div>

        <Separator className="w-full h-0.5 bg-ondadura-yellow-200" />

        <Text
          variant="Secondary"
          className="text-neutral-400 leading-relaxed hide-on-short"
        >
          {description}
        </Text>
      </div>

      {"href" in rest && rest.href ? (
        <Link
          href={rest.href}
          className={cn(actionBaseClasses, actionClasses[variant], "block")}
        >
          {actionLabel}
        </Link>
      ) : (
        <button
          onClick={"onClick" in rest ? rest.onClick : undefined}
          className={cn(
            actionBaseClasses,
            actionClasses[variant],
            "cursor-pointer",
          )}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
