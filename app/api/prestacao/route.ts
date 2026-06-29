import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const competencia = searchParams.get("competencia");

    if (!competencia) {
      // Query unique competencies from all three tables
      const [receitasRes, despesasRes, doacoesRes] = await Promise.all([
        supabase.from("receitas").select("competencia"),
        supabase.from("despesas").select("competencia"),
        supabase.from("doacoes_parceiros").select("competencia"),
      ]);

      if (receitasRes.error) throw receitasRes.error;
      if (despesasRes.error) throw despesasRes.error;
      if (doacoesRes.error) throw doacoesRes.error;

      const competencies = new Set<string>();
      
      receitasRes.data?.forEach((item) => {
        if (item.competencia) competencies.add(item.competencia);
      });
      despesasRes.data?.forEach((item) => {
        if (item.competencia) competencies.add(item.competencia);
      });
      doacoesRes.data?.forEach((item) => {
        if (item.competencia) competencies.add(item.competencia);
      });

      const sortedCompetencias = Array.from(competencies).sort().reverse();

      return NextResponse.json({
        competencias: sortedCompetencias,
      });
    }

    // Run queries in parallel to fetch from all three tables
    const [receitasRes, despesasRes, doacoesRes] = await Promise.all([
      supabase.from("receitas").select("*").eq("competencia", competencia),
      supabase.from("despesas").select("*").eq("competencia", competencia),
      supabase.from("doacoes_parceiros").select("*").eq("competencia", competencia),
    ]);

    if (receitasRes.error) throw receitasRes.error;
    if (despesasRes.error) throw despesasRes.error;
    if (doacoesRes.error) throw doacoesRes.error;

    return NextResponse.json({
      receitas: receitasRes.data || [],
      despesas: despesasRes.data || [],
      doacoes: doacoesRes.data || [],
    });
  } catch (err: any) {
    console.error("Server error fetching prestação de contas:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
