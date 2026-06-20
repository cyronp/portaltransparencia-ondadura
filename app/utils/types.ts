export interface Familia {
  id: number;
  competencia: string | null;
  contato: string;
  familia: string;
  inscricao: string;
  qtd_meses: number;
  tempo: string;
  acompanhador: string | null;
  total_membros: number | null;
  criancas: number | null;
  adolescentes: number | null;
  endereco: string | null;
  bairro: string | null;
  cras: string | null;
  visitas: string | null;
  created_at: string;
}
