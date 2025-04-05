import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cria o cliente do Supabase usando as variáveis de ambiente definidas
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  // Consulta todos os templates da tabela "templates"
  const { data, error } = await supabase
    .from("templates")
    .select("*");

  if (error) {
    // Retorna erro caso ocorra algum problema na consulta
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Retorna os dados dos templates em formato JSON
  return NextResponse.json(data);
}