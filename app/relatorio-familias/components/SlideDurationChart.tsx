"use client";

import React from "react";
import { Users } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { DurationRange } from "../utils";

// Custom Tooltip component for Recharts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-950 border border-white p-3 font-mono text-[10px] uppercase tracking-wider shadow-lg">
        <p className="text-white font-extrabold mb-1">{`Tempo: ${payload[0].payload.range}`}</p>
        <p className="text-ondadura-yellow-400 font-bold">{`Famílias: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

interface SlideDurationChartProps {
  durationRanges: DurationRange[];
}

export default function SlideDurationChart({ durationRanges }: SlideDurationChartProps) {
  return (
    <div className="flex-[0_0_100%] min-w-0 w-full h-full flex items-center justify-center p-0">
      <div className="w-full h-full flex flex-col justify-center px-6 sm:px-16 pt-32 pb-20 max-lg:landscape:pt-28 max-lg:landscape:pb-20 sm:pt-36 lg:pt-44 sm:pb-24 overflow-y-auto">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4 max-lg:landscape:gap-4 sm:gap-6 lg:gap-12 justify-center">
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-20 lg:h-20 bg-transparent border border-white flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-ondadura-yellow-400" />
            </div>
            <div>
              <Heading as="h2" variant="Secondary" className="text-white uppercase tracking-tight font-extrabold text-sm sm:text-lg md:text-xl lg:text-4xl font-monument">
                Pessoas/Famílias por Tempo no Programa
              </Heading>
            </div>
          </div>
          <div className="border border-white/80 bg-neutral-950/40 p-2 sm:p-4 lg:p-8 flex flex-col gap-2 sm:gap-4 overflow-hidden">
            {durationRanges.some((r) => r.count > 0) ? (
              <div className="w-full h-40 xs:h-48 sm:h-64 md:h-80 lg:h-[50vh] drop-shadow-[0_0_15px_rgba(242,193,46,0.05)]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={durationRanges}
                    margin={{ top: 25, right: 10, left: -25, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                    <XAxis
                      dataKey="range"
                      stroke="#404040"
                      tick={{ fill: "#737373", fontSize: 10, fontFamily: "monospace", fontWeight: "bold" }}
                      axisLine={{ stroke: "#404040", strokeWidth: 1 }}
                    />
                    <YAxis
                      stroke="#404040"
                      tick={{ fill: "#737373", fontSize: 10, fontFamily: "monospace", fontWeight: "bold" }}
                      axisLine={{ stroke: "#404040", strokeWidth: 1 }}
                      allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: "#262626", opacity: 0.15 }} />
                    <Bar
                      dataKey="count"
                      fill="#f2c12e"
                      radius={[2, 2, 0, 0]}
                      maxBarSize={60}
                    >
                      <LabelList dataKey="count" position="top" fill="#f2c12e" fontSize={12} fontFamily="monospace" fontWeight="extrabold" offset={8} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center text-neutral-500 uppercase font-mono text-[10px] lg:text-sm p-8">Nenhum registro encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
