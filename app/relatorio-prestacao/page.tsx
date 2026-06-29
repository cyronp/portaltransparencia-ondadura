"use client";

import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Receita, Despesa, DoacaoParceiro } from "@/app/utils/types";
import { formatCompetencia } from "./utils";
import ReportLoadingState from "@/app/relatorio-familias/components/ReportLoadingState";
import ReportErrorState from "@/app/relatorio-familias/components/ReportErrorState";
import SlideFinanceOverview from "./components/SlideFinanceOverview";
import SlideReceitasDoacoes from "./components/SlideReceitasDoacoes";
import SlideDespesas from "./components/SlideDespesas";
import SlideControls from "./components/SlideControls";

function RelatorioPrestacaoContent() {
  const searchParams = useSearchParams();
  const competencia = searchParams.get("competencia") || "2026-05";

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [doacoes, setDoacoes] = useState<DoacaoParceiro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/prestacao?competencia=${competencia}`);
      if (!res.ok) {
        throw new Error("Erro ao carregar dados de prestação de contas");
      }
      const data = await res.json();
      setReceitas(data.receitas || []);
      setDespesas(data.despesas || []);
      setDoacoes(data.doacoes || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Erro desconhecido ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [competencia]);

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

  const competenciaLabel = formatCompetencia(competencia);

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
        <ReportErrorState error={error} onRetry={fetchData} />
      ) : (
        /* Carousel Fullscreen Container */
        <div className="w-full h-full relative z-10">
          <div className="overflow-hidden w-full h-full" ref={emblaRef}>
            <div className="flex h-full">
              {/* SLIDE 1: Visão Geral */}
              <SlideFinanceOverview
                receitas={receitas}
                despesas={despesas}
                doacoes={doacoes}
                competenciaLabel={competenciaLabel}
              />

              {/* SLIDE 2: Receitas & Doações */}
              <SlideReceitasDoacoes
                receitas={receitas}
                doacoes={doacoes}
                competenciaLabel={competenciaLabel}
              />

              {/* SLIDE 3: Detalhamento de Despesas */}
              <SlideDespesas
                despesas={despesas}
                competenciaLabel={competenciaLabel}
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

export default function RelatorioPrestacao() {
  return (
    <Suspense fallback={<ReportLoadingState />}>
      <RelatorioPrestacaoContent />
    </Suspense>
  );
}
