"use client";

import React, { useState } from "react";
import { Users, Coins } from "lucide-react";
import OptionCard from "@/app/components/OptionCard/OptionCard";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Separator } from "@/app/components/ui/Separator/Separator";
import OndaDuraIcon from "@/app/components/Icon/OndaDuraIcon/OndeDuraIcon";
import ReportModal from "@/app/components/ReportModal/ReportModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="w-full h-dvh relative bg-neutral-950 font-sans overflow-y-auto flex flex-col">
      <div className="relative w-full z-10 bg-[url('/purple-bg.png')] bg-center p-4 lg:p-12 flex flex-col items-center gap-3 sm:gap-4 text-center">
        <OndaDuraIcon className="text-white size-18 lg:size-32" />

        <Heading
          as="h1"
          variant="Primary"
          className="text-white text-center font-extrabold uppercase tracking-tight text-3xl sm:text-4xl lg:text-5xl title-on-short"
        >
          Portal da Transparência
        </Heading>
        <Separator className="w-48 h-2 bg-ondadura-yellow-200" />
      </div>
      <div className="hidden lg:flex w-full items-center justify-center bg-[#dddddd] p-8">
        <Text
          as="p"
          variant="Primary"
          className="text-3xl tracking-tight font-bold text-black uppercase font-monument"
        >
          Conheça nossos relatórios e acompanhe de perto nossa missão.
        </Text>
      </div>
      <div className="w-full max-w-3xl mx-auto px-4 py-8 h-full flex items-center justify-center z-10">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 w-full">
          <OptionCard
            variant="Secondary"
            icon={Users}
            title="Famílias Atendidas"
            description="Acompanhe nosso relatório de assistência social e do impacto do instituto, incluindo o número de pessoas atendidas, regiões onde atuamos por meio do Mercado Solidário e dos nossos projetos de apoio às famílias."
            actionLabel="Visualizar Relatório"
            href="/relatorio-familias"
          />

          <OptionCard
            variant="Secondary"
            icon={Coins}
            title="Prestação de Contas"
            description="Consulte as demonstrações de receitas, despesas, e a prestação de contas institucional transparente por período."
            actionLabel="Visualizar Relatório"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
