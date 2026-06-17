"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Heading from "../ui/Heading/Heading";
import Text from "../ui/Text/Text";

const SLIDES = [
  {
    badge: "PORTAL DA TRANSPARÊNCIA",
    title: "Transparência Onda Dura",
    description: "Temos o compromisso de agir com integridade e clareza. Acesse relatórios, balancetes e saiba como cada recurso é investido.",
    buttonText: "Ver Relatórios",
    gradient: "from-ondadura-yellow-500/20 via-neutral-900 to-neutral-950",
    badgeColor: "bg-ondadura-yellow-400/10 text-ondadura-yellow-400 border-ondadura-yellow-400/20",
    btnBg: "bg-ondadura-yellow-400 text-neutral-950 hover:bg-ondadura-yellow-300",
  },
  {
    badge: "NOSSOS NÚMEROS",
    title: "Recursos em Ação",
    description: "Investimentos em projetos sociais, infraestrutura, ações comunitárias e missões. Acompanhe de perto a destinação de cada valor.",
    buttonText: "Explorar Dados",
    gradient: "from-teal-500/20 via-neutral-900 to-neutral-950",
    badgeColor: "bg-teal-400/10 text-teal-400 border-teal-400/20",
    btnBg: "bg-teal-500 text-white hover:bg-teal-400",
  },
  {
    badge: "NOSSO PROPÓSITO",
    title: "Impactando Vidas",
    description: "Acreditamos que a transparência fortalece a confiança coletiva e potencializa nossa missão de espalhar transformação e esperança.",
    buttonText: "Conhecer Projetos",
    gradient: "from-violet-500/20 via-neutral-900 to-neutral-950",
    badgeColor: "bg-violet-400/10 text-violet-400 border-violet-400/20",
    btnBg: "bg-violet-600 text-white hover:bg-violet-500",
  },
];

export default function HomeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    // Safely update state inside timeout to avoid cascading renders warning
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
    <div className="relative w-full h-full">
      {/* Outer Slider Container */}
      <div className="overflow-hidden w-full h-full bg-neutral-950" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 h-full w-full relative bg-gradient-to-br p-6 sm:p-12 md:p-24 flex flex-col justify-center overflow-hidden pad-on-short"
              style={{
                backgroundImage: `radial-gradient(circle at top right, rgba(var(--color-bg-gradient), 0.15), transparent 60%)`,
              }}
            >
              {/* Custom background gradient injection */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-95 -z-10`} />

              {/* Glowing top-right orb */}
              <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-current opacity-5 blur-[120px] pointer-events-none" />

              <div className="max-w-3xl space-y-3 sm:space-y-6 md:space-y-8 relative z-10 select-none pb-20 sm:pb-24 md:pb-28 gap-on-short">
                {/* Badge */}
                <span className={`inline-flex items-center px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full border hide-on-short ${slide.badgeColor}`}>
                  {slide.badge}
                </span>

                {/* Title */}
                <Heading as="h2" className="text-2xl sm:text-4xl md:text-7xl font-black text-white leading-tight font-sans tracking-tight title-on-short">
                  {slide.title}
                </Heading>

                {/* Description */}
                <Text className="text-neutral-300 text-xs sm:text-base md:text-2xl leading-relaxed max-w-2xl font-light hide-on-short">
                  {slide.description}
                </Text>

                {/* Call-to-Action Button */}
                <div className="pt-2">
                  <button className={`px-5 py-2.5 sm:px-8 sm:py-4 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg shadow-black/30 btn-on-short ${slide.btnBg}`}>
                    {slide.buttonText}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PowerPoint Control Deck */}
      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-12 md:left-24 z-20 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3.5 py-2 border border-white shadow-2xl deck-on-short">
        <button
          onClick={scrollPrev}
          className="p-1 text-white hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="p-1 text-white hover:text-white hover:bg-neutral-800 rounded-lg transition-colors cursor-pointer focus:outline-none flex items-center justify-center"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <div className="w-px h-4 bg-white mx-1" />
        <span className="text-neutral-300 font-mono text-xs sm:text-sm tracking-widest font-semibold px-1 select-none">
          {String(selectedIndex + 1).padStart(2, '0')} <span className="text-white">/</span> {String(SLIDES.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}
