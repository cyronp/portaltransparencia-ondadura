import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const bairro = searchParams.get("bairro");
    const acompanhador = searchParams.get("acompanhador");
    const search = searchParams.get("search");

    let query = supabase.from("familias").select("*");

    // Filter by neighborhood (bairro) if specified
    if (bairro) {
      query = query.eq("bairro", bairro);
    }

    // Filter by accompanying volunteer (acompanhador) if specified
    if (acompanhador) {
      query = query.eq("acompanhador", acompanhador);
    }

    // Search by family name (ilike for case-insensitive search)
    if (search) {
      query = query.ilike("familia", `%${search}%`);
    }

    // Order by family name
    query = query.order("familia", { ascending: true });

    const { data, error } = await query;

    if (error) {
      console.error("Supabase error fetching familias:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("Server error fetching familias:", err);
    return NextResponse.json(
      { error: err.message || "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
