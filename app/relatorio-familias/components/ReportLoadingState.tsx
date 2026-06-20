"use client";

import React from "react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import OndaDuraIcon from "@/app/components/Icon/OndaDuraIcon/OndeDuraIcon";

export default function ReportLoadingState() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 text-center p-6 relative z-10">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        <OndaDuraIcon className="absolute w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
      </div>
      <div>
        <Heading as="h3" variant="Terciary" className="text-white uppercase tracking-widest font-extrabold font-mono text-sm sm:text-base">
          Carregando nosso relatório
        </Heading>
        <Text variant="Terciary" className="text-neutral-500 font-mono mt-1 uppercase tracking-wider text-[10px] sm:text-xs">
          Por favor espere até que todos os relatórios sejam executados.
        </Text>
      </div>
    </div>
  );
}
