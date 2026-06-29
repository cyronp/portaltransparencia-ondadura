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

export interface Receita {
  id: number;
  origem: string;
  projeto_conta: string;
  valor: number;
  competencia: string;
  descricao: string | null;
  created_at: string;
}

export interface Despesa {
  id: number;
  item: string;
  tipo: string;
  valor: number;
  percentual: number;
  competencia: string;
  observacao: string | null;
  created_at: string;
}

export interface DoacaoParceiro {
  id: number;
  parceiro: string;
  tipo_doacao: string;
  valor: number;
  destino: string;
  status: string;
  observacao: string | null;
  competencia: string;
  created_at: string;
}
