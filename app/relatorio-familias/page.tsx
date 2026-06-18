"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Users,
  Heart,
  MapPin,
  TrendingUp,
  Award,
  Calendar,
  AlertCircle,
  BarChart3,
} from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";
import { Separator } from "@/app/components/ui/Separator/Separator";

const SLIDES = [
  { id: "overview", label: "Visão Geral" },
  { id: "charts", label: "Gráficos Recharts" },
  { id: "regions", label: "Distribuição Regional" },
];

export default function RelatorioFamilias() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    const timer = setTimeout(() => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    }, 0);

    return () => {
      clearTimeout(timer);
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  return (
    <main className="w-full h-dvh relative overflow-hidden bg-black flex flex-col">
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <Link
        href="/"
        className="fixed top-4 left-4 z-50 flex items-center gap-2 px-4 py-2 bg-black border-2 border-white hover:border-ondadura-yellow-400 text-white hover:bg-white hover:text-black transition-all duration-200 uppercase tracking-widest text-xs font-bold active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 shrink-0" />
        <span>Voltar</span>
      </Link>

      <div className="relative w-full h-full z-10">
        <div
          className="overflow-hidden w-full h-full"
          ref={emblaRef}
        >
          <div className="flex h-full">
            <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-0 md:p-4 lg:py-0 h-full">
              <div className="relative w-full h-full md:h-auto md:max-w-4xl bg-black md:bg-neutral-950 border-0 md:border-2 border-neutral-800 pt-24 pb-28 px-6 sm:p-10 flex flex-col gap-6 max-h-full md:max-h-[85dvh] overflow-y-auto justify-center slide-container-short">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center">
                      <Users className="w-6 h-6 text-ondadura-yellow-400" />
                    </div>
                    <div>
                      <Heading
                        as="h2"
                        variant="Secondary"
                        className="text-white uppercase tracking-widest font-extrabold text-lg sm:text-xl"
                      >
                        Famílias Atendidas
                      </Heading>
                      <Text
                        variant="Terciary"
                        className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-mono mt-0.5"
                      >
                        Ações Sociais e Assistência Comunitária
                      </Text>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border-2 border-neutral-800 bg-neutral-950 px-3 py-1.5 self-start">
                    <Calendar className="w-3.5 h-3.5 text-ondadura-yellow-400" />
                    <Text
                      as="span"
                      variant="Terciary"
                      className="text-xs font-mono font-bold text-neutral-300"
                    >
                      Junho 2026
                    </Text>
                  </div>
                </div>

                <div className="w-16 h-1 bg-ondadura-yellow-400" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-neutral-900/30 p-4 md:p-6 border-2 border-neutral-800 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-3 md:gap-4 group">
                    <div className="flex items-center justify-between">
                      <Text
                        as="span"
                        variant="Terciary"
                        className="text-[9px] uppercase tracking-widest font-extrabold text-neutral-500 font-mono"
                      >
                        Total Famílias
                      </Text>
                      <Users className="w-4 h-4 text-ondadura-yellow-400" />
                    </div>
                    <div>
                      <Heading
                        as="div"
                        variant="Secondary"
                        className="text-2xl sm:text-3xl font-extrabold font-mono text-white"
                      >
                        1.248
                      </Heading>
                      <Text
                        as="div"
                        variant="Terciary"
                        className="text-green-400 flex items-center gap-1 mt-1 font-mono uppercase font-bold"
                      >
                        <TrendingUp className="w-3 h-3" /> +12% vs 2025
                      </Text>
                    </div>
                  </div>

                  <div className="bg-neutral-900/30 p-4 md:p-6 border-2 border-neutral-800 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-3 md:gap-4 group">
                    <div className="flex items-center justify-between">
                      <Text
                        as="span"
                        variant="Terciary"
                        className="text-[9px] uppercase tracking-widest font-extrabold text-neutral-500 font-mono"
                      >
                        Cestas Básicas
                      </Text>
                      <Heart className="w-4 h-4 text-ondadura-yellow-400" />
                    </div>
                    <div>
                      <Heading
                        as="div"
                        variant="Secondary"
                        className="text-2xl sm:text-3xl font-extrabold font-mono text-white"
                      >
                        5.840
                      </Heading>
                      <Text
                        as="div"
                        variant="Terciary"
                        className="text-neutral-400 mt-1 font-mono uppercase font-bold"
                      >
                        Média: 486/mês
                      </Text>
                    </div>
                  </div>

                  <div className="bg-neutral-900/30 p-4 md:p-6 border-2 border-neutral-800 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-3 md:gap-4 group">
                    <div className="flex items-center justify-between">
                      <Text
                        as="span"
                        variant="Terciary"
                        className="text-[9px] uppercase tracking-widest font-extrabold text-neutral-500 font-mono"
                      >
                        Bairros Foco
                      </Text>
                      <MapPin className="w-4 h-4 text-ondadura-yellow-400" />
                    </div>
                    <div>
                      <Heading
                        as="div"
                        variant="Secondary"
                        className="text-2xl sm:text-3xl font-extrabold font-mono text-white"
                      >
                        18
                      </Heading>
                      <Text
                        as="div"
                        variant="Terciary"
                        className="text-neutral-400 mt-1 font-mono uppercase font-bold"
                      >
                        Mapeamento Social
                      </Text>
                    </div>
                  </div>

                  <div className="bg-neutral-900/30 p-4 md:p-6 border-2 border-neutral-800 hover:border-ondadura-yellow-400 transition-colors flex flex-col justify-between gap-3 md:gap-4 group">
                    <div className="flex items-center justify-between">
                      <Text
                        as="span"
                        variant="Terciary"
                        className="text-[9px] uppercase tracking-widest font-extrabold text-neutral-500 font-mono"
                      >
                        Voluntários
                      </Text>
                      <Award className="w-4 h-4 text-ondadura-yellow-400" />
                    </div>
                    <div>
                      <Heading
                        as="div"
                        variant="Secondary"
                        className="text-2xl sm:text-3xl font-extrabold font-mono text-white"
                      >
                        142
                      </Heading>
                      <Text
                        as="div"
                        variant="Terciary"
                        className="text-ondadura-yellow-400 mt-1 font-mono uppercase font-bold"
                      >
                        Horas: +800h
                      </Text>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-neutral-800 p-6 bg-neutral-900/10 hide-on-short">
                  <Text
                    variant="Secondary"
                    className="text-neutral-400 leading-relaxed"
                  >
                    Nossa missão social se concentra no cadastramento e suporte contínuo de famílias em situação de extrema vulnerabilidade econômica e social. Através de mutirões semanais e mapeamento georreferenciado, garantimos que a assistência chegue a quem realmente precisa de forma transparente e estruturada.
                  </Text>
                </div>
              </div>
            </div>

            <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-0 md:p-4 lg:py-0 h-full">
              <div className="relative w-full h-full md:h-auto md:max-w-4xl bg-black md:bg-neutral-950 border-0 md:border-2 border-neutral-800 pt-24 pb-28 px-6 sm:p-10 flex flex-col gap-6 max-h-full md:max-h-[85dvh] overflow-y-auto justify-center slide-container-short">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-ondadura-yellow-400" />
                  </div>
                  <div>
                    <Heading
                      as="h2"
                      variant="Secondary"
                      className="text-white uppercase tracking-widest font-extrabold text-lg sm:text-xl"
                    >
                      Evolução de Suporte
                    </Heading>
                    <Text
                      variant="Terciary"
                      className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-mono mt-0.5"
                    >
                      Visualização de Impacto Mensal
                    </Text>
                  </div>
                </div>

                <div className="w-16 h-1 bg-ondadura-yellow-400" />

                <div className="relative bg-black border-2 border-neutral-800 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[160px] md:min-h-[300px] overflow-hidden group">
                  <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-5 pointer-events-none">
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                    <div className="w-full h-px bg-white" />
                  </div>
                  <div className="absolute inset-y-0 left-6 right-6 flex justify-between opacity-5 pointer-events-none">
                    <div className="h-full w-px bg-white" />
                    <div className="h-full w-px bg-white" />
                    </div>

                  <svg className="w-full max-w-2xl h-48 drop-shadow-[0_0_15px_rgba(242,193,46,0.15)] z-10 opacity-30 group-hover:opacity-55 transition-opacity duration-300" viewBox="0 0 500 150">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f2c12e" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#f2c12e" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M 0 150 L 50 120 L 100 130 L 150 90 L 200 100 L 250 60 L 300 75 L 350 40 L 400 50 L 450 15 L 500 30 L 500 150 Z"
                      fill="url(#chartGradient)"
                    />
                    <path
                      d="M 0 150 L 50 120 L 100 130 L 150 90 L 200 100 L 250 60 L 300 75 L 350 40 L 400 50 L 450 15 L 500 30"
                      fill="none"
                      stroke="#f2c12e"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="120" r="4.5" fill="#fff" stroke="#f2c12e" strokeWidth="2.5" />
                    <circle cx="150" cy="90" r="4.5" fill="#fff" stroke="#f2c12e" strokeWidth="2.5" />
                    <circle cx="250" cy="60" r="4.5" fill="#fff" stroke="#f2c12e" strokeWidth="2.5" />
                    <circle cx="350" cy="40" r="4.5" fill="#fff" stroke="#f2c12e" strokeWidth="2.5" />
                    <circle cx="450" cy="15" r="4.5" fill="#fff" stroke="#f2c12e" strokeWidth="2.5" />
                  </svg>

                  <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center z-20">
                    <div className="border-2 border-neutral-800 bg-neutral-950 p-3 rounded-full mb-3 text-ondadura-yellow-400 animate-pulse">
                      <AlertCircle className="w-6 h-6" />
                    </div>
                    <Heading
                      as="span"
                      variant="Terciary"
                      className="text-white font-extrabold uppercase tracking-widest text-xs mb-2 font-sans"
                    >
                      Painel Recharts Interativo
                    </Heading>
                    <Text
                      variant="Terciary"
                      className="text-neutral-400 max-w-xs text-center leading-relaxed uppercase tracking-wider font-mono"
                    >
                      [ Em breve: Gráficos dinâmicos de atendimento ]
                    </Text>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[10px] font-mono uppercase tracking-widest font-bold">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <div className="w-2.5 h-2.5 bg-ondadura-yellow-400" />
                    <Text
                      as="span"
                      variant="Terciary"
                      className="text-neutral-400 uppercase tracking-widest font-bold"
                    >
                      Evolução do suporte por trimestre
                    </Text>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400 sm:justify-end">
                    <div className="w-2.5 h-2.5 bg-neutral-700" />
                    <Text
                      as="span"
                      variant="Terciary"
                      className="text-neutral-400 uppercase tracking-widest font-bold"
                    >
                      Histórico acumulado de cestas
                    </Text>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center p-0 md:p-4 lg:py-0 h-full">
              <div className="relative w-full h-full md:h-auto md:max-w-4xl bg-black md:bg-neutral-950 border-0 md:border-2 border-neutral-800 pt-24 pb-28 px-6 sm:p-10 flex flex-col gap-6 max-h-full md:max-h-[85dvh] overflow-y-auto justify-center slide-container-short">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neutral-900 border-2 border-neutral-800 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-ondadura-yellow-400" />
                  </div>
                  <div>
                    <Heading
                      as="h2"
                      variant="Secondary"
                      className="text-white uppercase tracking-widest font-extrabold text-lg sm:text-xl"
                    >
                      Regiões Atendidas
                    </Heading>
                    <Text
                      variant="Terciary"
                      className="text-[10px] uppercase tracking-wider font-bold text-neutral-500 font-mono mt-0.5"
                    >
                      Detalhamento de Distribuição por Bairro
                    </Text>
                  </div>
                </div>

                <div className="w-16 h-1 bg-ondadura-yellow-400" />

                <div className="border-2 border-neutral-800 overflow-x-auto bg-neutral-950">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr className="bg-neutral-900 border-b-2 border-neutral-800">
                        <th className="p-4 text-[10px] uppercase font-mono font-extrabold tracking-widest text-neutral-400">Bairro / Região</th>
                        <th className="p-4 text-[10px] uppercase font-mono font-extrabold tracking-widest text-neutral-400 text-center">Famílias Atendidas</th>
                        <th className="p-4 text-[10px] uppercase font-mono font-extrabold tracking-widest text-neutral-400 text-center">Frequência</th>
                        <th className="p-4 text-[10px] uppercase font-mono font-extrabold tracking-widest text-neutral-400 text-right">Prioridade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y-2 divide-neutral-850 text-xs text-neutral-300">
                      <tr className="hover:bg-neutral-900/20">
                        <td className="p-4 font-bold text-white uppercase tracking-wider">Jardim Paraíso</td>
                        <td className="p-4 text-center font-mono font-bold">342</td>
                        <td className="p-4 text-center uppercase text-[10px]">Semanal</td>
                        <td className="p-4 text-right">
                          <span className="inline-block px-3 py-1 border border-neutral-700 text-neutral-400 text-[9px] uppercase font-bold tracking-widest">Normal</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-neutral-900/20">
                        <td className="p-4 font-bold text-white uppercase tracking-wider">Morro da Glória</td>
                        <td className="p-4 text-center font-mono font-bold">289</td>
                        <td className="p-4 text-center uppercase text-[10px]">Semanal</td>
                        <td className="p-4 text-right">
                          <span className="inline-block px-3 py-1 border border-red-500 text-red-500 text-[9px] uppercase font-bold tracking-widest bg-red-950/10">Crítica</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-neutral-900/20">
                        <td className="p-4 font-bold text-white uppercase tracking-wider">Vila Nova</td>
                        <td className="p-4 text-center font-mono font-bold">215</td>
                        <td className="p-4 text-center uppercase text-[10px]">Quinzenal</td>
                        <td className="p-4 text-right">
                          <span className="inline-block px-3 py-1 border border-neutral-700 text-neutral-400 text-[9px] uppercase font-bold tracking-widest">Normal</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-neutral-900/20">
                        <td className="p-4 font-bold text-white uppercase tracking-wider">Boehmerwald</td>
                        <td className="p-4 text-center font-mono font-bold">198</td>
                        <td className="p-4 text-center uppercase text-[10px]">Mensal</td>
                        <td className="p-4 text-right">
                          <span className="inline-block px-3 py-1 border border-neutral-700 text-neutral-400 text-[9px] uppercase font-bold tracking-widest">Normal</span>
                        </td>
                      </tr>
                      <tr className="hover:bg-neutral-900/20">
                        <td className="p-4 font-bold text-white uppercase tracking-wider">Aventureiro</td>
                        <td className="p-4 text-center font-mono font-bold">124</td>
                        <td className="p-4 text-center uppercase text-[10px]">Mensal</td>
                        <td className="p-4 text-right">
                          <span className="inline-block px-3 py-1 border border-ondadura-yellow-400 text-ondadura-yellow-400 text-[9px] uppercase font-bold tracking-widest bg-ondadura-yellow-400/5">Alerta</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex gap-3 items-center text-[10px] uppercase font-mono tracking-wider text-neutral-500 border-2 border-neutral-850 p-4 bg-neutral-950 hide-on-short">
                  <MapPin className="w-4 h-4 text-ondadura-yellow-400 shrink-0" />
                  <Text
                    variant="Terciary"
                    className="text-neutral-500 uppercase tracking-wider font-bold"
                  >
                    Mapeamento focado em regiões urbanas com maiores vulnerabilidades para garantir impacto imediato.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-12 md:left-24 z-20 flex items-center gap-2 bg-black px-3 py-2 border-2 border-ondadura-yellow-400">
          <button
            onClick={scrollPrev}
            className="p-1 text-ondadura-yellow-400 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
            aria-label="Slide anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="p-1 text-ondadura-yellow-400 hover:text-white transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
            aria-label="Próximo slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <div className="w-px h-4 bg-ondadura-yellow-400 mx-1" />
          <span className="text-ondadura-yellow-400 font-mono text-xs sm:text-sm tracking-widest font-semibold px-1 select-none">
            {String(selectedIndex + 1).padStart(2, "0")}{" "}
            <span className="text-ondadura-yellow-400">/</span>{" "}
            {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </main>
  );
}
