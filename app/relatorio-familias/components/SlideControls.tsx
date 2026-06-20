"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES } from "../utils";

interface SlideControlsProps {
  selectedIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function SlideControls({ selectedIndex, onPrev, onNext }: SlideControlsProps) {
  return (
    <>
      <div className="fixed bottom-6 left-6 lg:bottom-8 lg:left-8 z-50 flex items-center gap-2 bg-black px-3 py-1.5 lg:px-5 lg:py-2.5 border-2 border-ondadura-yellow-400">
        <button onClick={onPrev} className="p-1 text-ondadura-yellow-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center" aria-label="Slide anterior">
          <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
        <button onClick={onNext} className="p-1 text-ondadura-yellow-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center" aria-label="Próximo slide">
          <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
        <span className="text-ondadura-yellow-400 font-mono text-xs lg:text-sm font-semibold px-1 select-none">
          {String(selectedIndex + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Floating copyright watermark (at bottom right) */}
      <div className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40 text-[9px] lg:text-xs uppercase tracking-wider font-bold text-neutral-500 font-mono hidden xs:block">
        Onda Dura © 2026 • Assistência Social
      </div>
    </>
  );
}
