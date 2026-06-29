"use client";

import React from "react";
import { MapPin } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";

interface SlideRegionalTableProps {
  sortedBairrosData: [string, number][];
  totalFamilies: number;
}

export default function SlideRegionalTable({ sortedBairrosData, totalFamilies }: SlideRegionalTableProps) {
  return (
    <div className="flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center p-0">
      <div className="w-full h-full flex flex-col justify-start px-6 sm:px-16 pt-32 pb-20 max-lg:landscape:pt-28 max-lg:landscape:pb-20 sm:pt-36 lg:pt-44 sm:pb-24 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 max-lg:landscape:gap-4 sm:gap-6 lg:gap-12 justify-start">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-transparent border border-white flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-ondadura-yellow-400" />
            </div>
            <div>
              <Heading as="h2" variant="Secondary" className="text-white uppercase tracking-tight font-extrabold text-sm sm:text-lg md:text-xl lg:text-4xl font-monument">
                Distribuição Regional
              </Heading>
            </div>
          </div>
          <div className="border border-white/80 bg-neutral-950/40 flex flex-col overflow-hidden">
            <div className="w-full h-40 xs:h-48 sm:h-64 md:h-80 lg:h-[50vh] overflow-y-auto pr-1 drop-shadow-[0_0_15px_rgba(242,193,46,0.05)]">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white border-b border-white sticky top-0 z-10">
                    <th className="p-2 sm:p-3 lg:p-5 text-[8px] sm:text-[10px] lg:text-sm uppercase font-monument font-extrabold tracking-widest text-black bg-white">Bairro</th>
                    <th className="p-2 sm:p-3 lg:p-5 text-[8px] sm:text-[10px] lg:text-sm uppercase font-monument font-extrabold tracking-widest text-black text-center bg-white">Famílias</th>
                    <th className="p-2 sm:p-3 lg:p-5 text-[8px] sm:text-[10px] lg:text-sm uppercase font-monument font-extrabold tracking-widest text-black text-center bg-white">%</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-[10px] sm:text-xs lg:text-lg text-neutral-300">
                  {sortedBairrosData.map(([bairroName, count]) => (
                    <tr key={bairroName} className="hover:bg-neutral-900/20">
                      <td className="p-2 sm:p-3 lg:p-5 font-bold text-white uppercase tracking-wider">{bairroName}</td>
                      <td className="p-2 sm:p-3 lg:p-5 text-center font-mono font-bold text-white">{count}</td>
                      <td className="p-2 sm:p-3 lg:p-5 text-center font-mono text-neutral-400">{((count / totalFamilies) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
