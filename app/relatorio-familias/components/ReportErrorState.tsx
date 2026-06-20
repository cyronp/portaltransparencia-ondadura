"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Heading from "@/app/components/ui/Heading/Heading";
import Text from "@/app/components/ui/Text/Text";

interface ReportErrorStateProps {
  error: string;
  onRetry: () => void;
}

export default function ReportErrorState({ error, onRetry }: ReportErrorStateProps) {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative z-10">
      <div className="flex flex-col items-center justify-center gap-4 text-center max-w-md w-full p-6 border border-white bg-neutral-950">
        <div className="w-12 h-12 bg-red-950 border-2 border-red-500 flex items-center justify-center text-red-500">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div>
          <Heading as="h3" variant="Terciary" className="text-red-500 uppercase tracking-widest font-extrabold font-mono text-sm">
            Houve uma falha na Conexão
          </Heading>
          <Text variant="Secondary" className="text-neutral-400 mt-2 font-mono text-xs">
            {error}
          </Text>
        </div>
        <button
          onClick={onRetry}
          className="mt-2 flex items-center gap-2 px-4 py-2 border-2 border-white hover:border-red-500 text-white hover:bg-white hover:text-black transition-all font-bold text-xs uppercase font-mono tracking-widest cursor-pointer active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Tentar Novamente</span>
        </button>
      </div>
    </div>
  );
}
