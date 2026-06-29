"use client";

import React from "react";
import { Users, MapPin, Timer } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";

interface SlideOverviewProps {
  totalFamilies: number;
  totalActiveBairros: number;
  avgSupportMonths: string;
}

export default function SlideOverview({ totalFamilies, totalActiveBairros, avgSupportMonths }: SlideOverviewProps) {
  return (
    <div className="flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center p-0">
      <div className="w-full h-full flex flex-col justify-start px-6 sm:px-16 pt-32 pb-20 max-lg:landscape:pt-28 max-lg:landscape:pb-12 sm:pt-36 lg:pt-44 sm:pb-24 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 max-lg:landscape:gap-3 sm:gap-6 lg:gap-12 justify-start">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-transparent border border-white flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-ondadura-yellow-400" />
            </div>
            <div>
              <Heading as="h2" variant="Secondary" className="text-white uppercase tracking-tight font-extrabold text-sm sm:text-lg md:text-xl lg:text-4xl font-monument">
                Famílias/Pessoas Atendidas
              </Heading>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 max-lg:landscape:grid-cols-3 sm:grid-cols-3 gap-3 max-lg:landscape:gap-2 sm:gap-4 md:gap-6 lg:gap-10">
            <div className="bg-transparent p-3 sm:p-4 lg:p-10 border border-white/80 hover:border-ondadura-yellow-400 transition-colors flex flex-row max-lg:landscape:flex-col sm:flex-col justify-between items-center max-lg:landscape:items-stretch sm:items-stretch gap-2 sm:gap-4 lg:gap-8 group">
              <div className="flex items-center justify-between sm:w-full">
                <span className="text-[8px] sm:text-[9px] lg:text-sm uppercase font-extrabold text-ondadura-yellow-400 font-sans">Total de Pessoas/Famílias que estamos ajudando</span>
              </div>
              <div className="flex flex-col items-end sm:items-start mt-0 sm:mt-2">
                <span className="text-lg sm:text-2xl md:text-3xl lg:text-7xl font-extrabold font-mono text-white block leading-none">{totalFamilies}</span>
              </div>
            </div>

            <div className="bg-transparent p-3 sm:p-4 lg:p-10 border border-white/80 hover:border-ondadura-yellow-400 transition-colors flex flex-row max-lg:landscape:flex-col sm:flex-col justify-between items-center max-lg:landscape:items-stretch sm:items-stretch gap-2 sm:gap-4 lg:gap-8 group">
              <div className="flex items-center justify-between sm:w-full">
                <span className="text-[8px] sm:text-[9px] lg:text-sm uppercase font-extrabold text-ondadura-yellow-400 font-sans">Bairros atendidos</span>
              </div>
              <div className="flex flex-col items-end sm:items-start mt-0 sm:mt-2">
                <span className="text-lg sm:text-2xl md:text-3xl lg:text-7xl font-extrabold font-mono text-white block leading-none">{totalActiveBairros}</span>
              </div>
            </div>

            <div className="bg-transparent p-3 sm:p-4 lg:p-10 border border-white/80 hover:border-ondadura-yellow-400 transition-colors flex flex-row max-lg:landscape:flex-col sm:flex-col justify-between items-center max-lg:landscape:items-stretch sm:items-stretch gap-2 sm:gap-4 lg:gap-8 group">
              <div className="flex items-center justify-between sm:w-full">
                <span className="text-[8px] sm:text-[9px] lg:text-sm uppercase font-extrabold text-ondadura-yellow-400 font-sans">Média de tempo que apoiamos </span>
              </div>
              <div className="flex flex-col items-end sm:items-start mt-0 sm:mt-2">
                <span className="text-lg sm:text-2xl md:text-3xl lg:text-7xl font-extrabold font-mono text-white block leading-none">{avgSupportMonths !== "N/A" ? `${avgSupportMonths} Meses` : "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
