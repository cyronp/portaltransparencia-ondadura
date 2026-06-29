"use client";

import React from "react";
import { Coins, TrendingDown, Wallet, HandHeart } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Receita, Despesa, DoacaoParceiro } from "@/app/utils/types";
import { formatCurrency } from "../utils";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface SlideFinanceOverviewProps {
  receitas: Receita[];
  despesas: Despesa[];
  doacoes: DoacaoParceiro[];
  competenciaLabel: string;
}

const COLORS = ["#f2c12e", "#fef08a", "#ffffff", "#a3a3a3", "#525252"];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-neutral-950 border border-white p-3 font-mono text-[10px] uppercase tracking-wider shadow-lg">
        <p className="text-white font-extrabold mb-1">{data.name}</p>
        <p className="text-ondadura-yellow-400 font-bold">{formatCurrency(data.value)} ({data.percentual}%)</p>
      </div>
    );
  }
  return null;
};

export default function SlideFinanceOverview({
  receitas,
  despesas,
  doacoes,
  competenciaLabel,
}: SlideFinanceOverviewProps) {
  // Calculations
  const totalReceitas = receitas.reduce((sum, r) => sum + (r.valor || 0), 0);
  const totalDespesas = despesas.reduce((sum, d) => sum + (d.valor || 0), 0);
  const saldoLiquido = totalReceitas - totalDespesas;
  const totalDoacoesParceiros = doacoes.reduce((sum, p) => sum + (p.valor || 0), 0);

  // Chart data (expenses breakdown)
  const chartData = despesas.map((d) => ({
    name: d.item,
    value: d.valor,
    percentual: d.percentual,
  })).sort((a, b) => b.value - a.value);

  return (
    <div className="flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center p-0">
      <div className="w-full h-full flex flex-col justify-center px-6 sm:px-16 pt-32 pb-20 max-lg:landscape:pt-28 max-lg:landscape:pb-12 sm:pt-36 lg:pt-44 sm:pb-24 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 max-lg:landscape:gap-3 sm:gap-6 lg:gap-10 justify-center">
          
          {/* Header */}
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-transparent border border-white flex items-center justify-center shrink-0">
              <Coins className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-ondadura-yellow-400" />
            </div>
            <div>
              <Heading as="h2" variant="Secondary" className="text-white uppercase tracking-tight font-extrabold text-sm sm:text-lg md:text-xl lg:text-4xl font-monument">
                Relatório prestação de conta
              </Heading>
              <Text as="p" variant="Terciary" className="text-neutral-500 font-mono uppercase tracking-widest text-[9px] sm:text-xs">
                Período de Referência: {competenciaLabel}
              </Text>
            </div>
          </div>

          {/* Flex Layout: Stats (Left) & Chart (Right) */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-stretch w-full">
            
            {/* Left Column: Stat Cards (w-full on mobile, lg:w-1/2 on desktop) */}
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-3 sm:gap-4">
              
              {/* Receitas */}
              <div className="bg-transparent p-3 sm:p-4 lg:p-6 border border-white/60 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-4 group">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] sm:text-[9px] lg:text-xs uppercase font-extrabold text-ondadura-yellow-400 font-sans tracking-wide">
                    Total Receitas
                  </span>
                  <Coins className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
                </div>
                <div className="mt-2">
                  <span className="text-sm sm:text-lg md:text-xl lg:text-3xl font-extrabold font-mono text-white block leading-none">
                    {formatCurrency(totalReceitas)}
                  </span>
                </div>
              </div>

              {/* Despesas */}
              <div className="bg-transparent p-3 sm:p-4 lg:p-6 border border-white/60 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-4 group">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] sm:text-[9px] lg:text-xs uppercase font-extrabold text-ondadura-yellow-400 font-sans tracking-wide">
                    Total Despesas
                  </span>
                  <TrendingDown className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
                </div>
                <div className="mt-2">
                  <span className="text-sm sm:text-lg md:text-xl lg:text-3xl font-extrabold font-mono text-white block leading-none">
                    {formatCurrency(totalDespesas)}
                  </span>
                </div>
              </div>

              {/* Saldo Líquido */}
              <div className="bg-transparent p-3 sm:p-4 lg:p-6 border border-white/60 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-4 group">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] sm:text-[9px] lg:text-xs uppercase font-extrabold text-ondadura-yellow-400 font-sans tracking-wide">
                    Saldo Líquido
                  </span>
                  <Wallet className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
                </div>
                <div className="mt-2">
                  <span className={`text-sm sm:text-lg md:text-xl lg:text-3xl font-extrabold font-mono block leading-none ${saldoLiquido >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {formatCurrency(saldoLiquido)}
                  </span>
                </div>
              </div>

              {/* Parceiros */}
              <div className="bg-transparent p-3 sm:p-4 lg:p-6 border border-white/60 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-4 group">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[8px] sm:text-[9px] lg:text-xs uppercase font-extrabold text-ondadura-yellow-400 font-sans tracking-wide">
                    Doações de Parceiros
                  </span>
                  <HandHeart className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors shrink-0" />
                </div>
                <div className="mt-2">
                  <span className="text-sm sm:text-lg md:text-xl lg:text-3xl font-extrabold font-mono text-white block leading-none">
                    {formatCurrency(totalDoacoesParceiros)}
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Chart (w-full on mobile, lg:w-1/2 on desktop) */}
            <div className="w-full lg:w-1/2 flex flex-col border border-white/60 bg-neutral-950/40 p-4 lg:p-6 justify-between gap-4">
              <span className="text-[9px] lg:text-xs uppercase font-monument font-extrabold tracking-wider text-white">
                Destinação das Despesas
              </span>
              
              {chartData.length > 0 ? (
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                  <div className="w-full sm:w-1/2 h-36 xs:h-40 sm:h-48 drop-shadow-[0_0_15px_rgba(242,193,46,0.05)]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={60}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Legend */}
                  <div className="w-full sm:w-1/2 flex flex-col gap-1.5 overflow-y-auto max-h-40 sm:max-h-48 pr-1 font-mono text-[9px] sm:text-[10px]">
                    {chartData.map((d, index) => (
                      <div key={d.name} className="flex items-center gap-2 text-neutral-300">
                        <span
                          className="w-2.5 h-2.5 shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="truncate flex-1 font-bold uppercase">{d.name}</span>
                        <span className="text-white font-extrabold">{d.percentual}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-neutral-500 font-mono text-xs uppercase">
                  Nenhuma despesa cadastrada
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
