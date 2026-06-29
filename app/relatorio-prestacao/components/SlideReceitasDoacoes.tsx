"use client";

import React from "react";
import { HandHeart } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Receita, DoacaoParceiro } from "@/app/utils/types";
import { formatCurrency } from "../utils";

interface SlideReceitasDoacoesProps {
  receitas: Receita[];
  doacoes: DoacaoParceiro[];
  competenciaLabel: string;
}

export default function SlideReceitasDoacoes({
  receitas,
  doacoes,
  competenciaLabel,
}: SlideReceitasDoacoesProps) {
  return (
    <div className="flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center p-0">
      <div className="w-full h-full flex flex-col justify-center px-6 sm:px-16 pt-32 pb-20 max-lg:landscape:pt-28 max-lg:landscape:pb-20 sm:pt-36 lg:pt-44 sm:pb-24 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 max-lg:landscape:gap-3 sm:gap-6 lg:gap-8 justify-center">
          
          {/* Header */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-transparent border border-white flex items-center justify-center shrink-0">
              <HandHeart className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-ondadura-yellow-400" />
            </div>
            <div>
              <Heading as="h2" variant="Secondary" className="text-white uppercase tracking-tight font-extrabold text-sm sm:text-lg md:text-xl lg:text-4xl font-monument">
                Receitas & Doações
              </Heading>
              <Text as="p" variant="Terciary" className="text-neutral-500 font-mono uppercase tracking-widest text-[9px] sm:text-xs">
                Período: {competenciaLabel}
              </Text>
            </div>
          </div>

          {/* Tables Grid Layout */}
          <div className="grid grid-cols-1 max-lg:landscape:grid-cols-12 xl:grid-cols-12 gap-4 lg:gap-8 items-stretch">
            
            {/* Panel 1: Receitas Diretas (5/12 on large screens) */}
            <div className="xl:col-span-5 max-lg:landscape:col-span-5 flex flex-col gap-2 border border-white/60 bg-neutral-950/40 p-4">
              <span className="text-[9px] sm:text-[10px] lg:text-xs uppercase font-monument font-extrabold tracking-wider text-white mb-2 block">
                Receitas Institucionais
              </span>
              
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[300px]">
                  <thead>
                    <tr className="bg-white border-b border-white">
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black bg-white">Origem / Conta</th>
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black text-right bg-white">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-[10px] sm:text-xs text-neutral-300">
                    {receitas.map((r) => (
                      <tr key={r.id} className="hover:bg-neutral-900/20">
                        <td className="p-2">
                          <span className="font-bold text-white uppercase tracking-wider block">{r.origem}</span>
                          <span className="text-[9px] text-neutral-500 uppercase font-mono">{r.projeto_conta}</span>
                        </td>
                        <td className="p-2 text-right font-mono font-bold text-white whitespace-nowrap">
                          {formatCurrency(r.valor)}
                        </td>
                      </tr>
                    ))}
                    {receitas.length === 0 && (
                      <tr>
                        <td colSpan={2} className="p-4 text-center text-neutral-500 font-mono text-[9px] uppercase">
                          Nenhum registro
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Panel 2: Doações de Parceiros (7/12 on large screens) */}
            <div className="xl:col-span-7 max-lg:landscape:col-span-7 flex flex-col gap-2 border border-white/60 bg-neutral-950/40 p-4">
              <span className="text-[9px] sm:text-[10px] lg:text-xs uppercase font-monument font-extrabold tracking-wider text-white mb-2 block">
                Doações e Parcerias de Empresas
              </span>
              
              <div className="w-full h-44 sm:h-56 xl:h-[35vh] overflow-y-auto pr-1">
                <table className="w-full text-left border-collapse min-w-[500px]">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-white border-b border-white">
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black bg-white">Parceiro</th>
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black bg-white">Tipo</th>
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black bg-white">Destino</th>
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black text-right bg-white">Valor / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-[10px] sm:text-xs text-neutral-300">
                    {doacoes.map((d) => (
                      <tr key={d.id} className="hover:bg-neutral-900/20">
                        <td className="p-2 font-bold text-white uppercase tracking-wider">{d.parceiro}</td>
                        <td className="p-2 font-mono text-neutral-400 uppercase text-[9px]">{d.tipo_doacao}</td>
                        <td className="p-2 uppercase font-mono text-[9px] text-neutral-400">{d.destino}</td>
                        <td className="p-2 text-right whitespace-nowrap">
                          {d.valor !== null ? (
                            <span className="font-mono font-bold text-white">{formatCurrency(d.valor)}</span>
                          ) : (
                            <span className="text-[9px] uppercase tracking-wider font-extrabold bg-neutral-800 text-ondadura-yellow-400 px-2 py-0.5 border border-ondadura-yellow-400/20">
                              {d.status || d.observacao || "Apoio"}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {doacoes.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-4 text-center text-neutral-500 font-mono text-[9px] uppercase">
                          Nenhum registro
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
