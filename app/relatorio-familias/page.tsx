"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Familia } from "@/app/utils/types";
import { getInferredBairro, buildDurationRanges, buildBairroData } from "./utils";
import ReportLoadingState from "./components/ReportLoadingState";
import ReportErrorState from "./components/ReportErrorState";
import SlideOverview from "./components/SlideOverview";
import SlideDurationChart from "./components/SlideDurationChart";
import SlideRegionalTable from "./components/SlideRegionalTable";
import SlideControls from "./components/SlideControls";

export default function RelatorioFamilias() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [familias, setFamilias] = useState<Familia[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFamilias = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/familias");
      if (!res.ok) {
        throw new Error("Erro ao carregar dados das famílias");
      }
      const data = await res.json();
      setFamilias(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilias();
  }, []);

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

  // Calculations for dynamic dashboard
  const totalFamilies = familias.length;

  const totalActiveBairros = Array.from(
    new Set(familias.map((f) => getInferredBairro(f)).filter((b) => b !== "NÃO ESPECIFICADO"))
  ).length;

  // Support duration calculations
  const supportMonthsSum = familias.reduce((acc, f) => acc + (f.qtd_meses || 0), 0);
  const avgSupportMonths = totalFamilies > 0 ? (supportMonthsSum / totalFamilies).toFixed(1) : "N/A";

  // Neighborhood Distribution data
  const sortedBairrosData = buildBairroData(familias);

  // Duration ranges data
  const durationRanges = buildDurationRanges(familias);

  return (
    <main className="w-full h-dvh relative overflow-hidden bg-black flex flex-col font-sans select-none">
      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Back Button (Floating Overlay) */}
      <Link
        href="/"
        className="fixed top-4 left-4 lg:top-8 lg:left-8 z-50 flex items-center gap-2 px-3 py-1.5 lg:px-5 lg:py-2.5 bg-black border-2 border-white hover:border-ondadura-yellow-400 text-white hover:bg-white hover:text-black transition-all duration-200 uppercase tracking-widest text-[10px] lg:text-xs font-bold active:scale-95 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
        <span>Voltar</span>
      </Link>

      {loading ? (
        <ReportLoadingState />
      ) : error ? (
        <ReportErrorState error={error} onRetry={fetchFamilias} />
      ) : (
        /* Carousel Fullscreen Container */
        <div className="w-full h-full relative z-10">
          <div className="overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex h-full">
              
              {/* SLIDE 1: Visão Geral (Overview) */}
              <SlideOverview
                totalFamilies={totalFamilies}
                totalActiveBairros={totalActiveBairros}
                avgSupportMonths={avgSupportMonths}
              />

              {/* SLIDE 2: Tempo no Programa */}
              <SlideDurationChart durationRanges={durationRanges} />

              {/* SLIDE 3: Distribuição Regional */}
              <SlideRegionalTable
                sortedBairrosData={sortedBairrosData}
                totalFamilies={totalFamilies}
              />

            </div>
          </div>
        </div>
      )}

      {/* Floating Slide controls overlay (at bottom left) */}
      {!loading && !error && (
        <SlideControls
          selectedIndex={selectedIndex}
          onPrev={scrollPrev}
          onNext={scrollNext}
        />
      )}
    </main>
  );
}
