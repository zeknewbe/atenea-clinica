import { createClient } from "@supabase/supabase-js";
import { Paciente } from "@/types";

// Variables de entorno (asegurate de tenerlas en .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Obtener todos los pacientes
export async function getPacientes(): Promise<Paciente[]> {
  const { data, error } = await supabase.from("patients").select("*").order("id", { ascending: false });
  if (error) throw error;
  return data as Paciente[];
}

// Obtener paciente por ID
export async function getPaciente(id: number): Promise<Paciente | null> {
  const { data, error } = await supabase.from("patients").select("*").eq("id", id).single();
  if (error) return null;
  return data as Paciente;
}

// Crear nuevo paciente
export async function createPaciente(paciente: Omit<Paciente, "id">): Promise<void> {
  const { error } = await supabase.from("patients").insert(paciente);
  if (error) throw error;
}

// Actualizar paciente
export async function updatePaciente(paciente: Paciente): Promise<void> {
  const { error } = await supabase.from("patients").update(paciente).eq("id", paciente.id);
  if (error) throw error;
}

// Eliminar paciente
export async function deletePaciente(id: number): Promise<void> {
  const { error } = await supabase.from("patients").delete().eq("id", id);
  if (error) throw error;
}