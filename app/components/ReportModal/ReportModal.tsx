"use client";

import React, { useState, useEffect } from "react";
import { CalendarDays, ChevronDown, Construction, X } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/components/ui/DropdownMenu/DropdownMenu";

const AVAILABLE_DATES = [
  { value: "2026-06", label: "Junho 2026" },
  { value: "2026-05", label: "Maio 2026" },
  { value: "2026-04", label: "Abril 2026" },
  { value: "2026-03", label: "Março 2026" },
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectedLabel = AVAILABLE_DATES.find(
    (d) => d.value === selectedDate,
  )?.label;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 animate-fade-in-opacity overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-neutral-950 border-2 border-neutral-800 p-6 sm:p-10 flex flex-col gap-4 md:gap-6 animate-fade-in overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 border border-neutral-800 hover:border-white text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center gap-4 text-center">
          <Heading
            as="h2"
            variant="Secondary"
            className="text-white font-extrabold uppercase tracking-wider text-lg"
          >
            Selecione o Período
          </Heading>

        </div>

        <div className="w-full flex flex-col gap-2 mt-4">
          <Text
            as="span"
            variant="Terciary"
            className="text-ondadura-yellow-200 uppercase tracking-widest font-extrabold text-[10px] font-mono"
          >
            Período de referência desejado
          </Text>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="group w-full flex items-center justify-between bg-transparent border-2 border-neutral-700 hover:border-ondadura-yellow-200/60 px-4 py-3 cursor-pointer text-sm font-mono tracking-wider uppercase font-bold text-white transition-colors"
              >
                <span className="flex items-center gap-3">
                  <CalendarDays className="w-4 h-4 text-ondadura-yellow-200 shrink-0" />
                  <span
                    className={
                      selectedLabel ? "text-white" : "text-neutral-500"
                    }
                  >
                    {selectedLabel || "Selecione a data..."}
                  </span>
                </span>
                <ChevronDown className="w-4 h-4 text-neutral-500 transition-transform duration-200 group-aria-expanded:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-full max-h-48 overflow-y-auto bg-neutral-900 border-2 border-neutral-700 p-0 rounded-none">
                {AVAILABLE_DATES.map((date) => (
                  <DropdownMenuItem
                    key={date.value}
                    onClick={() => setSelectedDate(date.value)}
                    className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors font-mono text-sm tracking-wide uppercase rounded-none ${
                      selectedDate === date.value
                        ? "bg-ondadura-yellow-200 text-black font-bold focus:bg-ondadura-yellow-200 focus:text-black hover:bg-ondadura-yellow-200 hover:text-black"
                        : "text-neutral-300 hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white"
                    }`}
                  >
                    <CalendarDays className="w-3.5 h-3.5 shrink-0 opacity-50" />
                    {date.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <button
          id="load-reports-btn"
          disabled
          className="inline-flex gap-4  items-center justify-center w-full mt-4 bg-ondadura-yellow-200 border-2 border-ondadura-yellow-200 text-black hover:bg-transparent hover:text-white hover:border-white uppercase text-xs font-bold tracking-widest py-3.5 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-ondadura-yellow-200 disabled:hover:text-black disabled:hover:border-transparent cursor-pointer"
        >
          Tela em construção <Construction size={20}/>
        </button>
      </div>
    </div>
  );
}
