import Link from "next/link";
import { cn } from "@/app/utils/cn";
import { OptionCardProps, OptionCardVariant } from "./OptionCardProps";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";

const cardClasses: Record<OptionCardVariant, string> = {
  Primary: "bg-neutral-900",
  Secondary: "bg-neutral-900/40",
};

const iconBoxClasses: Record<OptionCardVariant, string> = {
  Primary: "border-neutral-800",
  Secondary: "border-neutral-800",
};

const actionClasses: Record<OptionCardVariant, string> = {
  Primary:
    "border-2 border-white text-white hover:bg-white hover:text-black",
  Secondary:
    "bg-ondadura-yellow-400 border-2 border-ondadura-yellow-400 text-black hover:bg-transparent hover:text-white hover:border-white",
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
  const actionBaseClasses =
    "uppercase text-xs font-bold tracking-widest py-3 px-6 transition-all duration-200 text-center";

  return (
    <div
      className={cn(
        "border-2 border-neutral-800 hover:border-ondadura-yellow-400 p-4 sm:p-6 flex flex-col justify-between gap-6 sm:gap-8 transition-all duration-300 group",
        cardClasses[variant],
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "w-10 h-10 lg:w-12 lg:h-12 bg-neutral-950 flex items-center justify-center border-2 transition-colors",
              iconBoxClasses[variant],
            )}
          >
            <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-ondadura-yellow-400" />
          </div>
          <Heading
            as="h3"
            variant="Terciary"
            className="text-white font-extrabold uppercase tracking-wider text-base sm:text-sm lg:text-xl"
          >
            {title}
          </Heading>
        </div>

        <div className="w-12 h-0.5 bg-ondadura-yellow-400 hide-on-short" />

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
