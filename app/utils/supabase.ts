import { createClient } from "@supabase/supabase-js";

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "Supabase URL or Anon Key is missing. Please check your environment variables."
  );
}

export const supabase = createClient(
  supabaseUrl || "",
  supabaseAnonKey || ""
);

