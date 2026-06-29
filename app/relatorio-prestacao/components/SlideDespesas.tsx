"use client";

import React from "react";
import { TrendingDown, RefreshCw, AlertTriangle } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Despesa } from "@/app/utils/types";
import { formatCurrency } from "../utils";

interface SlideDespesasProps {
  despesas: Despesa[];
  competenciaLabel: string;
}

export default function SlideDespesas({ despesas, competenciaLabel }: SlideDespesasProps) {
  const totalDespesas = despesas.reduce((sum, d) => sum + (d.valor || 0), 0);
  
  // Calculate fixed vs variable expenses
  const despesasFixas = despesas.filter((d) => d.tipo?.toLowerCase() === "fixa");
  const despesasVariaveis = despesas.filter((d) => d.tipo?.toLowerCase() !== "fixa");

  const totalFixas = despesasFixas.reduce((sum, d) => sum + (d.valor || 0), 0);
  const totalVariaveis = despesasVariaveis.reduce((sum, d) => sum + (d.valor || 0), 0);

  const percentFixas = totalDespesas > 0 ? ((totalFixas / totalDespesas) * 100).toFixed(1) : "0";
  const percentVariaveis = totalDespesas > 0 ? ((totalVariaveis / totalDespesas) * 100).toFixed(1) : "0";

  return (
    <div className="flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center p-0">
      <div className="w-full h-full flex flex-col justify-center px-6 sm:px-16 pt-32 pb-20 max-lg:landscape:pt-28 max-lg:landscape:pb-20 sm:pt-36 lg:pt-44 sm:pb-24 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 max-lg:landscape:gap-3 sm:gap-6 lg:gap-8 justify-center">
          
          {/* Header */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-transparent border border-white flex items-center justify-center shrink-0">
              <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-ondadura-yellow-400" />
            </div>
            <div>
              <Heading as="h2" variant="Secondary" className="text-white uppercase tracking-tight font-extrabold text-sm sm:text-lg md:text-xl lg:text-4xl font-monument">
                Detalhamento de Despesas
              </Heading>
              <Text as="p" variant="Terciary" className="text-neutral-500 font-mono uppercase tracking-widest text-[9px] sm:text-xs">
                Período: {competenciaLabel}
              </Text>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 max-lg:landscape:grid-cols-12 xl:grid-cols-12 gap-4 lg:gap-8 items-stretch">
            
            {/* Left Panel: Table of Expenses (8/12) */}
            <div className="xl:col-span-8 max-lg:landscape:col-span-8 flex flex-col gap-2 border border-white/60 bg-neutral-950/40 p-4">
              <span className="text-[9px] sm:text-[10px] lg:text-xs uppercase font-monument font-extrabold tracking-wider text-white mb-2 block">
                Tabela Demonstrativa de Custos
              </span>
              
              <div className="w-full h-44 sm:h-56 xl:h-[35vh] overflow-y-auto pr-1">
                <table className="w-full text-left border-collapse min-w-[450px]">
                  <thead className="sticky top-0 z-10">
                    <tr className="bg-white border-b border-white">
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black bg-white">Item de Despesa</th>
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black bg-white">Tipo</th>
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black text-right bg-white">Valor</th>
                      <th className="p-2 text-[8px] sm:text-[10px] uppercase font-monument font-extrabold tracking-widest text-black text-center bg-white">%</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-[10px] sm:text-xs text-neutral-300">
                    {despesas.map((d) => (
                      <tr key={d.id} className="hover:bg-neutral-900/20">
                        <td className="p-2">
                          <span className="font-bold text-white uppercase tracking-wider block">{d.item}</span>
                          {d.observacao && (
                            <span className="text-[9px] text-neutral-500 font-mono italic block">{d.observacao}</span>
                          )}
                        </td>
                        <td className="p-2">
                          <span className={`text-[8px] uppercase tracking-wider font-extrabold px-2 py-0.5 border ${
                            d.tipo?.toLowerCase() === "fixa" 
                              ? "bg-neutral-900 border-neutral-600 text-neutral-300"
                              : "bg-neutral-900 border-ondadura-yellow-400/20 text-ondadura-yellow-200"
                          }`}>
                            {d.tipo}
                          </span>
                        </td>
                        <td className="p-2 text-right font-mono font-bold text-white whitespace-nowrap">
                          {formatCurrency(d.valor)}
                        </td>
                        <td className="p-2 text-center font-mono text-neutral-400">{d.percentual}%</td>
                      </tr>
                    ))}
                    {despesas.length === 0 && (
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

            {/* Right Panel: Cost Structure (4/12) */}
            <div className="xl:col-span-4 max-lg:landscape:col-span-4 flex flex-col gap-4 border border-white/60 bg-neutral-950/40 p-4 justify-between">
              <div>
                <span className="text-[9px] sm:text-[10px] lg:text-xs uppercase font-monument font-extrabold tracking-wider text-white mb-4 block">
                  Estrutura de Custos
                </span>
                
                <div className="flex flex-col gap-4">
                  {/* Despesas Fixas Bar */}
                  <div className="flex flex-col gap-1.5 font-mono text-[10px]">
                    <div className="flex justify-between uppercase font-extrabold text-neutral-400">
                      <span className="flex items-center gap-1"><RefreshCw className="w-3 h-3 text-neutral-400" /> Custos Fixos</span>
                      <span className="text-white">{percentFixas}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 border border-neutral-700 h-3 flex overflow-hidden">
                      <div 
                        className="bg-neutral-400 h-full transition-all duration-300" 
                        style={{ width: `${percentFixas}%` }}
                      />
                    </div>
                    <div className="text-right text-white font-extrabold">
                      {formatCurrency(totalFixas)}
                    </div>
                  </div>

                  {/* Despesas Variáveis Bar */}
                  <div className="flex flex-col gap-1.5 font-mono text-[10px] mt-2">
                    <div className="flex justify-between uppercase font-extrabold text-ondadura-yellow-200">
                      <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-ondadura-yellow-200" /> Custos Variáveis</span>
                      <span className="text-white">{percentVariaveis}%</span>
                    </div>
                    <div className="w-full bg-neutral-900 border border-neutral-700 h-3 flex overflow-hidden">
                      <div 
                        className="bg-ondadura-yellow-400 h-full transition-all duration-300" 
                        style={{ width: `${percentVariaveis}%` }}
                      />
                    </div>
                    <div className="text-right text-white font-extrabold">
                      {formatCurrency(totalVariaveis)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Informative footer */}
              <div className="border-t border-white/10 pt-3 text-[8px] sm:text-[9px] uppercase tracking-wider font-mono text-neutral-500 leading-normal">
                Custos fixos compreendem despesas recorrentes de administração e RH. Custos variáveis estão atrelados a investimentos sazonais e construções.
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
