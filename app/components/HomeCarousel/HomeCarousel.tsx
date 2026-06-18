"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FileSearch,
} from "lucide-react";
import Heading from "../ui/Heading/Heading";
import Text from "../ui/Text/Text";
import { Separator } from "../ui/Separator/Separator";
import OndaDuraIcon from "../Icon/OndaDuraIcon/OndeDuraIcon";

const SLIDES = [
  {
    id: "date-selector",
  },
];

const AVAILABLE_DATES = [
  { value: "2026-06", label: "Junho 2026" },
  { value: "2026-05", label: "Maio 2026" },
  { value: "2026-04", label: "Abril 2026" },
  { value: "2026-03", label: "Março 2026" },
];

export default function HomeCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectOpen, setSelectOpen] = useState(false);

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

  useEffect(() => {
    if (!selectOpen) return;
    const handler = () => setSelectOpen(false);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [selectOpen]);

  const selectedLabel = AVAILABLE_DATES.find(
    (d) => d.value === selectedDate,
  )?.label;

  return (
    <div className="relative w-full h-full">
      <div
        className="overflow-hidden w-full h-full bg-neutral-900"
        ref={emblaRef}
      >
        <div className="flex h-full">
          <div className="flex-[0_0_100%] min-w-0 flex items-center justify-center px-4 py-16 lg:py-0 pad-on-short">
            <div className="relative w-full max-w-lg">
              {/* Card */}
              <div className="relative bg-neutral-800 backdrop-blur-xl border border-neutral-700 shadow-2xl shadow-black/40">
                <div className="px-6 py-8 sm:px-10 sm:py-10 flex flex-col items-center gap-6 lg:gap-8 gap-on-short pad-on-short">
                  <div className="flex flex-col items-center gap-4">
                    <OndaDuraIcon
                      className="text-ondadura-yellow-400"
                      size={56}
                    />
                    <Separator
                      orientation="horizontal"
                      className="bg-neutral-700 w-[70%]"
                    />
                    <Heading
                      as="h2"
                      variant="Secondary"
                      className="text-white text-center uppercase tracking-widest font-bold text-base sm:text-lg lg:text-xl title-on-short"
                    >
                      Portal da Transparência
                    </Heading>
                  </div>

                  <Text
                    variant="Secondary"
                    className="text-neutral-400 text-center max-w-sm leading-relaxed text-sm sm:text-base hide-on-short"
                  >
                    Selecione o período desejado para visualizar nossa
                    prestações de contas.
                  </Text>

                  <div className="w-full flex flex-col gap-2">
                    <Text
                      as="label"
                      variant="Terciary"
                      className="text-ondadura-yellow-400 uppercase tracking-widest font-semibold text-[11px]"
                    >
                      Período de referência desejado
                    </Text>

                    <div className="relative">
                      <button
                        id="date-selector-trigger"
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectOpen((prev) => !prev);
                        }}
                        className="w-full flex items-center gap-3 bg-neutral-950/60 border border-neutral-600 hover:border-ondadura-yellow-400/60 transition-colors px-4 py-3 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-ondadura-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 group select-on-short"
                        aria-haspopup="listbox"
                        aria-expanded={selectOpen}
                      >
                        <CalendarDays className="w-4 h-4 text-ondadura-yellow-400 shrink-0" />
                        <span
                          className={`flex-1 text-left font-mono text-sm tracking-wide ${
                            selectedLabel ? "text-white" : "text-neutral-500"
                          }`}
                        >
                          {selectedLabel || "Selecione a data..."}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-neutral-500 group-hover:text-ondadura-yellow-400 transition-transform duration-200 ${
                            selectOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown */}
                      {selectOpen && (
                        <ul
                          role="listbox"
                          onClick={(e) => e.stopPropagation()}
                          onPointerDown={(e) => e.stopPropagation()}
                          onTouchStart={(e) => e.stopPropagation()}
                          onTouchMove={(e) => e.stopPropagation()}
                          style={{
                            touchAction: "pan-y",
                            overscrollBehavior: "contain",
                          }}
                          className="absolute z-50 left-0 right-0 bg-neutral-900 border border-neutral-700 max-h-24 lg:max-h-48 overflow-y-auto"
                        >
                          {AVAILABLE_DATES.map((date) => (
                            <li
                              key={date.value}
                              role="option"
                              aria-selected={selectedDate === date.value}
                              onClick={() => {
                                setSelectedDate(date.value);
                                setSelectOpen(false);
                              }}
                              className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors font-mono text-sm tracking-wide ${
                                selectedDate === date.value
                                  ? "bg-ondadura-yellow-400/10 text-ondadura-yellow-400"
                                  : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                              }`}
                            >
                              <CalendarDays className="w-3.5 h-3.5 shrink-0 opacity-50" />
                              {date.label}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <button
                    id="load-reports-btn"
                    disabled={!selectedDate}
                    className="w-full flex items-center justify-center gap-2 uppercase bg-ondadura-yellow-400 text-neutral-950 font-semibold tracking-wide text-sm py-3 px-6 transition-all duration-200 hover:bg-ondadura-yellow-200 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-ondadura-yellow-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-ondadura-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 btn-on-short"
                  >
                    Carregar apresentação
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-12 md:left-24 z-20 flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md px-3 py-2 border border-ondadura-yellow-400 deck-on-short">
        <button
          onClick={scrollPrev}
          className="p-1 text-ondadura-yellow-400 hover:text-ondadura-yellow-300 hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="p-1 text-ondadura-yellow-400 hover:text-ondadura-yellow-300 hover:bg-neutral-800 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center"
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
  );
}
