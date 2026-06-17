"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";

export default function OrientationWarning() {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="show-only-mobile-portrait fixed inset-0 z-[9999] flex flex-col items-center justify-center p-8 text-center bg-neutral-950/95 backdrop-blur-lg text-white animate-fade-in">
      <div className="max-w-xs flex flex-col items-center">
        <div className="animate-rotate-device w-20 h-20 text-ondadura-yellow-300 flex items-center justify-center">
          <Smartphone className="w-16 h-16" strokeWidth={1} />
        </div>

        <h2 className="text-xl font-bold uppercase tracking-wider text-ondadura-yellow-400 mb-3 font-sans">
          Gire o seu celular
        </h2>

        <p className="text-neutral-300 text-sm mb-8 leading-relaxed">
          Para ter uma melhor experiência de visualização do Portal da Transparência,
          recomendamos utilizar o dispositivo no modo paisagem (horizontal).
        </p>

        <button
          onClick={() => setIsDismissed(true)}
          className="px-6 py-3 uppercase bg-neutral-900 hover:bg-neutral-800 text-ondadura-yellow-400 text-xs font-semibold border border-ondadura-yellow-400 hover:border-neutral-700 transition-all duration-200 cursor-pointer focus:outline-none"
        >
          Prefiro continuar em pé
        </button>
      </div>
    </div>
  );
}
