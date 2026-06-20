import { Familia } from "@/app/utils/types";

export const SLIDES = [
  { id: "overview", label: "Visão Geral" },
  { id: "duration_distribution", label: "Pessoas por Tempo" },
  { id: "regions", label: "Distribuição Regional" },
];

// Helper to clean name and remove notes in parentheses (e.g. health details)
export function cleanFamilyName(name: string) {
  if (!name) return "Não informado";
  let cleaned = name.replace(/\([^)]*\)/g, ""); // Remove anything in parentheses
  cleaned = cleaned.trim().replace(/^\*/, "").trim(); // Remove leading *
  return cleaned
    .split(/\s+/)
    .map((word) => {
      const lower = word.toLowerCase();
      if (["de", "da", "do", "dos", "das", "e"].includes(lower)) {
        return lower;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

// Helper to mask family name to hide full identity
export function maskFamilyName(name: string) {
  const cleaned = cleanFamilyName(name);
  if (cleaned === "Não informado") return cleaned;

  const parts = cleaned.split(/\s+/);
  if (parts.length <= 1) return cleaned;

  // Mask the last name to its initial (e.g., "Angelita De Souza De Paula" -> "Angelita de Souza de P.")
  const lastPart = parts[parts.length - 1];
  if (lastPart.length > 1) {
    parts[parts.length - 1] = `${lastPart[0]}.`;
  }
  return parts.join(" ");
}

// Helper to clean neighborhood name
export function cleanBairroName(name: string | null) {
  if (!name) return "NÃO ESPECIFICADO";
  return name.trim().toUpperCase();
}

// Infer neighborhood from address if bairro field is null
export function getInferredBairro(f: Familia) {
  if (f.bairro) return cleanBairroName(f.bairro);
  if (!f.endereco) return "NÃO ESPECIFICADO";

  const addr = f.endereco.toUpperCase();
  if (addr.includes("AVENTUREIRO")) return "AVENTUREIRO";
  if (addr.includes("JOÃO COSTA") || addr.includes("JOAO COSTA")) return "JOÃO COSTA";
  if (addr.includes("JARDIM IRIRIU") || addr.includes("JD. IRÍRIU") || addr.includes("JARDIM IRÍRIU")) return "JARDIM IRÍRIU";
  if (addr.includes("ITAUM")) return "ITAUM";
  if (addr.includes("ITINGA")) return "ITINGA";
  if (addr.includes("COMASA")) return "COMASA";
  if (addr.includes("BOA VISTA")) return "BOA VISTA";
  if (addr.includes("PARANAGUAMIRIM")) return "PARANAGUAMIRIM";

  return "NÃO ESPECIFICADO";
}

export interface DurationRange {
  range: string;
  min: number;
  max: number;
  count: number;
}

export function buildDurationRanges(familias: Familia[]): DurationRange[] {
  const ranges: DurationRange[] = [
    { range: "1-3 Meses", min: 1, max: 3, count: 0 },
    { range: "4-6 Meses", min: 4, max: 6, count: 0 },
    { range: "7-12 Meses", min: 7, max: 12, count: 0 },
    { range: "13-24 Meses", min: 13, max: 24, count: 0 },
    { range: "25 Meses+", min: 25, max: Infinity, count: 0 },
  ];

  familias.forEach((f) => {
    const months = f.qtd_meses || 0;
    for (const r of ranges) {
      if (months >= r.min && months <= r.max) {
        r.count++;
        break;
      }
    }
  });

  return ranges;
}

export function buildBairroData(familias: Familia[]): [string, number][] {
  const bairroCounts: Record<string, number> = {};
  familias.forEach((f) => {
    const b = getInferredBairro(f);
    bairroCounts[b] = (bairroCounts[b] || 0) + 1;
  });
  return Object.entries(bairroCounts).sort((a, b) => b[1] - a[1]);
}
