export const SLIDES = [
  { id: "overview", label: "Resumo Geral" },
  { id: "income", label: "Receitas & Doações" },
  { id: "expenses", label: "Despesas Detalhadas" },
];

export function formatCompetencia(comp: string | null | undefined) {
  if (!comp) return "Período não informado";
  const parts = comp.split("-");
  if (parts.length !== 2) return comp;
  const [year, month] = parts;
  const months: Record<string, string> = {
    "01": "Janeiro",
    "02": "Fevereiro",
    "03": "Março",
    "04": "Abril",
    "05": "Maio",
    "06": "Junho",
    "07": "Julho",
    "08": "Agosto",
    "09": "Setembro",
    "10": "Outubro",
    "11": "Novembro",
    "12": "Dezembro",
  };
  return `${months[month] || month} ${year}`;
}

export function formatCurrency(val: number | null | undefined) {
  if (val === null || val === undefined) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(val);
}
